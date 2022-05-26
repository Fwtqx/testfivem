AddEventHandler("startVideo", function()
    SendNUIMessage({ showVideo = true })
end)

RegisterCommand("stopVideo", function()
    SendNUIMessage({ stopVideo = true })
end)