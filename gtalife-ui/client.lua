--
print(GetCurrentResourceName())

local isVisible = false

local function toggleVisibility(visible, newPath)
	isVisible = visible

	SetNuiFocus(visible, visible)
	SetKeepInputMode(visible)
	SendNUIMessage({ type = "SET_REDIRECTION_REQUESTED", module = "none", payload = { route = visible and newPath or '/' } })

	if isVisible then
		CreateThread(function()
			while isVisible do
				Wait(200)

				SetNuiFocus(isVisible, isVisible)
				SetKeepInputMode(isVisible)
			end
		end)
	end
end

RegisterNUICallback("pollResult", function(data, cb)
	local answers = data.data
	if answers then
		toggleVisibility(false)
		local luaAnswers = {}
		for k,v in pairs(answers) do luaAnswers[k] = v + 1 end
		TriggerServerEvent("pichot:pollResult", luaAnswers)
	end
	cb("ok")
end)

RegisterNetEvent("pichot:createPoll")
AddEventHandler("pichot:createPoll", function(poll)
	for _,v in pairs(poll.questions) do
		if v.title then
			v.title = GetPhrase(v.title)
		end

		if v.answers then
			for k, answer in pairs(v.answers) do
				v.answers[k] = GetPhrase(answer)
			end
		end
	end

	SendNUIMessage({ type = "SET_POLL_DATA", module = "none", payload = poll })
	toggleVisibility(true, '/poll')
end)

local i18n = exports["gtalife-i18n"]
GetPhrase = function(...)
	return i18n:GetPhrase(...)
end