local isLite = GetConvarInt("sv_gtalite", 0) == 1

RegisterCommand("me", function(source, args, rawCommand)
	local str = ""
	for _,v in pairs(args) do
		str = str .. v .. " "
	end
	if not str or string.len(str) <= 1 or string.len(str) > 100 then ShowAboveRadarMessage("Le message est trop long.") return end
	SendCustomizedMeAction("L'individu " .. str, true)
end)

GM = { State = { user = {}, Job = 0, PlayerCount = 0 } }

TriggerEvent("pichot_data:broadcastAll", function(a)
	for k,v in pairs(GM.State) do
		if a[k] ~= nil then GM.State[k] = a[k] end
	end
end)

AddEventHandler("pichot_data:varUpdated", function(varName, varValue, varOnValue)
	if not GM.State[varName] then return end

	if varOnValue then
		GM.State[varName] = GM.State[varName] or {}
		GM.State[varName][varOnValue] = varValue
	else
		GM.State[varName] = varValue
	end
end)

RegisterNetEvent("addedMoney")
AddEventHandler("addedMoney", function(m)
	StatSetInt("MP0_WALLET_BALANCE", m, true)
end)

local GetActivePlayers = GetActivePlayers
local GetPlayerPed = GetPlayerPed
local DoesEntityExist = DoesEntityExist
local SetCanAttackFriendly = SetCanAttackFriendly
local SetAmbientVehicleRangeMultiplierThisFrame = SetAmbientVehicleRangeMultiplierThisFrame
local SetScenarioPedDensityMultiplierThisFrame = SetScenarioPedDensityMultiplierThisFrame
local SetPedDensityMultiplierThisFrame = SetPedDensityMultiplierThisFrame
local SetVehicleDensityMultiplierThisFrame = SetVehicleDensityMultiplierThisFrame
local SetParkedVehicleDensityMultiplierThisFrame = SetParkedVehicleDensityMultiplierThisFrame

Citizen.CreateThread(function()
	N_0x170f541e1cadd1de(false)
	NetworkSetFriendlyFireOption(true)

	while true do
		Citizen.Wait(4000)
		for _,i in pairs(GetActivePlayers()) do
			local ped = GetPlayerPed(i)
			if DoesEntityExist(ped) then
				SetCanAttackFriendly(ped, true, true)
			end
		end
	end
end)

local numPlayers = 0
Citizen.CreateThread(function()
	local SCENARIO_TYPES = { "WORLD_VEHICLE_MILITARY_PLANES_SMALL", "WORLD_VEHICLE_MILITARY_PLANES_BIG" }
	local SCENARIO_GROUPS = { 2017590552, 2141866469, 1409640232, "ng_planes" }
	local SUPPRESSED_MODELS = {"SHAMAL", "LUXOR", "LUXOR2", "JET", "LAZER", "TITAN", "BARRACKS", "BARRACKS2", "CRUSADER", "RHINO", "AIRTUG", "RIPLEY", "MIXER", "FIRETRUK", "duster", "frogger", "maverick", "buzzard", "buzzard2", "polmav", "tanker", "tanker2" }

	while true do
		for _, sctyp in next, SCENARIO_TYPES do
			SetScenarioTypeEnabled(sctyp, false)
		end
		for _, scgrp in next, SCENARIO_GROUPS do
			SetScenarioGroupEnabled(scgrp, false)
		end
		for _, model in next, SUPPRESSED_MODELS do
			SetVehicleModelIsSuppressed(GetHashKey(model), true)
		end

		numPlayers = #GetActivePlayers()
		Citizen.Wait(10000)
	end
end)

CreateThread(function()
	local Player = LocalPlayer()

	while true do
		Wait(0)

		SetScenarioPedDensityMultiplierThisFrame(1.0, 1.0)
		SetPedDensityMultiplierThisFrame(1.0)

		if Player.InVehicle and numPlayers >= 40 or GM.State.PlayerCount >= 350 then
			SetVehicleDensityMultiplierThisFrame(0.0)
			SetAmbientVehicleRangeMultiplierThisFrame(0.0)
			SetParkedVehicleDensityMultiplierThisFrame(0.0)
		else
			SetVehicleDensityMultiplierThisFrame(1.0)
			SetAmbientVehicleRangeMultiplierThisFrame(1.0)
			SetParkedVehicleDensityMultiplierThisFrame(1.0)
		end
	end
end)

RegisterCommand("unfreeze", function()
	local veh = GetVehiclePedIsIn(PlayerPedId())
	if veh then
		FreezeEntityPosition(veh)
	end
end)

TakePhoto = N_0xa67c35c56eb1bd9d
WasPhotoTaken = N_0x0d6ca79eeebd8ca3
SavePhoto = N_0x3dec726c25a11bac
ClearPhoto = N_0xd801cc02177fa3f1

Citizen.CreateThread(function()
	RegisterKeyMapping("+screenshot", "Prendre un screen", "keyboard", "f11")
end)

RegisterCommand('+screenshot', function()
	CreateMobilePhone(1)
	-- CellCamActivate(true, true)

	TakePhoto()

	if WasPhotoTaken() then
		SavePhoto(-1)
		ClearPhoto()
		PlaySoundFrontend(-1, "Camera_Shoot", "Phone_Soundset_Franklin", 0)
	end

	DestroyMobilePhone()
	-- CellCamActivate(false, false)
end, false)

local islandEnabled = false
RegisterCommand("toggleIsland", function()
	islandEnabled = not islandEnabled

	-- set island hopper config
	Citizen.InvokeNative(0x9A9D1BA639675CF1, 'HeistIsland', islandEnabled) -- or use false to disable it
	-- instead of using island hopper you can *also* just load the IPLs mentioned in islandhopper.meta yourself somewhat

	-- switch radar interior
	Citizen.InvokeNative(0x5E1460624D194A38, islandEnabled)
	-- misc natives
	Citizen.InvokeNative(0xF74B1FFA4A15FBEA, islandEnabled)
	Citizen.InvokeNative(0x53797676AD34A9AA, not islandEnabled)    
	SetScenarioGroupEnabled('Heist_Island_Peds', islandEnabled)

	-- audio stuff
	SetAudioFlag('PlayerOnDLCHeist4Island', islandEnabled)
	SetAmbientZoneListStatePersistent('AZL_DLC_Hei4_Island_Zones', islandEnabled, islandEnabled)
	SetAmbientZoneListStatePersistent('AZL_DLC_Hei4_Island_Disabled_Zones', false, islandEnabled)

	print(islandEnabled)
end)