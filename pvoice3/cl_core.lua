ServerId = "rp"
local server = ServerId .."_"
local serverIdentifier = GetConvar("sh_serverid", "wh_1")

-- FIX ACTIVATION VOCALE POUR RADIO/TELEPHONE

local myvolume = 1.0
local customVolume = 1.0
local radioVolume = 1.0
local voicestate = "loading"
local pushtotalk = false
local debug = false
local usb = false
local currentNotify
local currentVoiceMode = 2
local gameLoaded = true
local restartingVoice = false

local isUsing2dMode = true

local serverIdentifierToIp = {
    ["wh_1"] = { "lifevoice.glife.fr", 4443 },
    ["li_v4_01"] = { "litevoice.glife.fr", 4443 },
}

local playerPositionHandler = {
	function(ped) return GetEntityCoords(ped) end,
	function() return GetCamCoord(GetRenderingCam()) end,
	function() return GetGameplayCamCoord() end
}
local positionMode = 1

local carVoiceEffects = {
	{ name = "lpf1", type = "biquad", data = { type = "lowpass", frequency = { value = 500.0 } } }
}

local radioVoiceEffects = {
	{ name = "lpf1", type = "biquad", data = { type = "bandpass", frequency = { value = 1700.0 } } },
	--{ name = "hpf1", type = "biquad", data = { type = "highpass", frequency = { value = 500.0 } } },
}

local phoneVoiceEffects = {
	{ name = "lpf1", type = "biquad", data = { type = "lowpass", frequency = { value = 2000.0 } } },
    { name = "lpf2", type = "biquad", data = { type = "lowpass", frequency = { value = 2000.0 } } },
	{ name = "hpf1", type = "biquad", data = { type = "highpass", frequency = { value = 500.0 } } },
    { name = "hpf2", type = "biquad", data = { type = "highpass", frequency = { value = 500.0 } } },
    { name = "cmp1", type = "compressor", data = { type = "compressor" } },
}

local megaphoneEffects = {
	{ name = "lpf1", type = "biquad", data = { type = "lowpass", frequency = { value = 2000.0 } } },
    { name = "lpf2", type = "biquad", data = { type = "lowpass", frequency = { value = 2000.0 } } },
    { name = "hpf1", type = "biquad", data = { type = "highpass", frequency = { value = 500.0 } } },
    { name = "hpf2", type = "biquad", data = { type = "highpass", frequency = { value = 500.0 } } },
    { name = "dst1", type = "distortion", data = { type = "distortion" } },
    { name = "cmp1", type = "compressor", data = { type = "compressor" } },
}

local voiceModes = {
    { name = "Chuchotement", distance = 2.5, extraArgs = { 2.0, 2.0, true }, msg = "~o~très basse" },
    { name = "Normal", distance = 1.0, msg = "~g~normal" },
    { name = "Crier", distance = 0.1, msg = "~r~crier" },
    { name = "Mégaphone", distance = 0.0001, canUse = function() return false end, msg = "~r~mégaphone" },
}

local rooms = {
    ['GLOBAL'] = {
        myvolume = 1.0,
        voicestate = "loading",
        pushtotalk = false,
        debug = false,
        players = {},
        peers = {},
        cached = {},
        harks = {},
        effects = {}
    },
    ['RADIO'] = {
        myvolume = 1.0,
        voicestate = "loading",
        pushtotalk = false,
        debug = false,
        players = {},
        peers = {},
        cached = {},
        harks = {},
        effects = {},
        effectData = radioVoiceEffects,
    },
    ['PHONE'] = {
        myvolume = 1.0,
        voicestate = "loading",
        pushtotalk = false,
        debug = false,
        players = {},
        peers = {},
        cached = {},
        harks = {},
        effects = {},
        effectData = phoneVoiceEffects,
    }
}

-- Utils functions
function CreateNewRoom(name)
    rooms[name] = {
        myvolume = 1.0,
        voicestate = "loading",
        pushtotalk = false,
        debug = true,
        players = {},
        peers = {},
        cached = {},
        harks = {},
        effects = {}
    }
end

local function checkRoomExistsAndRoomState(roomId)
	if rooms[roomId] and rooms[roomId].voicestate == 'connected' then return end

    local i = 0
    while not rooms[roomId] and i < 100 do
        Wait(0) i = i + 1
	end

	if not rooms[roomId] then return end

	i = 0

    while rooms[roomId] and rooms[roomId].voicestate ~= "connected" and i < 100 do
        Wait(10) i = i + 1
	end

    if i > 0 then
        Wait(3000)
    end
end

local function generateVolume(x1, y1, z1, x2, y2, z2, mult, increase)
    local s = GetDistanceBetweenCoords(x1, y1, z1, x2, y2, z2, true)
    return -((s * s - 200) / (increase or 1.0)) / ((s * s * s * s + 200) * (mult or 1.0))
end

local function generateCustomVolume(x1, y1, z1, x2, y2, z2, data)
    local volume = 0.0
	local dist = GetDistanceBetweenCoords(x1, y1, z1, x2, y2, z2, true)

    if data.type == 'linear' then
        volume = 1 - data.rolloffFactor * (dist - data.refDistance) / (data.maxDistance - data.refDistance)
    elseif data.type == 'inverse' then
        volume = data.refDistance / (data.refDistance + data.rolloffFactor * (math.max(dist, data.refDistance) - data.refDistance))
    elseif data.type == 'exponential' then
        volume = math.pow(math.max(dist, data.refDistance) / data.refDistance, -data.rolloffFactor)
	end

    if data.maxVolume and volume > data.maxVolume then
        volume = data.maxVolume
    end

    return volume / data.volumeDivisor
end

local function notify(msg)
    if currentNotify then
        RemoveNotification(currentNotify)
        currentNotify = nil
	end

    SetNotificationTextEntry("STRING")
    AddTextComponentString(msg)
    currentNotify = DrawNotification(true, false)
end

local function generateBalance(x1,y1,x2,y2,nx,ny)
    local yaw = GetGameplayCamRot(2).z
    local nx = -math.sin(yaw * math.pi / 180)
    local ny = math.cos(yaw * math.pi / 180)

    local x = (x2 - x1)
    local y = (y2 - y1)
    local s = math.sqrt(x * x + y * y)
    x = x / s
	y = y / s

    if x * ny - nx * y > 0 then
        return math.sqrt(1 - (x * nx + y * ny) * (x * nx+ y * ny))
    elseif x * ny- nx * y < 0 then
        return -math.sqrt(1 - (x * nx + y * ny) * (x * nx + y * ny))
    end

    return 0.0
end
-- End utils functions

RegisterNUICallback("changeStateConnection", function(data, cb)
    cb('ok')
    print("changeStateConnection", json.encode(data.state))

	if not rooms[data.roomId] then return end

	Wait(1000)

    if debug then
        print("[pVoice3] Voice state switch: ".. data.state)
	end

    if data.roomId == "GLOBAL" then
        if data.state == "connected" then
            ShowAboveRadarMessage("~g~Connecté au chat global.")
        end

        if data.state == "disconnected" then
            ShowAboveRadarMessage("~r~Déconnecté du chat global.")
        end
    end

    rooms[data.roomId].voicestate = data.state
end)

-- Запрос на подключение
RegisterNUICallback("requestMediaPeerResponse", function(data, cb)
    cb('ok')
    print("requestMediaPeerResponse", json.encode(data.state))
	if not rooms[data.roomId] then return end

    if data.status then
        rooms[data.roomId].peers[data.peerName] = true
		rooms[data.roomId].effects[data.peerName] = {}

        if debug then
            print("[pVoice3] REQUEST peer success: ".. data.peerName)
        end
    else
        rooms[data.roomId].peers[data.peerName] = nil
		rooms[data.roomId].effects[data.peerName] = nil
	
        if debug then
            print("[pVoice3] REQUEST peer failed: ".. data.peerName)
        end
    end
end)

-- Запрос на отключение
RegisterNUICallback("requestCloseMediaPeerResponse", function(data, cb)
    cb('ok')
    print("requestCloseMediaPeerResponse", json.encode(data))
    if not rooms[data.roomId] then return end
    rooms[data.roomId].peers[data.peerName] = nil

    if data.status then
        if debug then
            print("[pVoice3] CLOSE peer success: ".. data.peerName)
        end
    else
        if debug then
            print("[pVoice3] CLOSE peer failed: ".. data.peerName)
        end
    end
end)

-- Громкость пиров
RegisterNUICallback("changeConsumersVolume", function(data)
	harks = data.consumers

    if debug then
        print("[pVoice3] Got hark data: " .. tostring(data))
    end

    cb('ok')
end)

-- Моя громкость
RegisterNUICallback("changeProducerVolume", function(data)
    myvolume = data.volume
    if debug then
        print("[pVoice3] Got new my volume: " .. tostring(myvolume))
    end

    cb('ok')
end)

function JoinRoom(roomId)
	SendNUIMessage({ type = "init", args = { roomId, server .. "pl_" .. GetPlayerServerId(PlayerId()), "gliferp" } })
end

RegisterNetEvent("voice:restartVoice")
AddEventHandler("voice:restartVoice", function(roomId)
    if not roomId then
        roomId = "GLOBAL"
	end

    restartingVoice = true
    notify("Restart du chat vocal en cours... (" .. roomId .. ")")
    SendNUIMessage({ type = "quit", args = { roomId } })
    -- rooms[roomId].players = {} -- Менеджер игроков
    -- rooms[roomId].peers = {} -- Подключенные/подключаемые пиры
    -- rooms[roomId].harks = {} -- Громкость (харк) пиров
    -- rooms[roomId].cached = {} -- Кэш позиционирования
    CreateNewRoom(roomId)
	Wait(2500)

    JoinRoom(roomId)
	TriggerServerEvent('voice:disconnectFromAll', roomId, server .. "pl_" .. GetPlayerServerId(PlayerId()))

    Wait(10000)
    notify("~g~Le vocal a restart.")
    restartingVoice = false
end)

RegisterNetEvent("voice:restartVoice_fast")
AddEventHandler("voice:restartVoice_fast", function(roomId)
    if not roomId then roomId = "GLOBAL" end

	SendNUIMessage({ type = "restartIceAllRooms", args = {} })

    for k,v in pairs(rooms[roomId].players) do
        DisconnectFromPeer(roomId, k)
    end

    Wait(500)
    -- rooms[roomId].players = {} -- Менеджер игроков
    rooms[roomId].peers = {} -- Подключенные/подключаемые пиры
    -- rooms[roomId].harks = {} -- Громкость (харк) пиров
    -- rooms[roomId].cached = {} -- Кэш позиционирования
    rooms[roomId].effects = {}
    Wait(500)
    notify("~g~Le vocal a restart.")
end)

RegisterNetEvent("voice:restartIceAllRooms")
AddEventHandler("voice:restartIceAllRooms", function()
    SendNUIMessage({ type = "restartIceAllRooms", args = {} })
end)

RegisterNetEvent('voice:disconnectFromAllClient')
AddEventHandler('voice:disconnectFromAllClient', function(roomId, name)
    if not rooms[roomId] or not name then return end

    if rooms[roomId].peers[name] then
        SendNUIMessage({ type = "streamOut", args = { roomId, name } })
        Wait(100)
	end

    rooms[roomId].players[name] = nil
    rooms[roomId].peers[name] = nil
    rooms[roomId].harks[name] = nil
    rooms[roomId].cached[name] = nil
	rooms[roomId].effects[name] = nil

    if debug then
        print("[pVoice3] Removing player ".. name .." due Force for "..roomId)
    end
end)

RegisterNetEvent("voice:quitRoom")
AddEventHandler("voice:quitRoom", function (roomId)
    if rooms[roomId] then
        SendNUIMessage({ type = "quit", args = { roomId } })
        rooms[roomId] = nil
    end
end)

local function checkRoomExistsWithPlayer(roomId, player)
    local name = server .. "pl_" .. player
	local i = 0

	while rooms[roomId].peers[name] == false and i < 30 and rooms[roomId].players[name] do
		print(json.encode(rooms[roomId].peers[name]))
		Wait(100)
		i = i + 1
	end

	if not rooms[roomId].peers[name] then
		if rooms[roomId].players[name] == nil then
			rooms[roomId].peers[name] = nil
		end

		return
	end
end

function SetAudioEffectToPeer(roomId, player)
	checkRoomExistsAndRoomState(roomId)
    checkRoomExistsWithPlayer(roomId, player)

    local name = server .. "pl_" .. player
    if debug then
    --    print('set effects', name, roomId)
	end

    SendNUIMessage({ type = "setConsumerAudioEffects", args = { roomId, name, rooms[roomId].effectData or {} } })
end

RegisterNetEvent("voice:setAudioEffectsToPeers")
AddEventHandler("voice:setAudioEffectsToPeers", function(roomId, players)
    checkRoomExistsAndRoomState(roomId)
    for k,v in pairs(players) do
        if debug then
            print(roomId, k)
		end

        SetAudioEffectToPeer(roomId, k, rooms[roomId].effectData or {})
    end
end)

function DisconnectFromPeer(roomId, player)
    local name = not string.find(player, 'pl_') and server.."pl_".. player or player
    print("disconnect from peer: "..name, roomId)

    if not rooms[roomId] then return end
    print("disconnect from peer2: "..name, roomId)

    rooms[roomId].peers[name] = false
    SendNUIMessage({ type = "streamOut", args = { roomId, name } })
end

RegisterNetEvent("voice:disconnectFromPeer")
AddEventHandler("voice:disconnectFromPeer", DisconnectFromPeer)

function ConnectToPeer(roomId, player)
	--checkRoomExistsAndRoomState(roomId)

    local tblRoom = rooms[roomId]
    local name = not string.find(player, 'pl_') and server .. "pl_" .. player or player
    if debug then
        print('single connect ' .. roomId)
        print("connect to peer: "..name)
	end

    tblRoom.peers[name] = false
    SendNUIMessage({ type = "streamIn", args = { roomId, name } })
end

function AddPlayerToRoom(roomId, player)
    checkRoomExistsAndRoomState(roomId)
    local name = server.."pl_".. player
    rooms[roomId].players[name] = true
end

function RemovePlayerFromRoom(roomId, player)
    if not rooms[roomId] then
        return
	end

    local name = server.."pl_".. player
    rooms[roomId].players[name] = nil
end

function ClearPlayersToRoom(roomId)
    if not rooms[roomId] then
        return
    end

    rooms[roomId].players = {}
end

function DisconnectFromAllPeers(roomId)
	checkRoomExistsAndRoomState(roomId)

    for k,v in pairs(rooms[roomId].peers) do
        DisconnectFromPeer(roomId, k)
    end
end

RegisterNetEvent("voice:connectToPeers")
AddEventHandler("voice:connectToPeers", function(roomId, players)
    checkRoomExistsAndRoomState(roomId)
    for k,v in pairs(players) do
        if debug then
            print(roomId, k)
		end

        ConnectToPeer(roomId, k)
    end
end)

RegisterNetEvent('voice:setVolume_1')
AddEventHandler('voice:setVolume_1', function(roomId, value)
    if not value then return end
    if value < 1.0 then
        value = 1.0
    end
    -- if not roomId then
    --     roomId = "GLOBAL"
    -- end
    rooms[roomId].myvolume = value
    SendNUIMessage({ type = "changeMainVolume", args = { roomId, value } })
end)

function ChangeVolumeConsumer(roomId, player, volume, balance)
    checkRoomExistsAndRoomState(roomId)
    checkRoomExistsWithPlayer(roomId, player)

    local name = server .. "pl_" .. player
    SendNUIMessage({ type = "changeVolumeConsumer", args = { roomId, name, volume, balance } })
end

RegisterNetEvent("voice:changeVolumeConsumers")
AddEventHandler("voice:changeVolumeConsumers", function(roomId, players, balance, volume)
    CheckRoomExistsAndRoomState(roomId)
    local data = {}
    for k,v in pairs(players) do
        table.insert(data, { name = server.."pl_".. k, balance = balance, volume = volume })
    end
    if debug then
        print(json.encode(data))
    end
    SendNUIMessage({type="changeVolumeConsumers", args={roomId, data}})
end)

local function setVoiceUsbMode(flag)
    if voicestate == "connected" then
        usb = flag
        usb = false -- shitcode fix

        SendNUIMessage({ type = "changeProducerIsUsb", args = { usb } })
        print("[Umbrella RP] Changing voice USB mode: ".. tostring(usb))
    end
end

CreateThread(function()
    if not serverIdentifierToIp[serverIdentifier] then return error("NO IP FOR SERVER ID") end
    local total = 0

    while total < 15 do
        Wait(200)

        total = total + 1
        SendNUIMessage({ type = "setServerUrl", args = serverIdentifierToIp[serverIdentifier] })
    end
end)

Citizen.CreateThread(function()
    DecorRegister("Voice_Speaking", 2)
    DecorRegister("Streamer_Mode", 2)

    while true do
        Wait(1000)

		local playerId = PlayerId()
        for k,i in pairs(GetActivePlayers()) do
			Wait(0)
            if i ~= playerId and IsEntityVisible(GetPlayerPed(i))  then
                local name = server .. "pl_" .. GetPlayerServerId(i)

                if rooms.GLOBAL.players[name] == nil then
					rooms.GLOBAL.players[name] = true

                    if debug then
                        print("[pVoice3] Adding new player ".. name .." into queue")
                    end
                end
            end
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Wait(500)

        local playerId = PlayerId()

		for _,player in pairs(GetActivePlayers()) do
            if player ~= playerId then
                local value = DecorGetBool(GetPlayerPed(player), "Voice_Speaking")
				if value and not NetworkIsPlayerTalking(player) then
                    SetPlayerTalkingOverride(player, value)
                elseif not value and NetworkIsPlayerTalking(player) then
                    SetPlayerTalkingOverride(player, value)
                end
            end
        end
    end
end)

local function disconnectPeerFromGlobalChannel(peerName)
	if rooms.GLOBAL.players[peerName] == false then return end

	rooms.GLOBAL.players[peerName] = false

	if rooms.GLOBAL.peers[peerName] then
		SendNUIMessage({ type = "streamOut", args = { "GLOBAL", peerName } })
		rooms.GLOBAL.peers[peerName] = false
		Wait(500)
	end

	rooms.GLOBAL.players[peerName] = nil
	rooms.GLOBAL.harks[peerName] = nil
	rooms.GLOBAL.cached[peerName] = nil

	if debug then
		print("[pVoice3] Removing player ".. peerName .." due NetworkIsPlayerActive Force")
	end
end

Citizen.CreateThread(function()
    local player_count = 0
    local defaultWait = 3000
    local currentWait = defaultWait

    while true do
        Wait(currentWait)

        local myPed = PlayerPedId()

        if NetworkIsInSpectatorMode() then
			positionMode = 3
		elseif GM.State.SpectateMode then
			positionMode = 2
		else
			positionMode = 1
		end

        if rooms.GLOBAL.voicestate == "connected" then
            local connect_dist = 40
            local disconnect_dist = 60
            local wait = 1000
            -- Dynamic connection dist if a lot of clients or the opposite?

            for k,v in pairs(rooms.GLOBAL.players) do
                -- print('do some')
                -- local name = server.."pl_".. GetPlayerServerId(i)
                local name = k
                local serverId = tonumber(stringsplit(k, '_')[3])
                local player = GetPlayerFromServerId(serverId)
                local otherPed = GetPlayerPed(player)

                if player == -1 or otherPed == 0 or not IsEntityVisible(otherPed) then
					disconnectPeerFromGlobalChannel(name)
                else
                    if v == true then
                        local dist = GetDistanceBetweenCoords(playerPositionHandler[positionMode](myPed), GetEntityCoords(otherPed), true)

                        -- if dist < connect_dist then
                        --     player_count = player_count + 1
                        -- end

                        if rooms.GLOBAL.peers[name] == nil and dist < connect_dist then -- Подключение при приближении
                            if debug then
                                print("[pVoice3] Streaming IN peer ".. name)
							end

                            rooms.GLOBAL.peers[name] = false
                            SendNUIMessage({ type = "streamIn", args = { 'GLOBAL', name } })
                            Wait(wait)
                        elseif rooms.GLOBAL.peers[name] == true and dist > disconnect_dist then -- Отключение при отдалении
                            if debug then
                                print("[pVoice3] Streaming OUT peer ".. name)
							end

                            rooms.GLOBAL.peers[name] = false
                            SendNUIMessage({ type = "streamOut", args = { 'GLOBAL', name } })
                            Wait(wait)
                        --[[elseif rooms.GLOBAL.peers[name] == false and dist < connect_dist then
                            if debug then
                                print("[pVoice3] Streaming IN peer 2 ".. name)
							end

                            rooms.GLOBAL.peers[name] = false
                            SendNUIMessage({ type = "streamOut", args = { 'GLOBAL', name } })
                            Wait(wait / 2)
                            SendNUIMessage({ type = "streamIn", args = { 'GLOBAL', name } })
                            Wait(wait / 2)]]
                        end
                    end
                end
            end
        end
    end
end)

local function isAllVehicleDoorsAndWindowsClosed(veh)
    if not AreAllVehicleWindowsIntact(veh) then return false end

	local doors = GetNumberOfVehicleDoors(veh)
    if doors <= 1 then return false end

    for i = 0, doors do
        if GetVehicleDoorAngleRatio(veh, i) > 0.0 or (i < doors - 2 and not IsVehicleWindowIntact(veh, i)) then
            return false
        end
    end

    return true
end

CreateThread(function()
    DecorRegister("Voice_Mode", 3)

    local volumeData = {
        type = 'linear',
        refDistance = 0.5,
        rolloffFactor = 0.5,
        maxDistance = 25.0,
        volumeDivisor = 1,
        -- maxVolume = 0.5
    }

    while true do
        Wait(250)

        local room = rooms.GLOBAL

        if room.voicestate == "connected" and not restartingVoice then
            local senddata = {}
            local shouldsend = false
            local playerPed = PlayerPedId()

            local x1,y1,z1 = table.unpack(playerPositionHandler[positionMode](playerPed))
            local myname = GetPlayerName(PlayerId())

            local myVeh = GetVehiclePedIsIn(playerPed)

            if x1 ~= 0.0 then

                for k,v in pairs(room.peers) do
                    local name = k
                    local serverId = tonumber(stringsplit(k, '_')[3])
                    local player = GetPlayerFromServerId(serverId)
                    local ped = GetPlayerPed(player)

                    if room.players[name] == true and room.peers[name] == true and ped ~= 0 or not IsEntityVisible(ped) then
                        local ped = GetPlayerPed(player)
                        local pos = GetPedBoneCoords(ped, 31086, 0.0, 0.0, 0.0)
                        local veh = GetVehiclePedIsIn(ped)

                        local state = DecorGetInt(ped, 'Voice_Mode')
                        if state == 0 then state = 2 end

                        local distanceFromPlayer = GetDistanceBetweenCoords(x1, y1, z1, pos.x, pos.y, pos.z)

                        local stateData = voiceModes[state]
                        local range = stateData.distance
                        local extraArgs = stateData.extraArgs or { false, false, false }
                        local dist, increase, no_walls = extraArgs[1], extraArgs[2], extraArgs[3]

                        local volume = generateVolume(x1, y1, z1, pos.x, pos.y, pos.z, range, increase)
                        local balance = generateBalance(x1, y1, pos.x, pos.y)
                        volume = (volume < 0.0) and 0.0 or (volume > customVolume) and customVolume or volume
                        balance = (balance < -0.95) and -0.95 or (balance > 0.95) and 0.95 or balance

                        if GetInteriorFromEntity(ped) ~= 0 and distanceFromPlayer < 6 and not HasEntityClearLosToEntityInFront(ped, playerPed) then
                            if no_walls then
                                volume = 0.0
                            end
                        end

                        if dist and distanceFromPlayer > dist then
                            volume = 0.0
                            balance = 0.0
                        end

                        local clearEffects, effects = false
                        local megaphoneState = HasPlayerEffect(serverId, "louspeaker")

                        if room.effects[name] and type(room.effects[name]) == "table" then
                            if not megaphoneState then
                                local inCarState = myVeh ~= veh and (veh ~= 0 and isAllVehicleDoorsAndWindowsClosed(veh) or (myVeh ~= 0 and isAllVehicleDoorsAndWindowsClosed(myVeh)))

                                if not room.effects[name].inCar and inCarState then
                                    effects = carVoiceEffects

                                    clearEffects = true

                                    room.effects[name].inCar = true
                                elseif room.effects[name].inCar and not inCarState then
                                    room.effects[name].inCar = nil

                                    clearEffects = true
                                end
                            else
                                if not room.effects[name].megaphone and megaphoneState then
                                    volume = generateCustomVolume(x1, y1, z1, pos.x, pos.y, pos.z, volumeData)
                                    if volume > 0.5 then
                                        volume = 0.5
                                    end
                                    effects = megaphoneEffects

                                    clearEffects = true

                                    room.effects[name].megaphone = true
                                elseif room.effects[name].megaphone and not megaphoneState then
                                    room.effects[name].megaphone = nil

                                    clearEffects = true
                                end
                            end
                        end

                        local data = { name = name, volume = volume, balance = isUsing2dMode and 0.0 or balance, effects = effects, clearEffects = clearEffects }
                        senddata[#senddata + 1] = data
                        shouldsend = true
                    end
                end

                if shouldsend then
                    SendNUIMessage({ type = "changeVolumeConsumers", args = { 'GLOBAL', senddata } })
                end
            end
        end
    end
end)

local function toggleVoice(enabled)
	print('toggleVoice', tostring(enabled))

    if rooms.GLOBAL.pushtotalk ~= enabled then
        local ped = PlayerPedId()

        if enabled then
            DecorSetBool(ped, "Voice_Speaking", enabled)
        else
            DecorRemove(ped, "Voice_Speaking")
        end

        SendNUIMessage({ type = enabled and "unmuteMic" or "muteMic", args = { "GLOBAL" } })
        rooms.GLOBAL.pushtotalk = enabled

        if enabled then
		    PlayFacialAnim(ped, "mic_chatter", "mp_facial")
        else
		    PlayFacialAnim(ped, "mood_normal_1", "facials@gen_male@base")
        end
    end

    if rooms.PHONE.pushtotalk ~= enabled or (IsPhoneMuted() and rooms.PHONE.pushtotalk) and (not enabled or tableCount(rooms.PHONE.players) > 0) then
        SendNUIMessage({ type = enabled and not IsPhoneMuted() and "unmuteMic" or "muteMic", args = { "PHONE" } })
        rooms.PHONE.pushtotalk = enabled
    end

    
    if rooms.RADIO.pushtotalk ~= enabled and (not enabled or GM.State.RadioState == 1) then
        SendNUIMessage({ type = enabled and "unmuteMic" or "muteMic", args = { "RADIO" } })
        rooms.RADIO.pushtotalk = enabled
    end
end

local notifID
local function updateVocalMode(intMode)
    if not intMode then
        local nextMode = intMode or currentVoiceMode + 1
        while not voiceModes[nextMode] or (voiceModes[nextMode] and voiceModes[nextMode].canUse and not voiceModes[nextMode].canUse()) do
            nextMode = voiceModes[nextMode + 1] or 1
        end

        currentVoiceMode = nextMode
    else
        currentVoiceMode = intMode
    end

	DecorSetInt(PlayerPedId(), "Voice_Mode", currentVoiceMode)
	SendNUIMessage({ type = "SET_TALKING_MODE", arguments = { mode = currentVoiceMode } })

	local modeData = voiceModes[currentVoiceMode]
	if modeData then
		-- self.onlyVehicle = modeData.veh
		if modeData.msg then
			if notifID then ThefeedRemoveItem(notifID) end
			notifID = ShowAboveRadarMessage(string.format("L'intensité de votre voix a été réglée sur %s~w~.", modeData.msg))
			Citizen.SetTimeout(4000, function() if notifID then ThefeedRemoveItem(notifID) end end)
		end
	end
end

AddEventHandler("pvoice:switchVoiceMode", function(intMode)
    updateVocalMode(intMode)
end)

Citizen.CreateThread(function()
	RequestAnimDict("mp_facial")
	RequestAnimDict("facials@gen_male@base")

	RegisterControlKey("switchMode", "Changer l'intensité de la voix", "f6", function()
		updateVocalMode()
	end)

    while true do
        Wait(0)

        if IsControlPressed(0, 19) and IsControlJustPressed(0, 57) then
            SendNUIMessage({ type = "restartIceAllRooms", args = {} })
            print("[pVoice3] Restarting transports")
		end
		
		local isPlayerTalking = NetworkIsPlayerTalking(PlayerId())

        if not rooms.GLOBAL.pushtotalk and (IsControlPressed(0, 249) or isPlayerTalking) then
            toggleVoice(true)
		elseif rooms.GLOBAL.pushtotalk and not IsControlPressed(0, 249) and not isPlayerTalking then
            Wait(200)
            toggleVoice(false)
        end
    end
end)

function GetVoiceRooms()
    return rooms
end

AddEventHandler("playerSpawned",function()
    Wait(5000)
    gameLoaded = true
end)

RegisterNetEvent('voice:restarted')
AddEventHandler("voice:restarted",function()
    gameLoaded = true
end)

function CreateRadioRoom(roomId)
    rooms[roomId] = Deepcopy(defaultRadioChannel)
end

function ConnectToRoom(roomId, createIfNotExist)
    if createIfNotExist and not rooms[roomId] then
        CreateRadioRoom(roomId)
    end

    if IsConnectedToRoom(roomId) or rooms[roomId].voicestate == "connecting" then return end

    if debug then
        print("[pVoice3] Connecting to voice as " .. server .. "pl_".. GetPlayerServerId(PlayerId()))
    end

    rooms[roomId].voicestate = "connecting"
    SendNUIMessage({ type = "setServerUrl", args = serverIdentifierToIp[serverIdentifier] })
    SendNUIMessage({ type = "run", args = { roomId, server.."pl_".. GetPlayerServerId(PlayerId()), "gliferp" } })

    while not IsConnectedToRoom(roomId) do
        Wait(1000)
        print("Waiting for connection to " .. roomId)
    end
end

function IsConnectedToRoom(roomId)
    return rooms[roomId] and rooms[roomId].voicestate == "connected"
end

function DisconnectFromRoom(roomId, deleteRoom)
    if not IsConnectedToRoom(roomId) then return end

    SendNUIMessage({ type = "quit", args = { roomId } })

    if rooms[roomId] then
        rooms[roomId].players = {}
        rooms[roomId].peers = {}
        rooms[roomId].harks = {}
        rooms[roomId].cached = {}
        rooms[roomId].effects = {}
    end

    while IsConnectedToRoom(roomId) do
        Wait(1000)
        print("Waiting for disconnection of " .. roomId)
    end

    if deleteRoom then
        rooms[roomId] = nil
    end
end

Citizen.CreateThread(function()
    Wait(1000)

    while true do
        Wait(500)

        if gameLoaded then
            for k,v in pairs(rooms) do
                if k == 'RADIO' then
                    for name,_ in pairs(v.players) do
                        Wait(100)
                        if v.peers[name] == nil then
                            ConnectToPeer(k, name)
                        end
                    end
				end

                if v.voicestate == 'connecting' then
                    TriggerEvent('voice:restartVoice', k)
				end

                if v.voicestate == "closed" or v.voicestate == "loading" then
                    if debug then
                        print("[pVoice3] Connecting to voice as " .. server .. "pl_".. GetPlayerServerId(PlayerId()))
					end

                    SendNUIMessage({ type = "run", args = { k, server.."pl_".. GetPlayerServerId(PlayerId()), "gliferp" } })
                    Wait(5000)
                end
            end
        end
    end
end)

RegisterControlKey("radioVolumeUp", "Augmenter le volume de la radio", "PLUS", function()
    radioVolume = math.min(4.0, round(radioVolume + 0.1, 1))
    local percent = math.floor((radioVolume / 1) * 100)
    DrawCenterText("Volume de la radio à "..percent.."%", 2000)
end)

RegisterControlKey("radioVolumeDown", "Diminuer le volume de la radio", "MINUS", function()
    radioVolume = math.max(0.1, round(radioVolume - 0.1, 1))
    local percent = math.floor((radioVolume / 1) * 100)
    DrawCenterText("Volume de la radio à "..percent.."%", 2000)
end)

function GetRadioVolume()
    return radioVolume
end

function IsDebugEnabled()
    return debug
end

RegisterCommand("voice_debug", function()
    debug = not debug
    print("[pVoice3] Voice debug mode: ".. tostring(debug))
end)

RegisterCommand("set2dVoice", function()
    isUsing2dMode = not isUsing2dMode
end)

RegisterCommand("voiceRestart", function()
    TriggerEvent("voice:restartVoice")
end)

RegisterCommand("connectRoom", function(src, args)
    ConnectToRoom(tostring(args[1]), true)
end)

RegisterCommand("disconnectRoom", function(src, args)
    DisconnectFromRoom(tostring(args[1]), false)
end)

AddEventHandler('onResourceStop', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end

    for k, v in pairs(rooms) do
        if v.voicestate == "connected" then
            SendNUIMessage({ type = "quit", args = { k } })
        end
    end
end)

RegisterNetEvent("onPlayerDropped")
AddEventHandler("onPlayerDropped", function(playerServerId)
	local peerName = server .. "pl_" .. playerServerId
	if rooms.GLOBAL.players[peerName] == nil then return end

	disconnectPeerFromGlobalChannel(peerName)
end)
