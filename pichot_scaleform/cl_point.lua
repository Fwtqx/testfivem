local mp_pointing = false
local keyPressed = false
local function startPointing()
	local ped = GetPlayerPed(-1)
	RequestAnimDict("anim@mp_point")
	while not HasAnimDictLoaded("anim@mp_point") do
		Wait(0)
	end
	SetPedCurrentWeaponVisible(ped, 0, 1, 1, 1)
	SetPedConfigFlag(ped, 36, 1)
	TaskMoveNetworkByName(ped, "task_mp_pointing", 0.5, 0, "anim@mp_point", 24)
	RemoveAnimDict("anim@mp_point")
end

local function stopPointing()
	local ped = GetPlayerPed(-1)
	RequestTaskMoveNetworkStateTransition(ped, "Stop")
	if not IsPedInjured(ped) then
		ClearPedSecondaryTask(ped)
	end
	if not IsPedInAnyVehicle(ped) then
		SetPedCurrentWeaponVisible(ped, 1, 1, 1, 1)
	end
	SetPedResetFlag(ped, 36, true)
	ClearPedSecondaryTask(PlayerPedId())
end

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		local ped = GetPlayerPed(-1)
		if not keyPressed then
			if IsControlPressed(0, 29) and not mp_pointing and IsPedOnFoot(ped) and not IsPedInAnyVehicle(ped) and not IsPedRagdoll(ped) then
				Citizen.Wait(200)
				if not IsControlPressed(0, 29) then
					keyPressed = true
					startPointing()
					mp_pointing = true
				else
					keyPressed = true
					while IsControlPressed(0, 29) do
						Citizen.Wait(50)
					end
				end
			elseif (IsControlPressed(0, 29) and mp_pointing) or (not IsPedOnFoot(ped) and mp_pointing) then
				keyPressed = true
				mp_pointing = false
				stopPointing()
			end
		end

		if keyPressed and not IsControlPressed(0, 29) then
			keyPressed = false
		end

		local doingTask = N_0x921ce12c489c4c41(ped)
		if not mp_pointing and doingTask then
			stopPointing()
		end

		if doingTask then
			if not IsPedOnFoot(ped) then
				stopPointing()
			else
				local camPitch = GetGameplayCamRelativePitch()
				if camPitch < -70.0 then
					camPitch = -70.0
				elseif camPitch > 42.0 then
					camPitch = 42.0
				end
				camPitch = (camPitch + 70.0) / 112.0

				local camHeading = GetGameplayCamRelativeHeading()
				local cosCamHeading = Cos(camHeading)
				local sinCamHeading = Sin(camHeading)
				if camHeading < -180.0 then
					camHeading = -180.0
				elseif camHeading > 180.0 then
					camHeading = 180.0
				end
				camHeading = (camHeading + 180.0) / 360.0

				local blocked = 0

				local coords = GetOffsetFromEntityInWorldCoords(ped, (cosCamHeading * -0.2) - (sinCamHeading * (0.4 * camHeading + 0.3)), (sinCamHeading * -0.2) + (cosCamHeading * (0.4 * camHeading + 0.3)), 0.6)
				local ray = Cast_3dRayPointToPoint(coords.x, coords.y, coords.z - 0.2, coords.x, coords.y, coords.z + 0.2, 0.4, 95, ped, 7);
				nn,blocked,coords,coords = GetRaycastResult(ray)

				SetTaskPropertyFloat(ped, "Pitch", camPitch)
				SetTaskPropertyFloat(ped, "Heading", camHeading * -1.0 + 1.0)
				SetTaskPropertyBool(ped, "isBlocked", blocked)
				SetTaskPropertyBool(ped, "isFirstPerson", N_0xee778f8c7e1142e2(N_0x19cafa3c87f7c2ff()) == 4)
			end
		end
	end
end)