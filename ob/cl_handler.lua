--
local scaleforms = {}
local currentScaleform = {}
function RegisterScaleform(stringName, data)
	scaleforms[stringName] = data
end

AddEventHandler("toggleScaleform", function(stringName, data, boolClose)
	if currentScaleform then
		if scaleforms[currentScaleform.id] and scaleforms[currentScaleform.id].OnExit then
			scaleforms[currentScaleform.id].OnExit(currentScaleform)
		end

		if currentScaleform.handle then
			SetScaleformMovieAsNoLongerNeeded(currentScaleform.handle)
		end

		currentScaleform = {}
	end

	if boolClose or not scaleforms[stringName] then return end

	local tbl = scaleforms[stringName]
	currentScaleform.handle = createScaleform(stringName, tbl.create)
	currentScaleform.id = stringName
	currentScaleform.data = data or {}

	if tbl.onOpen then
		tbl.onOpen(currentScaleform)
	end
end)

AddEventHandler("updateScaleform",  function(stringName, datas)
	if currentScaleform.id == stringName then
		for k,v in pairs(datas) do
			currentScaleform.data[k] = v
		end

		if currentScaleform.onUpdate then
			currentScaleform.onUpdate(currentScaleform)
		end
	end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)

		if currentScaleform and currentScaleform.handle and HasScaleformMovieLoaded(currentScaleform.handle) then
			local sc = scaleforms[currentScaleform.id]
			HideHudAndRadarThisFrame()
			ShowCursorThisFrame()
			if sc and sc.fullscreen then
				DrawScaleformMovieFullscreen(currentScaleform.handle, 255, 255, 255, 255)
			else
				DrawScaleformMovie(currentScaleform.handle, 0.5, 0.5, 0.9, 0.9, 255, 255, 255, 255)
			end

			if sc and sc.OnTick then
				sc.OnTick(currentScaleform)
			end
		end
	end
end)

GM = { State = { user = {} } }
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