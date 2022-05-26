local radio_debug = false

local debugMode = not IsDuplicityVersion() or true
local resourceName = GetCurrentResourceName()
function debugMessage(message)
    if not debugMode then return end
    print(("^2[%s] ^3%s^7"):format(resourceName, message))
end

local function drawDebugText(x,y,z,size,scale,align,r,g,b,a,text)
    SetTextFont(4)
    SetTextProportional(1)
    SetTextCentre(align)
    SetTextScale(size, scale)
    SetTextColour(r, g, b, a)
    SetTextDropShadow(0, 0, 0, 0, 255)
    SetTextEdge(2, 0, 0, 0, 255)
    SetTextDropShadow()
    SetTextOutline()
    SetTextEntry("STRING")
    AddTextComponentString(text)

    if z ~= nil then
        SetDrawOrigin(x, y, z, 0)
        DrawText(0.0, 0.0)
        ClearDrawOrigin()
    else
        DrawText(x, y)
    end
end

Citizen.CreateThread(function()
    local server = ServerId

    while true do
        if IsDebugEnabled() then
            local takers = 0
            local peercount = 0
            local roomcount = 0

            local rooms = GetVoiceRooms()
            local room = rooms.GLOBAL

            if room then
                for _,v in pairs(room.harks) do
                    takers = (v > 0.0) and takers + 1 or takers
                end

                for _ in pairs(room.peers) do peercount = peercount + 1 end
                for _ in pairs(room.players) do roomcount = roomcount + 1 end

                local serverState = (room.voicestate == "connected") and "~g~Connected" or (room.voicestate == "connecting") and "~y~Connecting" or "~r~Loading"
                local ptt = (room.pushtotalk) and "~g~true" or "~r~false"
                local autogain = (usb) and "~g~true" or "~r~false"
                local connects = "~b~".. peercount .." ~w~("..roomcount..")"
                drawDebugText(0.01, 0.4, nil, 1.0, 0.6, 0, 255, 255, 255, 200, "Server: "..serverState.."~w~~n~Pushed: "..ptt.."~w~ ("..room.myvolume..")~n~AutoGain: ".. autogain)

                local coords = GetEntityCoords(PlayerPedId())

                local i = 0
                for k,v in pairs(room.peers) do
                    local color = '~w~'..tostring(v).." "
                    drawDebugText(0.8, 0.3+(i*0.03), nil, 1.0, 0.6, 0, 255, 255, 255, 200, color..k..' pe')
                    i = i + 1
                end

                local i = 0
                for k,v in pairs(room.players) do
                    local color = '~w~'..tostring(v).." "
                    drawDebugText(0.5, 0.3+(i*0.03), nil, 1.0, 0.6, 0, 255, 255, 255, 200, color..k..' pl')
                    i = i + 1
                end

                for k,i in pairs(GetActivePlayers()) do
                    local name = server.."pl_".. GetPlayerServerId(i)

                    if NetworkIsPlayerActive(i) and PlayerId() ~= i and IsEntityVisible(GetPlayerPed(i)) then
                        local x,y,z = table.unpack(GetEntityCoords(GetPlayerPed(i)))

                        if GetDistanceBetweenCoords(coords, x, y, z, true) <= 10.0 and HasEntityClearLosToEntity(PlayerPedId(), GetPlayerPed(i), 17) == 1 and IsEntityVisible(GetPlayerPed(i)) then
                            local status = (room.peers[name] == nil) and "~r~"..GetPlayerName(i) or (room.peers[name] == false or room.players[name] == false) and "~y~"..GetPlayerName(i) or (room.peers[name] == true) and "~g~"..GetPlayerName(i) or "~r~"..GetPlayerName(i).." (!)"
                            local hark = (room.harks[name] ~= nil) and string.format("%.2f", room.harks[name]) or "disabled"
                            local volume = (room.cached[name] ~= nil) and string.format("%.2f", room.cached[name].volume) or "unknown"
                            local balance = (room.cached[name] ~= nil) and string.format("%.2f", room.cached[name].balance) or "unknown"
                            local peersDebug = tostring(room.peers[name]) or 'null'
                            local playersDebug = tostring(room.players[name]) or 'null'
                            -- drawDebugText(x, y, z, 0.0, 0.4, 1, 255, 255, 255, 255, status .. "~w~~n~HK: ~b~" .. hark .. "~n~~w~VL: ~b~".. volume .."~n~~w~BL: ~b~" .. balance .."~n~~w~PR: ~b~" .. peersDebug .."~n~~w~PL: ~b~" .. playersDebug)
                            drawDebugText(x, y, z, 0.0, 0.4, 1, 255, 255, 255, 255, status .. "~w~~n~VL: ~b~".. volume .."~n~~w~BL: ~b~" .. balance .."~n~~w~PR: ~b~" .. peersDebug .."~n~~w~PL: ~b~" .. playersDebug)
                        end
                    end
                end
            end
        end

        if radio_debug then
            local takers = 0
            local peercount = 0
            local roomcount = 0

            local rooms = GetVoiceRooms()
            local room = rooms['RADIO']

            if room then

                for _,v in pairs(room.harks) do
                    takers = (v > 0.0) and takers + 1 or takers
                end

                for _ in pairs(room.peers) do peercount = peercount + 1 end
                for _ in pairs(room.players) do roomcount = roomcount + 1 end

                local serverState = (room.voicestate == "connected") and "~g~Connected" or (room.voicestate == "connecting") and "~y~Connecting" or "~r~Loading"
                local ptt = (room.pushtotalk) and "~g~true" or "~r~false"
                local autogain = (usb) and "~g~true" or "~r~false"
                local connects = "~b~".. peercount .." ~w~("..roomcount..")"
                drawDebugText(0.01, 0.4, nil, 1.0, 0.6, 0, 255, 255, 255, 200, "Server: "..serverState.."~w~~n~Pushed: "..ptt.."~w~ ("..room.myvolume..")~n~AutoGain: ".. autogain)

                local coords = GetEntityCoords(PlayerPedId())

                local i = 0
                for k,v in pairs(room.peers) do
                    local color = '~w~'..tostring(v).." "
                    drawDebugText(0.8, 0.3+(i*0.03), nil, 1.0, 0.6, 0, 255, 255, 255, 200, color..k..' pe')
                    i = i + 1
                end

                local i = 0
                for k,v in pairs(room.players) do
                    local color = '~w~'..tostring(v).." "
                    drawDebugText(0.5, 0.3+(i*0.03), nil, 1.0, 0.6, 0, 255, 255, 255, 200, color..k..' pl')
                    i = i + 1
                end

                local playerId = PlayerId()
                for k,i in pairs(GetActivePlayers()) do
                    local name = server.."pl_".. GetPlayerServerId(i)

                    if playerId ~= i and IsEntityVisible(GetPlayerPed(i)) then
                        local x,y,z = table.unpack(GetEntityCoords(GetPlayerPed(i)))

                        if GetDistanceBetweenCoords(coords, x, y, z, true) <= 10.0 and HasEntityClearLosToEntity(PlayerPedId(), GetPlayerPed(i), 17) == 1 and IsEntityVisible(GetPlayerPed(i)) then
                            local status = (room.peers[name] == nil) and "~r~"..GetPlayerName(i) or (room.peers[name] == false or room.players[name] == false) and "~y~"..GetPlayerName(i) or (room.peers[name] == true) and "~g~"..GetPlayerName(i) or "~r~"..GetPlayerName(i).." (!)"
                            local hark = (room.harks[name] ~= nil) and string.format("%.2f", room.harks[name]) or "disabled"
                            local volume = (room.cached[name] ~= nil) and string.format("%.2f", room.cached[name].volume) or "unknown"
                            local balance = (room.cached[name] ~= nil) and string.format("%.2f", room.cached[name].balance) or "unknown"
                            local peersDebug = tostring(room.peers[name]) or 'null'
                            local playersDebug = tostring(room.players[name]) or 'null'
                            -- drawDebugText(x, y, z, 0.0, 0.4, 1, 255, 255, 255, 255, status .. "~w~~n~HK: ~b~" .. hark .. "~n~~w~VL: ~b~".. volume .."~n~~w~BL: ~b~" .. balance .."~n~~w~PR: ~b~" .. peersDebug .."~n~~w~PL: ~b~" .. playersDebug)
                            drawDebugText(x, y, z, 0.0, 0.4, 1, 255, 255, 255, 255, status .. "~w~~n~VL: ~b~".. volume .."~n~~w~BL: ~b~" .. balance .."~n~~w~PR: ~b~" .. peersDebug .."~n~~w~PL: ~b~" .. playersDebug)
                        end
                    end
                end
            end
        end

		Wait((debug or radio_debug) and 0 or 2000)
    end
end)

RegisterCommand("radio_debug", function()
    radio_debug = not radio_debug
    print("[pVoice3] Voice debug mode: ".. tostring(radio_debug))
end)