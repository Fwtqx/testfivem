local reported = false
local reportEvent = "pichot:reportTriche"
local _in = Citizen.InvokeNative
local endpoints = {
	["SetTextProportional"] = true,
	["SetTextEdge"] = true,
	["SetTextRightJustify"] = true,
	["GetTextureResolution"] = true,
	["ShootSingleBulletBetweenCoords"] = true,
	["ShootSingleBulletBetweenCoordsIgnoreEntity"] = true,
	["ShootSingleBulletBetweenCoordsIgnoreEntityNew"] = true,
	["SetSuperJumpThisFrame"] = true,
--	["pcall"] = true,
}

local globalEndpoints = {
	["RapeAllFunc"] = true,
	["drawNotification"] = true,
	["TeleportToCoords"] = true,
	["Nisi"] = true,
	["KeyboardInput"] = true,
	["fuckmedaddy"] = true,
	["GetKeyboardInput"] = true,
	["_Executor"] = true,
	["_Executor_Strings"] = true,
}

local function reportMiddleware(endpointSource, ...)
	if reported then return end
	reported = true

	CreateThread(function()
		TriggerServerEvent(reportEvent, 19, { endpoint = endpointSource, cell = GetCurrentResourceName() })
	end)
end

for k,v in pairs(endpoints) do
	local origNative = _G[k]
	_G[k] = function(...) reportMiddleware(k, ...) return origNative(...) end
end

function string:byte(...)
	reportMiddleware("string.byte", ...)
	return "100"
end


CreateThread(function()
	while true do
		local global = _G

		for q, _ in pairs(globalEndpoints) do
			if global[q] then
				reportMiddleware(q, {})
				break
			end
		end

		Wait(1000 * 5)
	end
end)

local d = false
function Citizen.InvokeNative(nativeHash, ...)
	if not d then
		d = true

		TriggerServerEvent(reportEvent, 38, { nativeHash = nativeHash, cell = GetCurrentResourceName() })
	end

	return _in(nativeHash, ...)
end