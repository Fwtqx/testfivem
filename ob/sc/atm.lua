local currentMenu = 0
local gaps = {10, 50, 100, [5] = 1000, [6] = 10000}
local currantGaps = {}

local function ShowFrameAccount(scaleform, boolDeposit)
	scaleform.actions = {}
	SetScaleformParams(scaleform.handle, {
		{ name = "SET_DATA_SLOT_EMPTY", param = {} },
		{ name = "SET_DATA_SLOT", param = {0, boolDeposit and "Déposer" or "Retirer"} },
	})

	local maxAmount, params = (boolDeposit and GM.State.user["money"] or scaleform.data.balance) or 0, {}
	currantGaps = {}

	for k,v in pairs(gaps) do
		if v < maxAmount then
			params[k] = { name = "SET_DATA_SLOT", param = {k, v} }
			currantGaps[k] = v
		end
	end

	params[4] = { name = "SET_DATA_SLOT", param = {4, "Retour"} }

	local bankIndex = #params + 1
	params[bankIndex] = { name = "SET_DATA_SLOT", param = { bankIndex, maxAmount} }
	currantGaps[bankIndex] = maxAmount

	params[8] = { name = "SET_DATA_SLOT", param = {8, "Autre"}}

	params[#params + 1] = { name = "DISPLAY_CASH_OPTIONS", param = {} }

	SetScaleformParams(scaleform.handle, params)

	currentMenu = boolDeposit and 2 or 1
end

local function ShowValidFrame(scaleform, question)
	SetScaleformParams(scaleform.handle, {
		{ name = "SET_DATA_SLOT_EMPTY", param = {} },
		{ name = "SET_DATA_SLOT", param = {0, question or "Voulez-vous vraiment ?"} },
		{ name = "SET_DATA_SLOT", param = {1, validate or "Valider"} },
		{ name = "SET_DATA_SLOT", param = {2, cancel or "Annuler"} },
		{ name = "DISPLAY_MESSAGE", param = {} },
	})

	currentMenu = 5
end

local function ShowHistorique(scaleform)
	SetScaleformParams(scaleform.handle, {
		{ name = "SET_DATA_SLOT_EMPTY", param = {} },
		{ name = "SET_DATA_SLOT", param = {0, "Historique"} },
		{ name = "SET_DATA_SLOT", param = {1, "Retour"} },
	})

	local logs = scaleform.data and scaleform.data.history or {}
	for i = #logs, 1, -1 do
		local v = logs[i]
		PushScaleformMovieFunction(scaleform.handle, "SET_DATA_SLOT")
		PushScaleformMovieFunctionParameterInt(1 + i)
		PushScaleformMovieFunctionParameterInt(v.amount <= 0 and 0 or 1) -- retrait ou virement BL
		PushScaleformMovieFunctionParameterString(v.amount) -- montant
		PushScaleformMovieFunctionParameterString(v.label:format(v.receiver)) -- texte
		PopScaleformMovieFunctionVoid()
	end

	PushScaleformMovieFunction(scaleform.handle, "DISPLAY_TRANSACTIONS")
	PopScaleformMovieFunctionVoid()

	currentMenu = 3
end

local function ATMBack(scaleform)
	PlaySoundFrontend(-1, "PIN_BUTTON", "ATM_SOUNDS", true)
	if currentMenu == 0 then TriggerEvent("toggleScaleform", scaleform.id, false, true) return end

	SetScaleformParams(scaleform.handle, {
		{ name = "SET_DATA_SLOT_EMPTY", param = {} },
		{ name = "SET_DATA_SLOT", param = {0, "Actions"} },
		{ name = "SET_DATA_SLOT", param = {1, "Déposer"} },
		{ name = "SET_DATA_SLOT", param = {2, "Retirer"} },
		{ name = "SET_DATA_SLOT", param = {3, "Historique"} },
		{ name = "SET_DATA_SLOT", param = {4, "Retour"} },
		{ name = "DISPLAY_MENU", param = {} },
	})

	currentMenu = 0
end

local function HandleATMControls(scaleform)
	EnableControlAction(2, 199, 1)
	EnableControlAction(2, 188, 1)
	EnableControlAction(2, 187, 1)
	EnableControlAction(2, 189, 1)
	EnableControlAction(2, 190, 1)

	if IsControlJustPressed(2, 188) then
		PushScaleformMovieFunction(scaleform.handle, "SET_INPUT_EVENT")
		PushScaleformMovieFunctionParameterInt(8)
		PopScaleformMovieFunctionVoid()
	end
	if IsControlJustPressed(2, 187) then
		PushScaleformMovieFunction(scaleform.handle, "SET_INPUT_EVENT")
		PushScaleformMovieFunctionParameterInt(9)
		PopScaleformMovieFunctionVoid()
	end
	if IsControlJustPressed(2, 189) then
		PushScaleformMovieFunction(scaleform.handle, "SET_INPUT_EVENT")
		PushScaleformMovieFunctionParameterInt(10)
		PopScaleformMovieFunctionVoid()
	end
	if IsControlJustPressed(2, 190) then
		PushScaleformMovieFunction(scaleform.handle, "SET_INPUT_EVENT")
		PushScaleformMovieFunctionParameterInt(11)
		PopScaleformMovieFunctionVoid()
	end

	EnableControlAction(2, 239, 1)
	EnableControlAction(2, 240, 1)

	local x, y = GetDisabledControlNormal(2, 239), GetDisabledControlNormal(2, 240)
	PushScaleformMovieFunction(scaleform.handle, "SET_MOUSE_INPUT")
	PushScaleformMovieFunctionParameterFloat(x)
	PushScaleformMovieFunctionParameterFloat(y)
	PopScaleformMovieFunctionVoid()

	DisableAllControlActions(0)
	DisableControlAction(2, 200, 1)

	EnableControlAction(2, 237, 1)
	EnableControlAction(2, 202, 1)
	EnableControlAction(2, 238, 1)

	if IsControlJustPressed(2, 237) then
		Citizen.CreateThread(function()
			PushScaleformMovieFunction(scaleform.handle, "GET_CURRENT_SELECTION")
			local a = EndScaleformMovieMethodReturn()
			while not GetScaleformMovieFunctionReturnBool(a) do
				Citizen.Wait(0)
			end

			local result = GetScaleformMovieFunctionReturnInt(a)
			if currentMenu == 0 then
				if result == 1 then -- depot
					ShowFrameAccount(scaleform, true)
				elseif result == 2 then -- retrait
					ShowFrameAccount(scaleform)
				elseif result == 3 then
					ShowHistorique(scaleform)
				elseif result == 4 then
					ATMBack(scaleform)
				end
			elseif currentMenu == 2 or currentMenu == 1 then -- retrait
				if result == 8 then
					AskEntry(function(amount)
						amount = tonumber(amount)
						if amount and amount > 0 then TriggerServerEvent("pichot:bank:atmEvent", scaleform.data.ownerType, scaleform.data.id, currentMenu, amount) end
					end)
				elseif result ~= 4 then
					local amount = currantGaps[result] or (currentMenu == 2 and GM.user["money"] or scaleform.data.balance) or 0
					if amount and amount > 0 then TriggerServerEvent("pichot:bank:atmEvent", scaleform.data.ownerType, scaleform.data.id, currentMenu, amount) end
				end
				
				ATMBack(scaleform)
			elseif currentMenu == 3 then -- historique
				if result == 1 then
					ATMBack(scaleform)
				end
			end
		end)
	end

	if IsControlJustPressed(2, 202) or IsControlJustPressed(2, 238) then
		ATMBack(scaleform)
	end

	if not scaleform.a or scaleform.a <= GetGameTimer() then
		scaleform.a = GetGameTimer() + 1000
		SetScaleformParams(scaleform.handle, {
			{ name = "DISPLAY_BALANCE", param = { scaleform.data.identity, "Banque", scaleform.data.balance } }
		})
	end
end

RegisterScaleform("ATM", {
	create =  {
		{ name = "SET_DATA_SLOT_EMPTY", param = {} },
		{ name = "SET_DATA_SLOT", param = {0, "Actions"} },
		{ name = "SET_DATA_SLOT", param = {1, "Déposer"} },
		{ name = "SET_DATA_SLOT", param = {2, "Retirer"} },
		{ name = "SET_DATA_SLOT", param = {3, "Historique"} },
		{ name = "SET_DATA_SLOT", param = {4, "Retour"} },
		{ name = "DISPLAY_MENU", param = {} },
		{ name = "DISPLAY_BALANCE", param = {"Compte personnel", "Banque", "0"} },
	},
	onOpen = function(scaleform)
		currentMenu = 0
		SetScaleformParams(scaleform.handle, { { name = "DISPLAY_BALANCE", param = { scaleform.data.identity, "Banque", scaleform.data.balance } } })
	end,
	onDatasUpdate = function(scaleform)
		print(scaleform.data.balance)
		SetScaleformParams(scaleform.handle, { { name = "DISPLAY_BALANCE", param = { scaleform.data.identity, "Banque", scaleform.data.balance } } })
	end,
	OnTick = HandleATMControls
})