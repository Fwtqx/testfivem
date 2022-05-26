-- CONFIG
local IS_SERVER = IsDuplicityVersion()
GM = GM or {}
DefaultWeight = 1.0
PlyWeight = 45.0

-- END CONFIG
function tableHasValue(tbl, value, k)
	if not tbl or not value or type(tbl) ~= "table" then return end
	for _,v in pairs(tbl) do
		if k and v[k] == value or v == value then return true, _ end
	end
end

function TimeToStr( time )
	local tmp = time or 0
	local s = math.floor(tmp % 60)
	tmp = math.floor( tmp / 60 )
	local m = math.floor(tmp % 60)
	tmp = math.floor( tmp / 60 )
	local h = math.floor(tmp % 24)
	tmp = math.floor( tmp / 24 )
	local d = math.floor(tmp % 7)
	local w = math.floor( tmp / 7 )

	return string.format( "%02is %ij %02ih %02im %02is", w, d, h, m, s )
end

function GetDistanceBetweenCoords(a, b, c, d, e, f)
	local v1, v2 = type(a) == "vector3" and a or vector3(a, b, c), type(b) == "vector3" and b or type(a) == "vector3" and vector3(b, c, d) or type(d) == "vector3" and d or vector3(d, e, f)
	return math.sqrt((v2.x - v1.x) * (v2.x - v1.x) + (v2.y - v1.y) * (v2.y - v1.y) + (v2.z - v1.z) * (v2.z - v1.z))
end

function GetDistanceBetweenPlayers(playerOne, playerTwo)
	local pedOne, pedTwo = GetPlayerPed(playerOne), GetPlayerPed(playerTwo)
	return DoesEntityExist(pedOne) and DoesEntityExist(pedTwo) and GetDistanceBetweenCoords(GetEntityCoords(pedOne), GetEntityCoords(pedTwo))
end

function tableRemoveByValue(tbl, val, i)
	local ntbl = {}
	for k,v in pairs(tbl) do
		if v ~= val and (not i or v[i] ~= val) then ntbl[#ntbl + 1] = v end
	end
	return ntbl
end

function PrettyMoneyFormat(money, sep)
	local negative, sep = money < 0, sep or ","
	money = tostring(math.abs(math.floor(money)))

	local dp = string.find(money, "%.") or #money + 1
	for i = dp - 4, 1, -3 do
		money = money:sub(1, i) .. sep .. money:sub(i + 1)
	end

	return (negative and "-" or "") .. money
end

function MilliSecondsToClock(seconds)
	seconds = tonumber(seconds / 1000)

	if seconds <= 0 then
		return "00:00.00"
	else
		local mins = string.format("%02.f", math.floor(seconds / 60))
		local secs = string.format("%02.f", math.floor(seconds - mins * 60))
		local milli = string.format("%02.f", math.floor((seconds * 1000 - mins * 60000 - secs * 1000) / 10))
		return string.format("%s:%s.%s", mins, secs, milli)
	end
end

function compare(a,b)
	a, b = a.name or a[1], b.name or b[1]
	return tostring(a) < tostring(b)
end

function stringsplit(inputstr, sep)
	if not inputstr then return end
	if sep == nil then
		sep = "%s"
	end

	local t = {}
	local i = 1

	for str in string.gmatch(inputstr, "([^" .. sep .. "]+)") do
		t[i] = str
		i = i + 1
	end
	return t
end

function tableCount(tbl, checkCount)
	if not tbl or type(tbl) ~= "table" then return not checkCount and 0 end
	local n = 0
	for k,v in pairs(tbl) do
		n = n + 1
		if checkCount and n >= checkCount then return true end
	end
	return not checkCount and n
end

function firstToUpper(str)
	str = string.lower(tostring(str))
	return str:gsub("^%l", string.upper)
end

function updateVar(varName, varValue, surValue)
	return exports["pichot_datahandler"]:updateVar(varName, varValue, surValue)
end

function getVar(varName)
	return exports["pichot_datahandler"]:getVar(varName)
end

function updateInVar(varName, tbl)
	return exports["pichot_datahandler"]:updateInVar(varName, tbl)
end

function GetUserID(identifier)
	local userID
	if IsDuplicityVersion() then
		userID = GM.State.Whitelist and GM.State.Whitelist[identifier] and GM.State.Whitelist[identifier].id
	else
		userID = GM.State.UUID
	end

	return userID
end

function round(num, numDecimalPlaces)
	if numDecimalPlaces and numDecimalPlaces > 0 then
		local mult = 10 ^ numDecimalPlaces
		return math.floor(num * mult + 0.5) / mult
	end
	return math.floor(num + 0.5)
end

function Deepcopy(orig)
	local orig_type, copy = type(orig)
	if orig_type == "table" then
		copy = {}
		for orig_key, orig_value in next, orig, nil do
			copy[Deepcopy(orig_key)] = Deepcopy(orig_value)
		end
		setmetatable(copy, Deepcopy(getmetatable(orig)))
	else -- number, string, boolean, etc
		copy = orig
	end
	return copy
end

function GetItemPer(itemData, customTime)
	local time = customTime or IS_SERVER and os.time() or GetCloudTimeAsInt()
	return itemData and itemData.per and math.ceil((itemData.per - time) / 86400)
end

function table.GetKeys( tab, safeKeys )
	local keys = {}
	local id = 1

	for k, v in pairs( tab ) do
		keys[ id ] = safeKeys and SQLStr(k) or k
		id = id + 1
	end
	return keys
end

function PrintTable( t, indent, done )
	if t == nil then return Citizen.Trace("nil\n") end
	if (type(t) ~= "table") then return Citizen.Trace(t..'\n') end
	done = done or {}
	indent = indent or 0
	local keys = table.GetKeys( t )

	table.sort( keys, function( a, b )
		if ( type( a ) == "number" and type( b ) == "number" ) then return a < b end
		return tostring( a ) < tostring( b )
	end )

	done[ t ] = true

	for i = 1, #keys do
		local key = keys[ i ]
		local value = t[ key ]
		Citizen.Trace( "^4" .. string.rep( "\t", indent ) .. "^0" )

		if  ( type( value ) == "table" and not done[ value ] ) then
			done[ value ] = true
			Citizen.Trace( tostring( key ) .. ":" .. "\n" )
			PrintTable ( value, indent + 2, done )
			done[ value ] = nil
		else
			Citizen.Trace( "^4" .. tostring( key ) .. "\t=\t" .. tostring( value ) .. "\n^0" )
		end
	end
end

function ChatNotif(a, b, c, color)
	if IS_SERVER then
		TriggerClientEvent("chatMessage", a, c or "GTALife", c or {18, 197, 101}, b or "Position saved to file.")
	else
		TriggerEvent("chatMessage", b or "GTALife", c or {18, 197, 101}, a or "Position saved to file.")
	end
end

function GetPlayerIdentifierFromType(identifierType, source)
	local identifiers = type(source) == "table" and source or GetPlayerIdentifiers(source)

	for b = 1, #identifiers do
		if string.find(identifiers[b], identifierType, 1) then
			return stringsplit(identifiers[b], ":")[2]
		end
	end

	return nil
end

function GetPlayerIdentifiersWithType(identifiers)
	local ids = {}

	for _,v in pairs(identifiers) do
		local ab = stringsplit(v, ":")
		ids[ab[1]] = ab[2]
	end

	return ids
end

function ToBool(value)
	if value == nil then return false end
	local t = type(value)
	local result = false
	if t == "number" then
		result = value >= 1 and true or false
	elseif t == "string" then
		value = value:lower()
		result = (value == "true" or value == "1") and true or false
	end
	return result
end

local randomKeep = 0
function Random(x, y)
    randomKeep = randomKeep + 1
    if x ~= nil and y ~= nil then
        return math.floor(x +(math.random(math.randomseed(os.time()+randomKeep))*999999 %y))
    else
        return math.floor((math.random(math.randomseed(os.time()+randomKeep))*100))
    end
end
