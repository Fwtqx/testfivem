local GetActivePlayers = GetActivePlayers
local GetPlayerPed = GetPlayerPed
local GetEntityCoords = GetEntityCoords
local GetEntityForwardVector = GetEntityForwardVector
local IsEntityVisible = IsEntityVisible
local HasAnimDictLoaded = HasAnimDictLoaded

-- PLAYER_LOOP
function GetPlayers()
	return GetActivePlayers()
end

function GetPlayersInRange(floatRadius, blServerId)
	local tbl = {}

	local Player = LocalPlayer()
	local plId = Player.ID
	local plPos = Player.Pos

	for _,v in pairs(GetActivePlayers()) do
		local pPos = NetworkGetPlayerCoords(v)

		if v ~= plId and GetDistanceBetweenCoords(plPos, pPos) < (floatRadius or 16.0) then
			tbl[#tbl + 1] = blServerId and GetPlayerServerId(v) or v
		end
	end

	return tbl
end

local max = 1.5
function GetClosestPlayer(bl, d, addVector)
	local ped, closestPlayer = GetPlayerPed(-1)
	local playerPos, playerForward = GetEntityCoords(ped), GetEntityForwardVector(ped)
	playerPos = playerPos + (addVector or playerForward * 0.5)

	for _,v in pairs(GetPlayers()) do
		local otherPed = GetPlayerPed(v)
		local otherPedPos = otherPed ~= ped and IsEntityVisible(otherPed) and GetEntityCoords(otherPed)

		if otherPedPos and GetDistanceBetweenCoords(otherPedPos, playerPos) <= (d or max) and (not closestPlayer or GetDistanceBetweenCoords(otherPedPos, playerPos)) then
			closestPlayer = v
		end
	end

	return closestPlayer
end

function GetNearbyPlayers(distance)
	local ped = GetPlayerPed(-1)
	local playerPos = GetEntityCoords(ped)
	local nearbyPlayers = {}

	for _,v in pairs(GetPlayers()) do
		local otherPed = GetPlayerPed(v)
		local otherPedPos = otherPed ~= ped and IsEntityVisible(otherPed) and GetEntityCoords(otherPed)

		if otherPedPos and GetDistanceBetweenCoords(otherPedPos, playerPos) <= (distance or max) then
			nearbyPlayers[#nearbyPlayers + 1] = v
		end
	end
	return nearbyPlayers
end

function GetFirstInRangePlayer()
	local playerId = LocalPlayer().ID
	for _,v in pairs(GetActivePlayers()) do
		if v == playerId then goto next end
		local ped = GetPlayerPed(v)
		if ped and DoesEntityExist(ped) then
			return v
		end
		::next::
	end
end

function TaskSynchronizedTasks(ped, animData, clearTasks)
	for _,v in pairs(animData) do
		if not HasAnimDictLoaded(v.anim[1]) then
			RequestAnimDict(v.anim[1])
			while not HasAnimDictLoaded(v.anim[1]) do Citizen.Wait(0) end
		end
	end

	local _, sequence = OpenSequenceTask(0)
	for _,v in pairs(animData) do
		TaskPlayAnim(0, v.anim[1], v.anim[2], 2.0, -2.0, math.floor(v.time or -1), v.flag or 48, 0, 0, 0, 0)
	end

	CloseSequenceTask(sequence)
	if clearTasks then ClearPedTasks(ped) end
	TaskPerformSequence(ped, sequence)
	ClearSequenceTask(sequence)

	for _,v in pairs(animData) do
		RemoveAnimDict(v.anim[1])
	end

	return sequence
end

local animBug = {"WORLD_HUMAN_MUSICIAN", "WORLD_HUMAN_CLIPBOARD"}
local femaleFix = {
	["WORLD_HUMAN_BUM_WASH"] = {"amb@world_human_bum_wash@male@high@idle_a", "idle_a"},
	["WORLD_HUMAN_SIT_UPS"] = {"amb@world_human_sit_ups@male@idle_a", "idle_a"},
	["WORLD_HUMAN_PUSH_UPS"] = {"amb@world_human_push_ups@male@base", "base"},
	["WORLD_HUMAN_BUM_FREEWAY"] = {"amb@world_human_bum_freeway@male@base", "base"},
	["WORLD_HUMAN_CLIPBOARD"] = {"amb@world_human_clipboard@male@base", "base"},
	["WORLD_HUMAN_VEHICLE_MECHANIC"] = {"amb@world_human_vehicle_mechanic@male@base", "base"},
}

function PlaySimpleForceAnim(animName, flag, args)
	flag, args = flag and tonumber(flag) or false, args or {}
	local ped, time, clearTasks, animPos, animRot, animTime = args.ped or GetPlayerPed(-1), args.time, args.clearTasks, args.pos, args.ang

	if IsPedInAnyVehicle(ped) and (not flag or flag < 40) then return end

	if not clearTasks then ClearPedTasks(ped) end

	if not animName[2] and femaleFix[animName[1]] and GetEntityModel(ped) == -1667301416 then
		animName = femaleFix[animName[1]]
	end

	if animName[2] then
		RequestAndWaitDict(animName[1])
	end

	if not animName[2] then
		ClearAreaOfObjects(GetEntityCoords(ped), 1.0)
		TaskStartScenarioInPlace(ped, animName[1], -1, not tableHasValue(animBug, animName[1]))
	else
		if not animPos then
			TaskPlayAnim(ped, animName[1], animName[2], 8.0, -8.0, -1, flag or 44, 0, 0, 0, 0, 0)
		else
			TaskPlayAnimAdvanced(ped, animName[1], animName[2], animPos.x, animPos.y, animPos.z, animRot.x, animRot.y, animRot.z, 8.0, -8.0, -1, flag or 44, animTime or -1, 0, 0)
		end
	end

	if time and type(time) == "number" then
		Citizen.Wait(time)
		ClearPedTasks(ped)
	end

	if not args.dict then RemoveAnimDict(animName[1]) end
end

local function getEntInSight(entityType)
	if entityType and type(entityType) == "string" then entityType = entityType == "VEHICLE" and 2 or entityType == "PED" and 8 end
	local ped = GetPlayerPed(-1)
	local pos = GetEntityCoords(ped) + vector3(.0, .0, -.4)
	local entityWorld = GetOffsetFromEntityInWorldCoords(ped, 0.0, 20.0, 0.0) + vector3(.0, .0, -.4)
	local rayHandle = StartShapeTestRay(pos, entityWorld, entityType and entityType or 10, ped, 0)
	local _,_,_,_, ent = GetShapeTestResult(rayHandle)
	return ent
end

function GetVehicleInSight()
	local ent = getEntInSight(2)
	if ent == 0 then return end
	return ent
end

function GetPropInSight()
	local ped = GetPlayerPed(-1)
	local pos = GetEntityCoords(ped) + vector3(.0, .0, -.4)
	local entityWorld = GetOffsetFromEntityInWorldCoords(ped, 0.0, 20.0, 0.0) + vector3(.0, .0, -.4)
	local rayHandle = StartShapeTestRay(pos, entityWorld, 16, ped, 0)
	local _,_,_,_, ent = GetShapeTestResult(rayHandle)

	if not IsEntityAnObject(ent) then return end
	return ent
end

function GetPedInSight()
	local ent = getEntInSight(8)
	if ent == 0 then return end
	return ent
end

function GetPlayerInSight()
	local ent = getEntInSight(8)
	if ent == 0 or not IsPedAPlayer(ent) then return end
	return ent
end

function IsOutOfSession()
	return GM and GM.State.PlayerCount and GM.State.PlayerCount > 1 and #GetPlayers() <= 1
end

function CanDoIt()
	local Player = LocalPlayer and LocalPlayer()
	if Player and (GM.State.Busy ~= 0 or Player.Dead or Player.KO) then return end
	if Player and Player.Cuffed then ShowAboveRadarMessage("~r~Votre situation empêche de faire cela.") return end
	return true
end

function PlayAudio(...)
	if GetResourceState("pvoice2") == "started" then
		exports.pvoice2:PlayAudio(...)
	elseif GetResourceState("pvoice3") == "started" then
		exports.pvoice3:PlayAudio(...)
	else
		exports.pvoice:PlayAudio(...)
	end
end

function StopAudio(...)
	if GetResourceState("pvoice2") == "started" then
		exports.pvoice2:StopAudio(...)
	elseif GetResourceState("pvoice3") == "started" then
		exports.pvoice3:StopAudio(...)
	else
		exports.pvoice:StopAudio(...)
	end
end

function PlayAudioSource(...)
	if exports.pvoice2 and exports.pvoice2.PlayAudioSource then
		exports.pvoice:PlayAudioSource(...)
	end
end

function GetPedHeadshot(ped)
	local handle, startTime = RegisterPedheadshot(ped), GetGameTimer()
	while not IsPedheadshotReady(handle) and startTime + 10000 > GetGameTimer() do
		Citizen.Wait(100)
	end

	-- HAS TO BE UNREGISTRED
	return IsPedheadshotReady(handle) and GetPedheadshotTxdString(handle)
end

local markerVisible
function DeleteMarkerOverPlayer()
	markerVisible = false
end

function ShowMarkerAbovePlayer(playerID, time)
	local ped, startTime = GetPlayerPed(playerID), GetGameTimer() + time
	if not ped then return end

	markerVisible = true
	Citizen.CreateThread(function()
		while (startTime > GetGameTimer() and DoesEntityExist(ped)) and markerVisible do
			Citizen.Wait(0)
			local plyPos = GetEntityCoords(ped)
			DrawMarker(2, plyPos.x, plyPos.y, plyPos.z + 1.0, 0.0, 0.0, 0.0, 180.0, 0.0, 0.0, 0.1, 0.1, 0.1, 0, 200, 0, 30, 1, 1, 0, 0, 0, 0, 0)
		end
	end)
end

function RequestEntityControl(entity)
	local startRequest = GetGameTimer()
	NetworkRequestControlOfEntity(entity)
	while not NetworkHasControlOfEntity(entity) or startRequest + 10000 <= GetGameTimer() do
		Citizen.Wait(0)
	end

	return NetworkHasControlOfEntity(entity)
end

local entityEnumerator = {
	__gc = function(enum)
	if enum.destructor and enum.handle then
		enum.destructor(enum.handle)
	end
	enum.destructor = nil
	enum.handle = nil
	end
}

local function EnumerateEntities(initFunc, moveFunc, disposeFunc)
	return coroutine.wrap(function()
	local iter, id = initFunc()
	if not id or id == 0 then
		disposeFunc(iter)
		return
	end

	local enum = {handle = iter, destructor = disposeFunc}
	setmetatable(enum, entityEnumerator)

	local next = true
	repeat
		coroutine.yield(id)
		next, id = moveFunc(iter)
	until not next

	enum.destructor, enum.handle = nil, nil
	disposeFunc(iter)
	end)
end

function EnumerateObjects()
	return EnumerateEntities(FindFirstObject, FindNextObject, EndFindObject)
end

function EnumeratePeds()
	return EnumerateEntities(FindFirstPed, FindNextPed, EndFindPed)
end

function EnumerateVehicles()
	return EnumerateEntities(FindFirstVehicle, FindNextVehicle, EndFindVehicle)
end

function EnumeratePickups()
	return EnumerateEntities(FindFirstPickup, FindNextPickup, EndFindPickup)
end

function SendCustomizedMeAction(strMessage, boolInsertLog)
	local insertLog = boolInsertLog or false
	TriggerServerEvent("pichot:sendME", strMessage, insertLog, GetPlayersInRange(64.0, true))
end