local currentMenu
--local currentFocus
AddEventHandler("pichot:toggleRoue", function(menuData)
	if currentFocus then currentFocus = false Citizen.Wait(0) end
	SetNuiFocusForPage(true, true, {keepInput = true})
	currentMenu = menuData

	SendNUIMessage({ menu = currentMenu.menu, params = currentMenu.params })
	currentFocus = true
end)

local function onClose()
	if currentMenu and currentMenu.onExited then currentMenu.onExited() end
	currentMenu = {}
	RemoveNuiFocusForPage()
	currentFocus = false
end

RegisterNUICallback("menuOnSelected", function(t, cb)
	local menuData = currentMenu
	if not t or not t[1] or not menuData or not menuData.onSelected then onClose() return end

	local menuID, slt = table.unpack(t[1])
	Citizen.CreateThread(function() menuData.onSelected(menuID, slt, menuData and menuData.menu and menuData.menu[menuID][slt]) end)
	if t[2] then onClose() end
end)

RegisterNUICallback("menuKeyPress", function(t, cb)
	cb("ok")
end)