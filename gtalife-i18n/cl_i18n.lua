local registeredLanguages = {}
local mainLanguage = "en"

local langToId = {"en", "fr", "de", "it", "es", "pt", "pl", "ru", "ko", "zh", "ja", "me"}
local selectedLanguage = langToId[GetCurrentLanguage() + 1]

function AddLanguage(name, tbl)
    local old = registeredLanguages[name] or {}
    registeredLanguages[name] = tbl

    -- Merge the language with the translations added by AddPhrase
    for k, v in pairs(old) do
        if not registeredLanguages[name][k] then
			registeredLanguages[name][k] = v
		end
    end
end

function AddPhrase(lang, name, phrase)
    registeredLanguages[lang] = registeredLanguages[lang] or {}
    registeredLanguages[lang][name] = phrase
end

function GetPreferredLanguageId()
	return selectedLanguage or mainLanguage
end
exports("GetPreferredLanguageId", GetPreferredLanguageId)

function GetPhrase(name, ...)
	if not name then return end

	local langTable = registeredLanguages[selectedLanguage] or registeredLanguages[mainLanguage]
	local arguments = {...}
	for k,v in pairs(arguments) do
		if type(v) == "string" then
			arguments[k] = GetPhrase(v)
		end
	end

	--if not langTable[name] or not registeredLanguages[mainLanguage][name] then
	--	PRINT(DSQQSDSQ)
	--end

    return (langTable[name] or registeredLanguages[mainLanguage][name]) and string.format(langTable[name] or registeredLanguages[mainLanguage][name], table.unpack(arguments)) or name or nil
end

function GetMissingPhrases(lang)
    lang = lang or selectedLanguage
    local res = {}
    local format = "%s = \"%s\","

    for k, v in pairs(registeredLanguages[mainLanguage]) do
        if not registeredLanguages[lang][k] then
			table.insert(res, string.format(format, k, v))
		end
    end

    return #res == 0 and "No language strings missing!" or table.concat(res, "\n")
end

exports("GetPhrase", GetPhrase)

local function getMissingPhrases(ply, args, cmd)
    if not args[1] then print("Please run the command with a language code e.g. darkrp_getphrases \"" .. mainLanguage .. "\"") return end
    local lang = registeredLanguages[args[1]]
    if not lang then print("This language does not exist! Make sure the casing is right.")
        print("Available languages:")
        for k in pairs(registeredLanguages) do print(k) end
        return
    end

    print(GetMissingPhrases(args[1]))
end

if IS_DEV then
	RegisterCommand("getphrases", getMissingPhrases)
end

-- Utils
function GetVehicleNameFromModel(modelHash)
	local displayName = GetDisplayNameFromVehicleModel(modelHash)
	local labelName = GetLabelText(displayName)
	if labelName ~= "NULL" then
		return labelName
	end

	if displayName ~= "CARNOTFOUND" then
		return displayName
	end

	return modelHash
end