--
GM = {}
GM.State = {}
GM.State.NUI_Init = false
GM.State.darknetOpen = false
-- 127001 Veryleaks
local entryCallback
local focusEnabled = false
local isLite = GetConvarInt("sv_gtalite", 0) == 1 and true or false

local function setNuiFocus2(a, b)
	focusEnabled = a
	if a or b then
		SetNuiFocusForPage(a, b, {disableMovements = a, disableFiring = a})
	else
		RemoveNuiFocusForPage()
	end
end

RegisterNetEvent("pichot:toggleNUI")
AddEventHandler("pichot:toggleNUI", function(data, focus, focus2, cb)
	SendNUIMessage(data)
	if focus ~= nil or focus2 ~= nil then
		setNuiFocus2(focus, focus2)
	end

	if cb then entryCallback = cb end

	local ped = GetPlayerPed(-1)
	if focus == true and not IsPedStill(ped) then ForcePedMotionState(ped, "motionstate_idle") end
end)

RegisterNUICallback("closeInternet", function(cb)
	if focusEnabled then setNuiFocus2(false, false) end
	PlaySoundFrontend(-1, "PIN_BUTTON", "ATM_SOUNDS", 0)

	if GM.State.darknetOpen then
		updateVar("darknetOpen", false)
	end
end)

RegisterNUICallback("validateTaxes", function(data)
	TriggerServerEvent("pichot:payTaxes", 1, data)
end)

RegisterNUICallback("radioAct", function(data, cb)
	if not data or not data.id then return end
	if data.id == 4 and focusEnabled then setNuiFocus2(false, false) end
	TriggerEvent("pichot_voip:clientRadio", data)
	cb("ok")
end)

RegisterNUICallback("darknetAct", function(t, cb)
	local id, data = t.id, t.data
	TriggerEvent("pichot:darknetAct", id, data, function()
		if focusEnabled then setNuiFocus2(false, false) end
		updateVar("darknetOpen", false)
	end)
	cb("ok")
end)

RegisterNUICallback("saveNotes", function(t, cb)
	if focusEnabled then setNuiFocus2(false, false) end

	if t and t.text then
		TriggerServerEvent("pichot:getInfo", 6, t)
	end

	ClearPedTasks(GetPlayerPed(-1))
	if cb then cb("ok") end
end)

RegisterNUICallback("onEntry", function(t, cb)
	local id, inputs = t.id, t.inputs
	if id == 1 then
		if not entryCallback then return end
		entryCallback(inputs)
	end
	if focusEnabled then setNuiFocus2() end
	cb("ok")
end)

TriggerEvent("pichot_data:broadcastAll", function(a)
	for k,v in pairs(GM.State) do
		if a[k] ~= nil then GM.State[k] = a[k] end
	end
end)

AddEventHandler("pichot_data:varUpdated", function(varName, varValue, varOnValue)
	if GM.State[varName] == nil then return end

	if varOnValue then
		GM.State[varName] = GM.State[varName] or {}
		GM.State[varName][varOnValue] = varValue
	else
		GM.State[varName] = varValue
	end
end)

AddEventHandler("pichot:toggleWeb", function(boolToggle, data)
	setNuiFocus2(boolToggle, boolToggle)
	SendNUIMessage({
		showInternet = boolToggle,
		URL = data[1],
		webID = data[2],
		lite = isLite
	})-- 127001 Veryleaks
end)-- 127001 Veryleaks

AddEventHandler("onResourceStart", function(r)
	if r ~= GetCurrentResourceName() then return end
	updateVar("NUI_Init", false)
end)

RegisterCommand("unfocus", function()
	setNuiFocus2(false, false)
end)