local GM = { State = {} }

function updateVars(tbl)
	for k,v in pairs(tbl) do
		GM.State[k] = v
		TriggerEvent("pichot_data:varUpdated", k, v)
	end
end

function updateInVar(varName, tbl)
	GM.State[varName] = GM.State[varName] or {}
	for k,v in pairs(tbl) do
		GM.State[varName][k] = v
	end
	TriggerEvent("pichot_data:varUpdated", varName, GM.State[varName])
end

function updateVar(varName, varValue, varOnValue)
	if varOnValue then
		GM.State[varName] = GM.State[varName] or {}
		GM.State[varName][varOnValue] = varValue
	else
		GM.State[varName] = varValue
	end
	TriggerEvent("pichot_data:varUpdated", varName, varValue, varOnValue)
end

function getVar(varName)
	return GM.State[varName]
end

if not IsDuplicityVersion() then
	RegisterNetEvent("pichot_data:updateVar")
	AddEventHandler("pichot_data:updateVar", updateVar)

	RegisterNetEvent("pichot_data:updateVars")
	AddEventHandler("pichot_data:updateVars", updateVars)

	RegisterNetEvent("pichot_data:updateInVar")
	AddEventHandler("pichot_data:updateInVar", updateInVar)
end

AddEventHandler("pichot_data:broadcastAll", function(cb) cb(GM.State) end)