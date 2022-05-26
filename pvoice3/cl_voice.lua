local phoneTargets = {}
local radioTargets = {}
local radioAnimationDict = "random@arrests"
local radioAnim = false
-- Local
local math = math
local playerid
local phoneMuted = false

function pVoice:initialize()
    playerid = PlayerId()

    self:loadEvents()

    RequestAndWaitDict(radioAnimationDict)

    self.initDone = true
    -- ShowAboveRadarMessage("~g~[pVoice]~w~ Le vocal vient de se lancer.. Pensez à connecter votre radio si vous étiez déjà connecté.")

    CreateThread(function()
        while true do
            Wait(0)

            pVoice:think()
        end
    end)

    CreateThread(function()
        while true do
            Wait(1000)

            pVoice:think2()
        end
    end)
end

function pVoice:IsPlayerActiveRadioTarget(playerServerId)
    return radioTargets[playerServerId]
end

function pVoice:IsPlayerActivePhoneTarget(playerServerId)
    return phoneTargets[playerServerId]
end

function pVoice:togglePhoneTarget(playerServerId, enabled)
    playerServerId = tonumber(playerServerId)

    debugMessage(("togglePhoneTarget - %s - %s"):format(playerServerId, enabled))
    if enabled then
        phoneTargets[playerServerId] = true
        phoneMuted = false

        AddPlayerToRoom("PHONE", playerServerId)
        ConnectToPeer("PHONE", playerServerId)
        Wait(100)
        SetAudioEffectToPeer("PHONE", playerServerId)
        ChangeVolumeConsumer("PHONE", playerServerId, 1.0, 0.0)
    elseif phoneTargets[playerServerId] then
        phoneTargets[playerServerId] = nil
        phoneMuted = false

        RemovePlayerFromRoom("PHONE", playerServerId)
        DisconnectFromPeer("PHONE", playerServerId)
    end
end

function pVoice:toggleRadioTarget(playerServerId, enabled, suppressAudio)
    playerServerId = tonumber(playerServerId)

    debugMessage(("toggleRadioTarget - %s - %s"):format(playerServerId, enabled))

    if enabled then
        radioTargets[playerServerId] = {}

        AddPlayerToRoom("RADIO", playerServerId)
        ConnectToPeer("RADIO", playerServerId)
        Wait(2000)
        SetAudioEffectToPeer("RADIO", playerServerId)
        ChangeVolumeConsumer("RADIO", playerServerId, GetRadioVolume(), 0.0)

        if not suppressAudio then
            PlayAudio("JOIN_BIP", { volume = 0.1 })
        end
    else
        RemovePlayerFromRoom("RADIO", playerServerId)
        DisconnectFromPeer("RADIO", playerServerId, true)

        radioTargets[playerServerId] = nil
    end
end

function pVoice:addPlayerToRadio(newMember)
    print('pvoice:addPlayerToRadio')
    debugMessage(("addPlayerToRadio - %s"):format(newMember))
    self:toggleRadioTarget(newMember, true, false)
end

function pVoice:addPlayersToRadio(members, channel)
	radioTargets = {}

    DisconnectFromAllPeers("RADIO")
	ClearPlayersToRoom("RADIO")

    print('addPlayersToRadio')

    debugMessage(("addPlayersToRadio - %s - %s"):format(channel, json.encode(members)))

    for k, muted in pairs(members) do
        self:toggleRadioTarget(k, true, true)
    end
end

function pVoice:removePlayerFromRadio(playerServerId)
    playerServerId = tonumber(playerServerId)

    debugMessage(("removePlayerFromRadio - %s"):format(playerServerId))
    self:toggleRadioTarget(playerServerId, false)
end

function pVoice:removeRadio()
    debugMessage("removeRadio")

    radioTargets = {}
    DisconnectFromAllPeers("RADIO")
    ClearPlayersToRoom("RADIO")
	
	if GM.State.RadioState == 0 then
		SetTimeout(1000, function()
			if GM.State.RadioState == 0 and IsConnectedToRoom("RADIO") then
				SendNUIMessage({ type = "quit", args = { "RADIO" } })
				CreateNewRoom("RADIO")
			end
		end)
	end
end

local function addEventListener(eventName, functionName, isNet)
    if isNet then
        RegisterNetEvent(eventName)
    end

    AddEventHandler(eventName, function(...) pVoice[functionName](pVoice, ...) end)
end

function pVoice:loadEvents()
    addEventListener("pvoice:addPlayerToRadio", "addPlayerToRadio", true)
    addEventListener("pvoice:addPlayersToRadio", "addPlayersToRadio", true)
    addEventListener("pvoice:removePlayerFromRadio", "removePlayerFromRadio", true)
    addEventListener("pvoice:removeRadio", "removeRadio", true)

    addEventListener("pvoice:togglePhoneTarget", "togglePhoneTarget")
    -- addEventListener("pvoice:updatePlayersInInstance", "updatePlayersInInstance")
end

function pVoice:think()
    if not radioAnim and GM.State.RadioState == 1 and IsControlJustPressed(0, 249) and GM.State.RadioID[1] and GM.State.RadioID[1] == "Radio" then
        radioAnim = true
        TaskPlayAnim(PlayerPedId(), radioAnimationDict, "generic_radio_chatter", 8.0, 0.0, -1, 49, 0, false, false, false)
    end

    if radioAnim and not IsControlPressed(0, 249) then
        radioAnim = false
        StopAnimTask(PlayerPedId(), radioAnimationDict, "generic_radio_chatter", -4.0)
    end
end

function pVoice:think2()
    for playerServerId, _ in pairs(phoneTargets) do
        SetAudioEffectToPeer("PHONE", playerServerId)
        ChangeVolumeConsumer("PHONE", playerServerId, 1.0, 0.0)
    end

    if GM.State.RadioState == 1 then
        for playerServerId, v in pairs(radioTargets) do
            if not v.lastUpdate or v.lastUpdate + 3000 < GetGameTimer() then
                v.lastUpdate = GetGameTimer()

                SetAudioEffectToPeer("RADIO", playerServerId)
                ChangeVolumeConsumer("RADIO", playerServerId, GetRadioVolume(), 0.0)
            end
        end
    end
end

function TogglePhoneListener(serverId, enabled)
    return pVoice:togglePhoneTarget(serverId, enabled)
end
exports('TogglePhoneListener', TogglePhoneListener)

function TogglePhoneMute(enabled)
    phoneMuted = enabled
end
exports('TogglePhoneMute', TogglePhoneMute)

function IsPhoneMuted()
    return phoneMuted
end

CreateThread(function()
    pVoice:initialize()
end)

if not IS_DEV then return end

RegisterCommand("setchannel", function(source, args)
    print(args[1])
    NetworkSetVoiceChannel(tonumber(args[1]))
end)
