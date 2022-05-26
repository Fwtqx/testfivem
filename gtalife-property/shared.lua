local isServer = IsDuplicityVersion()
local zoneRadius = 256
local zoneByGrids = {}
local allProperties

function LoadPropertiesFromFile()
	local properties = LoadResourceFile("pichot_datahandler", "properties.json")
	allProperties = properties and json.decode(properties) or {}
end

local function getGridZoneId(posX, posY)
	return 100 + math.ceil((posX + posY) / (zoneRadius * 2))
end

function GetAllProperties()
	return allProperties or {}
end

if isServer then
	function UpdatePropertyFile()
		allProperties = allProperties or {}
		SaveResourceFile("pichot_datahandler", "properties.json", json.encode(allProperties))
	end
else
	function RegisterNewProperty(propertyID, tblProperty)
		allProperties[propertyID] = tblProperty or {}

		local gridId = getGridZoneId(tblProperty.inc.x, tblProperty.inc.y)
		if not zoneByGrids[gridId] then
			zoneByGrids[gridId] = {}
		end

		-- Pointer to the property
		zoneByGrids[gridId][propertyID] = true
	end
	exports("RegisterNewProperty", RegisterNewProperty)
	exports("GetAllProperties", GetAllProperties)
end

function GetPropertyById(id)
	return allProperties[id]
end

function GetPropertyList(boolGrid)
	if not allProperties then
		LoadPropertiesFromFile()

		if not isServer then
			for k,v in pairs(allProperties) do
				if v.inc.x and v.inc.y then
					local gridId = getGridZoneId(v.inc.x, v.inc.y)
					if not zoneByGrids[gridId] then
						zoneByGrids[gridId] = {}
					end

					-- Pointer to the property
					zoneByGrids[gridId][k] = true
				end
			end
		end
	end

	if boolGrid then
		local plPos = GetEntityCoords(PlayerPedId())
		local myGrid = getGridZoneId(plPos.x, plPos.y)

		local tblProperties = {}
		for propertyId, _ in pairs(zoneByGrids[myGrid] or {}) do
			local tblProperty = allProperties[propertyId]
			if not tblProperty.county or tblProperty.county ~= "LC" then
				tblProperties[propertyId] = { position = tblProperty.inc, isGarage = tblProperty.isGarage }
			end
		end

		return tblProperties
	else
		return allProperties
	end
end

if not isServer then
	exports("GetPropertyList", GetPropertyList)
	exports("GetPropertyById", GetPropertyById)
end