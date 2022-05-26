local GetEntityModel = GetEntityModel
local GetEntityCoords = GetEntityCoords

function GetVehicleHealth(entityVeh)
	return math.floor( math.max(0, math.min(100, GetVehicleEngineHealth(entityVeh) / 10 ) ) )
end

function GetClosestVehicle2(vector, radius, modelHash, testFunction)
	if not vector or not radius then return end
	local handle, veh = FindFirstVehicle()
	local success, theVeh
	repeat
		local firstDist = GetDistanceBetweenCoords(GetEntityCoords(veh), vector.x, vector.y, vector.z, true)
		if firstDist < radius and (not modelHash or modelHash == GetEntityModel(veh)) and (not theVeh or firstDist < GetDistanceBetweenCoords(GetEntityCoords(theVeh), GetEntityCoords(veh), true)) and (not testFunction or testFunction(veh)) then
			theVeh = veh
		end
		success, veh = FindNextVehicle(handle)
	until not success
		EndFindVehicle(handle)

	return theVeh
end

function GetClosestObject(vector, radius, modelHash, testFunction)
	if not vector or not radius then return end
	local handle, veh = FindFirstObject()
	local success, theVeh
	repeat
		local firstDist = GetDistanceBetweenCoords(GetEntityCoords(veh), vector.x, vector.y, vector.z, true)
		if firstDist < radius and (not modelHash or modelHash == GetEntityModel(veh)) and (not theVeh or firstDist < GetDistanceBetweenCoords(GetEntityCoords(theVeh), GetEntityCoords(veh), true)) and (not testFunction or testFunction(veh)) then
			theVeh = veh
		end
		success, veh = FindNextObject(handle)
	until not success
		EndFindObject(handle)

	return theVeh
end

function GetClosestPed2(vector, radius, modelHash, testFunction)
	if not vector or not radius then return end
	local handle, myped, veh = FindFirstPed(), GetPlayerPed(-1)
	local success, theVeh
	repeat
		local firstDist = GetDistanceBetweenCoords(GetEntityCoords(veh), vector.x, vector.y, vector.z)
		if firstDist < radius and veh ~= myped and (not modelHash or modelHash == GetEntityModel(veh)) and (not theVeh or firstDist < GetDistanceBetweenCoords(GetEntityCoords(theVeh), GetEntityCoords(veh))) and (not testFunction or testFunction(veh)) then
			theVeh = veh
		end
		success, veh = FindNextPed(handle)
	until not success
		EndFindPed(handle)

	return theVeh
end

function GetSafeClosestVehicleNode(pos)
	local testPos, totalAttempt, startTime, nodePos = pos, 0, GetGameTimer()
	while (not nodePos or GetDistanceBetweenCoords(nodePos, pos) <= 100) and startTime + 5000 > GetGameTimer() do
		Citizen.Wait(0)
		totalAttempt = totalAttempt + 1

		local found, vehPos = GetClosestMajorVehicleNode(testPos.x + (math.random(1, 2) == 1 and 10 or -10) * totalAttempt , testPos.y + (math.random(1, 2) == 1 and 10 or -10) * totalAttempt, pos.z, 3.0, 0)
		if found and not IsAnyVehicleNearPoint(vehPos.x, vehPos.y, vehPos.z, 3.0) then nodePos = vehPos end
	end

	return nodePos
end

local toggleMods = {18, 20, 22}
function GetCustomData(veh, boolColor, boolAll)
	local mods = {}
	for i = 0,48 do
		local idMod = tableHasValue(toggleMods, i) and tonumber(IsToggleModOn(veh, i)) or GetVehicleMod(veh, i)
		if idMod or boolAll then
			mods[i] = idMod ~= -1 and idMod
		end
	end

	local ext = {}
	for i = 0, 20 do
		if DoesExtraExist(veh, i) then
			local hasExtra = IsVehicleExtraTurnedOn(veh, i)
			if hasExtra then
				ext[i] = 0
			elseif not hasExtra then
				ext[i] = 1
			end
		end
	end

	local colors, extra_colors, secondaryColor, pl, win, wt, neon, tr, tgn, intC, da = table.pack(GetVehicleCustomPrimaryColour(veh)), table.pack(GetVehicleExtraColours(veh)), table.pack(GetVehicleCustomSecondaryColour(veh)), GetVehicleNumberPlateTextIndex(veh), GetVehicleWindowTint(veh), GetVehicleWheelType(veh), table.pack(GetVehicleNeonLightsColour(veh)), table.pack(GetVehicleTyreSmokeColor(veh)), { IsVehicleNeonLightEnabled(veh, 0), IsVehicleNeonLightEnabled(veh, 1), IsVehicleNeonLightEnabled(veh, 2), IsVehicleNeonLightEnabled(veh, 3) }, GetVehicleInteriorColour(veh), GetVehicleDashboardColour(veh)
	local ty1, _, _ = GetVehicleModColor_1(veh)
	local ty2, _, _ = GetVehicleModColor_2(veh)

	return { ext = ext, t = GetVehicleLivery(veh), da = da, intC = intC, ty1 = boolColor and ty1, ty2 = boolColor and ty2, tr = tr, pl = pl == -1 and 0 or pl, win = win, neon = { tgn, neon }, wt = wt, c = colors, cs = secondaryColor, c2 = extra_colors, mods = mods, he = GetVehicleXenonLightsColour(veh) }
end

function SetVehicleCustom(veh, c, colors)
	SetVehicleModKit(veh, 0)
	
	if c.c then
		ClearVehicleCustomPrimaryColour(veh)
		if colors and colors.ty1 then
			SetVehicleModColor_1(veh, colors.ty1)
		end
		SetVehicleCustomPrimaryColour(veh, c.c[1] or c.c["1"], c.c[2] or c.c["2"], c.c[3] or c.c["3"] or 0)
	end

	if c.cs then
		ClearVehicleCustomSecondaryColour(veh)
		if colors and colors.ty2 then
			SetVehicleModColor_2(veh, colors.ty2)
		end
		SetVehicleCustomSecondaryColour(veh, c.cs[1] or c.cs["1"], c.cs[2] or c.cs["2"], c.cs[3] or c.cs["3"] or 0)
	end

	if c.intC then SetVehicleInteriorColour(veh, c.intC) end
	if c.c2 then SetVehicleExtraColours(veh, c.c2[1] or c.c2["1"], c.c2[2] or c.c2["2"]) end
	if c.pl and c.pl >= 0 then SetVehicleNumberPlateTextIndex(veh, c.pl) end
	if c.neon and c.neon[1] then
		c.neon[1] = type(c.neon[1]) ~= "table" and {} or c.neon[1]
		for k,v in pairs(c.neon[1]) do
			SetVehicleNeonLightEnabled(veh, k - 1, v)
		end
		SetVehicleNeonLightsColour(veh, c.neon[2][1] or c.neon[2]["1"], c.neon[2][2] or c.neon[2]["2"], c.neon[2][3] or c.neon[2]["3"])
	end
	if c.win then SetVehicleWindowTint(veh, c.win) end
	if c.wt then SetVehicleWheelType(veh, c.wt) end
	if c.da then SetVehicleDashboardColour(veh, c.da) end
	if c.he then SetVehicleXenonLightsColour(veh, c.he) end
	if c.mods then
		for n,l in pairs(c.mods) do
			local modId = tonumber(n)
			local modValue = tonumber(l)

			if not tableHasValue(toggleMods, modId) then
				SetVehicleMod(veh, modId, modValue or -1)
			else
				ToggleVehicleMod(veh, modId, modValue and modValue >= 0)
			end
		end
	end
	if c.t then SetVehicleLivery(veh, c.t) end
	if c.tr and #c.tr > 2 then SetVehicleTyreSmokeColor(veh, c.tr[1] or c.tr["1"], c.tr[2] or c.tr["2"], c.tr[3] or c.tr["3"]) end
	if c.ext then
		for i = 0, 20 do
			if DoesExtraExist(veh, i) then
				if c.ext[i] ~= nil then
					SetVehicleExtra(veh, i, c.ext[i])
				end
			end
		end
	end
end

function GetVehicleBasicVisualDamages(vehicle)
	if not vehicle or not DoesEntityExist(vehicle) then return end
	local tbl = { doors = {}, tyres = {}, windows = {}}

	for i=0, GetNumberOfVehicleDoors(vehicle) - 1 do
		if IsVehicleDoorDamaged(vehicle, i) then
			tbl.doors[i] = 0
		end
	end

	for i=0, GetVehicleNumberOfWheels(vehicle) - 1 do
		if IsVehicleTyreBurst(vehicle, i, true) then
			tbl.tyres[i] = 0
		elseif IsVehicleTyreBurst(vehicle, i, false) then
			tbl.tyres[i] = 1
		end
	end

	-- max is 13 but 7 seems to be enough to get all important windows
	for i=0, 7 do
		if not IsVehicleWindowIntact(vehicle, i) then
			tbl.windows[#tbl.windows + 1] = i
		end
	end

	return tbl
end

function SetVehicleBasicVisualDamages(vehicle, damages)
	for k, v in pairs(damages.doors) do
		if v == 0 then
			SetVehicleDoorBroken(vehicle, k, true)
		end
	end

	for k,v in pairs(damages.tyres) do
		SetVehicleTyreBurst(vehicle, k, true, v == 0 and 1000.0 or 0.0)
	end

	for _,v in pairs(damages.windows) do
		SmashVehicleWindow(vehicle, v)
	end
end