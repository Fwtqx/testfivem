
local soundList = {
	["TEST"] = "test",
	["FISHING"] = "fishing",
	["RADIO_BIP"] = "squelch",
	["MADRAZO_PERFECT"] = "madrazo/perfect",
	["JOIN_BIP"] = "mic_click_off",
	["COUGH"] = "cough",
	["COFFIN"] = "CoffinDance"
}

local soundDuration

-- return dx,dy,dz
local function getCamDirection()
	local heading = GetGameplayCamRelativeHeading()+GetEntityHeading(GetPlayerPed(-1))
	local pitch = GetGameplayCamRelativePitch()
  
	local x = -math.sin(heading*math.pi/180.0)
	local y = math.cos(heading*math.pi/180.0)
	local z = math.sin(pitch*math.pi/180.0)
  
	-- normalize
	local len = math.sqrt(x*x+y*y+z*z)
	if len ~= 0 then
	  x = x/len
	  y = y/len
	  z = z/len
	end
  
	return x,y,z
  end

  
function PlayAudioAtPosition(soundName, position, args, cb)
	local soundPath = soundList[soundName]
	if not soundPath then return end
	args = args or {}

	local gameplayCamCoords = GetEntityCoords(PlayerPedId())

	local offsetPosition = gameplayCamCoords - position
	local camDirectionX, camDirectionY, camDirectionZ = getCamDirection()

	SendNUIMessage({ type = "PLAY_SOUND_AT_POSITION", arguments = { sound = soundPath, args = args, direction = { camDirectionX, camDirectionY, camDirectionZ }, positionOffset = { x = offsetPosition.x, y = offsetPosition.y, z = offsetPosition.z } } })

	if cb then
		soundDuration = nil
	
		local time = GetGameTimer()
		while not soundDuration and time + 1000 > GetGameTimer() do
			Citizen.Wait(0)
		end

		if soundDuration then cb(soundDuration) end
	end
end
exports("PlayAudioAtPosition", PlayAudioAtPosition)

function PlayAudio(soundName, args, cb)
	local soundPath = soundList[soundName]
	if not soundPath then return end

	SendNUIMessage({ type = "PLAY_SOUND", arguments = { sound = soundPath, args = args } })

	if cb then
		soundDuration = nil

		local time = GetGameTimer()
		while not soundDuration and time + 1000 > GetGameTimer() do
			Citizen.Wait(0)
		end

		if soundDuration then cb(soundDuration) end
	end
end

function StopAudio(soundName)
	if soundName then
		SendNUIMessage({ type = "STOP_SOUND_BY_NAME", arguments = { sound = string.lower(soundName) } })
	else
		SendNUIMessage({ type = "STOP_ALL_SOUNDS", arguments = {} })
	end
end

RegisterNUICallback("soundCallback", function(duration)
	soundDuration = duration
end)

RegisterNetEvent("PlayAudio")
AddEventHandler("PlayAudio", PlayAudio)

RegisterNetEvent("StopAudio")
AddEventHandler("StopAudio", StopAudio)

exports("PlayAudio", PlayAudio)
exports("StopAudio", StopAudio)

local radioEffectId = CreateAudioSubmix('Radio')
SetAudioSubmixEffectRadioFx(radioEffectId, 0)
SetAudioSubmixEffectParamInt(radioEffectId, 0, GetHashKey("default"), 1)
SetAudioSubmixEffectParamFloat(radioEffectId, 0, GetHashKey("freq_low"), 389.0)
SetAudioSubmixEffectParamFloat(radioEffectId, 0, GetHashKey("freq_hi"), 3248.0)
SetAudioSubmixEffectParamFloat(radioEffectId, 0, GetHashKey("rm_mix"), 0.1)
SetAudioSubmixEffectParamFloat(radioEffectId, 0, GetHashKey("o_freq_lo"), 348.0)
SetAudioSubmixEffectParamFloat(radioEffectId, 0, GetHashKey("o_freq_hi"), 4900.0)
AddAudioSubmixOutput(radioEffectId, 0)

local phoneEffectId = CreateAudioSubmix('Phone')
SetAudioSubmixEffectRadioFx(phoneEffectId, 1)
SetAudioSubmixEffectParamInt(phoneEffectId, 1, GetHashKey("default"), 1)
SetAudioSubmixEffectParamFloat(phoneEffectId, 1, GetHashKey("freq_low"), 700.0)
SetAudioSubmixEffectParamFloat(phoneEffectId, 1, GetHashKey("freq_hi"), 15000.0)
AddAudioSubmixOutput(phoneEffectId, 1)

local loudspeakerEffectId = CreateAudioSubmix('Loudspeaker')
SetAudioSubmixEffectRadioFx(loudspeakerEffectId, 2)
SetAudioSubmixEffectParamInt(loudspeakerEffectId, 2, GetHashKey("default"), 1)
SetAudioSubmixEffectParamFloat(loudspeakerEffectId, 2, GetHashKey("freq_low"), 370.0)
SetAudioSubmixEffectParamFloat(loudspeakerEffectId, 2, GetHashKey("freq_hi"), 3500.0)
SetAudioSubmixEffectParamFloat(loudspeakerEffectId, 2, GetHashKey("rm_mod_freq"), 256.0)
SetAudioSubmixEffectParamFloat(loudspeakerEffectId, 2, GetHashKey("rm_mix"), 0.1)
SetAudioSubmixEffectParamFloat(loudspeakerEffectId, 2, GetHashKey("o_freq_lo"), 857.0)
SetAudioSubmixEffectParamFloat(loudspeakerEffectId, 2, GetHashKey("o_freq_hi"), 2413.0)
AddAudioSubmixOutput(loudspeakerEffectId, 2)

local submixFunctions = {
    ['radio'] = function(plServerId)
        return MumbleSetSubmixForServerId(plServerId, radioEffectId)
    end,
    ['phone'] = function(plServerId)
        return MumbleSetSubmixForServerId(plServerId, phoneEffectId)
    end,
    ['loudspeaker'] = function(plServerId)
        return MumbleSetSubmixForServerId(plServerId, phoneEffectId)
    end
}

local globalPlayerEffects = {}

function SetPlayerSubmixFunction(plServerId, effectName)
	if not submixFunctions[effectName] then return end

	return submixFunctions[effectName](plServerId)
end

function ResetPlayerSubmixFunction(plServerId)
	if globalPlayerEffects[plServerId] then
		SetPlayerSubmixFunction(plServerId, globalPlayerEffects[plServerId])
		return
	end

	return MumbleSetSubmixForServerId(plServerId, -1)
end

function HasPlayerEffect(playerServerId, effect)
	return globalPlayerEffects[tonumber(playerServerId)] and globalPlayerEffects[tonumber(playerServerId)] == effect
end

-- TODO: Do not reset/set effect if radio/phone
local function addPlayerGlobalEffect(playerServerId, effect)
	playerServerId = tonumber(playerServerId)
	globalPlayerEffects[playerServerId] = effect

	--[[if not pVoice:IsPlayerActiveRadioTarget(playerServerId) and not pVoice:IsPlayerActivePhoneTarget(playerServerId) then
		SetPlayerSubmixFunction(playerServerId, effect)
	end]]
end

local function removePlayerGlobalEffect(playerServerId, effect)
	playerServerId = tonumber(playerServerId)
	globalPlayerEffects[playerServerId] = nil

	--[[if not pVoice:IsPlayerActiveRadioTarget(playerServerId) and not pVoice:IsPlayerActivePhoneTarget(playerServerId) then
		ResetPlayerSubmixFunction(playerServerId)
	end]]
end

local function setPlayerGlobalEffect(tblData)
	for playerServerId, effect in pairs(tblData) do
		addPlayerGlobalEffect(playerServerId, effect)
	end
end

local eventHandler = {
	["add"] = addPlayerGlobalEffect,
	["remove"] = removePlayerGlobalEffect,
	["set"] = setPlayerGlobalEffect,
}

RegisterNetEvent("pvoice:setPlayersGlobalEffect")
AddEventHandler("pvoice:setPlayersGlobalEffect", function(strId, serverId, effect)
	if not eventHandler[strId] then return end

	eventHandler[strId](serverId, effect)
end)