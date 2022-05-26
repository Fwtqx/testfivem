local isLC = GetConvarInt("sh_libertyCity", 0) == 1
local GetGameTimer = GetGameTimer
local HasModelLoaded = HasModelLoaded
local HasAnimDictLoaded = HasAnimDictLoaded
local HasAnimSetLoaded = HasAnimSetLoaded
local IsNewLoadSceneLoaded = IsNewLoadSceneLoaded
local HasCollisionLoadedAroundEntity = HasCollisionLoadedAroundEntity
local GetGroundZAndNormalFor_3dCoord = GetGroundZAndNormalFor_3dCoord
local DisableControlAction = DisableControlAction

function ShowLoadingPrompt(showText, showType)
	BeginTextCommandBusyspinnerOn("STRING")
	AddTextComponentSubstringPlayerName(showText)
	EndTextCommandBusyspinnerOn(showType)
end

function RemoveLoadingPrompt()
	BusyspinnerOff()
end

function ShowLoadingPromptWithTime(showText, showTime, showType)
	Citizen.CreateThread(function()
		ShowLoadingPrompt(showText, showType)
		Citizen.Wait(showTime)
		RemoveLoadingPrompt()
	end)
end

function SecondsToClock(seconds)
	seconds = tonumber(seconds)

	if seconds <= 0 then
		return "00:00"
	else
		local mins = string.format("%02.f", math.floor(seconds / 60))
		local secs = string.format("%02.f", math.floor(seconds - mins * 60))
		return string.format("%s:%s", mins, secs)
	end
end

function ShowAboveRadarMessage(message, back)
	if back then ThefeedNextPostBackgroundColor(back) end
	BeginTextCommandThefeedPost("jamyfafi")
	AddLongString(message)
	return EndTextCommandThefeedPostTicker(0, 1)
end

function ShowNotificationWithButton(button, message, back)
	if back then ThefeedNextPostBackgroundColor(back) end
	BeginTextCommandThefeedPost("jamyfafi")
	return EndTextCommandThefeedPostReplayInput(1, button, message)
end

function DrawTopNotification(txt, beep)
	BeginTextCommandDisplayHelp("jamyfafi")
	AddLongString(txt)
	EndTextCommandDisplayHelp(0, 0, beep, -1)
end

function DrawCustomNotif(txt)
	BeginTextCommandThefeedPost("jamyfafi")
	AddLongString(txt)
	EndTextCommandThefeedPostMessagetextTu("CHAR_SOCIAL_CLUB", "CHAR_SOCIAL_CLUB", 0, 0, "mee", "qsdqsdsdqqsd", 1.0)
	EndTextCommandThefeedPostTicker(0, 1)
end

function ShowAboveRadarMessageIcon(icon, intType, sender, title, text, back)
	if type(icon) == "number" then
		local ped = GetPlayerPed(GetPlayerFromServerId(icon))
		icon = ped and GetPedHeadshot(ped) or GetPedHeadshot(PlayerPedId())
	elseif not HasStreamedTextureDictLoaded(icon) then
		RequestStreamedTextureDict(icon, false)
		while not HasStreamedTextureDictLoaded(icon) do Wait(0) end
	end

	if back then
		ThefeedNextPostBackgroundColor(back)
	end
	BeginTextCommandThefeedPost("jamyfafi")
	AddLongString(text)

	EndTextCommandThefeedPostMessagetext(icon, icon, true, intType, sender, title)
	SetStreamedTextureDictAsNoLongerNeeded(icon)
	return EndTextCommandThefeedPostTicker(0, 1)
end

function DrawCenterText(msg, time)
	ClearPrints()
	BeginTextCommandPrint("STRING")
	AddTextComponentSubstringPlayerName(msg)
	EndTextCommandPrint(time and math.ceil(time) or 0, true)
end

local done
function MoveRightPos(p, ent)
	done = true
	DoScreenFadeOut(100)
	Citizen.Wait(100)
	done = SetEntCoords(p, ent)
	while not done do
		Citizen.Wait(0)
	end
	DoScreenFadeIn(100)
end

function SetEntCoords(pos, ent, trustPos)
	if not pos or not pos.x or not pos.y or not pos.z or (ent and not DoesEntityExist(ent)) then return true end
	local x, y, z = pos.x, pos.y, pos.z + 1.0
	ent = ent or GetPlayerPed(-1)

	RequestCollisionAtCoord(x, y, z)

	if not isLC then
		NewLoadSceneStart(x, y, z, x, y, z, 50.0, 0)

		local tempTimer = GetGameTimer()
		while not IsNewLoadSceneLoaded() do
			if GetGameTimer() - tempTimer > 3000 then
				break
			end

			Citizen.Wait(0)
		end
	end

	SetEntityCoordsNoOffset(ent, x, y, z)

	local tempTimer = GetGameTimer()
	while not HasCollisionLoadedAroundEntity(ent) do
		if GetGameTimer() - tempTimer > 3000 then
			break
		end

		Citizen.Wait(0)
	end

	local foundNewZ, newZ
	if not trustPos then
		foundNewZ, newZ = GetGroundZAndNormalFor_3dCoord(x, y, z)
		tempTimer = GetGameTimer()
		while not foundNewZ do
			z = z + 10.0
			foundNewZ, newZ = GetGroundZAndNormalFor_3dCoord(x, y, z)
			Wait(0)

			if GetGameTimer() - tempTimer > 2000 then
				break
			end
		end
	end

	SetEntityCoordsNoOffset(ent, x, y, foundNewZ and newZ or z)

	if not isLC then
		NewLoadSceneStop()
	end

	if type(pos) ~= "vector3" and pos.a then SetEntityHeading(ent, pos.a) end
	return true
end

function AddLongString(txt)
	local maxLen = 100
	for i = 0, string.len(txt), maxLen do
		local sub = string.sub(txt, i, math.min(i + maxLen, string.len(txt)))
		AddTextComponentSubstringPlayerName(sub)
	end
end

function CreateCBlip(vector3Pos, intSprite, intColor, stringText, boolRoad, floatScale, intDisplay, intAlpha)
	if intSprite == 1 then intSprite = 57 end

	local blip = AddBlipForCoord(vector3Pos.x, vector3Pos.y, vector3Pos.z)
	SetBlipSprite(blip, intSprite)
	SetBlipAsShortRange(blip, true)
	if intColor then SetBlipColour(blip, intColor) end
	if floatScale then SetBlipScale(blip, floatScale) end
	if boolRoad then SetBlipRoute(blip, boolRoad) end
	if intDisplay then SetBlipDisplay(blip, intDisplay) end
	if intAlpha then SetBlipAlpha(blip, intAlpha) end
	if stringText and (not intDisplay or intDisplay ~= 8) then
		BeginTextCommandSetBlipName("STRING")
		AddTextComponentSubstringPlayerName(stringText)
		EndTextCommandSetBlipName(blip)
	end
	return blip
end

function RequestAndWaitModel(modelName)
	if modelName and IsModelInCdimage(modelName) and not HasModelLoaded(modelName) then
		RequestModel(modelName)
		while not HasModelLoaded(modelName) do Citizen.Wait(100) end
	end
end

function RequestAndWaitDict(dictName)
	if dictName and DoesAnimDictExist(dictName) and not HasAnimDictLoaded(dictName) then
		RequestAnimDict(dictName)
		while not HasAnimDictLoaded(dictName) do Citizen.Wait(100) end
	end
end

function RequestAndWaitSet(setName)
	if setName and not HasAnimSetLoaded(setName) then
		RequestAnimSet(setName)

		local startTime = GetGameTimer()
		while not HasAnimSetLoaded(setName) and startTime + 3000 > GetGameTimer() do Citizen.Wait(100) end
	end
end

KEEP_FOCUS = false
local threadCreated = false

local controlDisabled = {1, 2, 3, 4, 5, 6, 18, 24, 25, 37, 68, 69, 70, 91, 92, 142, 182, 199, 200, 245, 257,}

function IsInNuiKeepMode()
	return KEEP_FOCUS
end

function SetKeepInputMode(bool)
	if SetNuiFocusKeepInput then
		SetNuiFocusKeepInput(bool)
	end

	KEEP_FOCUS = bool

	if not threadCreated and bool then
		threadCreated = true

		Citizen.CreateThread(function()
			while KEEP_FOCUS do
				Wait(0)

				for _,v in pairs(controlDisabled) do
					DisableControlAction(0, v, true)
				end
			end

			threadCreated = false
		end)
	end
end

function IsPlayerControlFree()
	return not (KEEP_FOCUS or UpdateOnscreenKeyboard() == 0)
end

function RegisterControlKey(strKeyName, strDescription, strKey, cbPress, cbRelease)
    RegisterKeyMapping("+" .. strKeyName, strDescription, "keyboard", strKey)

	RegisterCommand("+" .. strKeyName, function()
		if not cbPress or UpdateOnscreenKeyboard() == 0 then return end
        cbPress()
    end, false)

    RegisterCommand("-" .. strKeyName, function()
        if not cbRelease or UpdateOnscreenKeyboard() == 0 then return end
        cbRelease()
    end, false)
end

-- Warning, only use it outside of main thread to no block the main thread
function IsAnyVehicleNearPoint2(position, radius, waitTime)
	local selfPos = LocalPlayer().Pos

	-- Volontary put to 300 since stream range seems to be 350, keep a small margin
	-- https://github.com/citizenfx/fivem/blob/147d405a6f3f47654bd6735e5a39b695d6c84848/code/components/citizen-server-impl/src/state/ServerGameState.cpp#L710
	if GetDistanceBetweenCoords(selfPos, position) >= 300.0 then
		local wasFaded = IsScreenFadedOut()
		if not wasFaded then DoScreenFadeOut() end
		-- Force focus to pos to load entities outside of your scope
		SetFocusPosAndVel(position.x, position.y, position.z)
		-- Is this will be enough or too much ???
		Citizen.Wait(waitTime or 5000)
		local isFree = IsAnyVehicleNearPoint(position.x, position.y, position.z, radius)
		ClearFocus()
		if not wasFaded then DoScreenFadeIn() end
		return isFree
	else
		return IsAnyVehicleNearPoint(position.x, position.y, position.z, radius)
	end
end

-- function GetMinimapAnchor()
--     local safezone = GetSafeZoneSize()
--     local safezone_x = 1.0 / 20.0
--     local safezone_y = 1.0 / 20.0
--     local aspect_ratio = GetAspectRatio(0)
--     local res_x, res_y = GetActiveScreenResolution()
--     local xscale = 1.0 / res_x
--     local yscale = 1.0 / res_y
--     local Minimap = {}
--     Minimap.width = xscale * (res_x / (4 * aspect_ratio))
--     Minimap.height = yscale * (res_y / 5.674)
--     Minimap.left_x = xscale * (res_x * (safezone_x * ((math.abs(safezone - 1.0)) * 10)))
--     Minimap.bottom_y = 1.0 - yscale * (res_y * (safezone_y * ((math.abs(safezone - 1.0)) * 10)))
--     Minimap.right_x = Minimap.left_x + Minimap.width
--     Minimap.top_y = Minimap.bottom_y - Minimap.height
--     Minimap.x = Minimap.left_x
--     Minimap.y = Minimap.top_y
--     Minimap.xunit = xscale
-- 	Minimap.yunit = yscale
--     return Minimap
-- end

function GetMinimapAnchor()
    local safezone = GetSafeZoneSize()
    local safezone_x = 1.0 / 20.0
    local safezone_y = 1.0 / 20.0
	local m_aspect_ratio = GetAspectRatio(0)
	local aspect_ratio = m_aspect_ratio > 2 and 16/9 or m_aspect_ratio
    local res_x, res_y = GetActiveScreenResolution()
    local xscale = 1.0 / res_x
    local yscale = 1.0 / res_y
    local Minimap = {}
    Minimap.width = xscale * (res_x / (4 * aspect_ratio))
    Minimap.height = yscale * (res_y / 5.674)
    Minimap.left_x = xscale * (res_x * (safezone_x * ((math.abs(safezone - 1.0)) * 10)))
	if m_aspect_ratio > 2 then
		Minimap.left_x = Minimap.left_x + Minimap.width * 0.845
		Minimap.width = Minimap.width * 0.76
	elseif m_aspect_ratio > 1.8 then
		Minimap.left_x = Minimap.left_x + Minimap.width * 0.2225
		Minimap.width = Minimap.width * 0.995
	end
    Minimap.bottom_y = 1.0 - yscale * (res_y * (safezone_y * ((math.abs(safezone - 1.0)) * 10)))
    Minimap.right_x = Minimap.left_x + Minimap.width
    Minimap.top_y = Minimap.bottom_y - Minimap.height
    Minimap.x = Minimap.left_x
    Minimap.y = Minimap.top_y
    Minimap.xunit = xscale
    Minimap.yunit = yscale
    return Minimap
end

function RemoveNuiFocusForPage()
    exports.pichot_core:RemoveFocusForPage(GetCurrentResourceName())
end

function SetNuiFocusForPage(focus, cursor, options)
    options = options ~= nil and options or {}
    exports.pichot_core:SetFocusForPage(GetCurrentResourceName(), focus, cursor, options, SetNuiFocus, SetNuiFocusKeepInput)
end

function GetControlLabel(controlName, blIncludeTT)
	local inputName = string.format("INPUT_%08X", GetHashKey(controlName))

	return blIncludeTT and ("~" .. inputName .. "~") or inputName
end

function GetHeadingBetweenVector(fromPosition, targetPosition)
	return math.deg(math.atan2(targetPosition.y - fromPosition.y, fromPosition.x - targetPosition.x))
end
