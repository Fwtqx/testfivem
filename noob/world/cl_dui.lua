--
local duiObj
local txd

local runtimeTxd = "meows"
local currentScreen = {}
local interiorScreens = {
	{ propName = "hei_heist_str_avunitl_03", propPos = vec3(-781.93, 340.81, 211.197), target = "tvscreen" },
	{ propName = "hei_heist_str_avunitl_03", propPos = vec3(-21.85, -578.68, 78.23), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-40.24, -571.04, 88.93), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-5.11, -585.55, 99.05), target = "tvscreen" },
	{ propName = "prop_tv_flat_02", propPos = vec3(986.53, -95.11, 75.48), target = "tvscreen" },
	{ propName = "prop_tv_flat_michael", propPos = vec3(1120.17, -3144.56, -35.86), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-802.07, 343.2, 158.82), target = "tvscreen" },
	{ propName = "apa_mp_h_str_avunitm_01", propPos = vec3(-781.41, 338.47, 186.11), target = "tvscreen" },
	{ propName = "apa_mp_h_str_avunitm_03", propPos = vec3(-780.6, 319.28, 194.89), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-801.6, 342.81, 206.44), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-754.51, 314.45, 222.07), target = "tvscreen" },
	{ propName = "prop_tv_03", propPos = vec3(-9.01, -1441.68, 31.28), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(3.89, 530.31, 175.67), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-893.23, -376.56, 84.3), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-936.88, -374.77, 108.26), target = "tvscreen" },
	{ propName = "hei_heist_str_avunitl_03", propPos = vec3(-907.03, -383.23, 112.47), target = "tvscreen" },
	{ propName = "prop_tv_flat_02", propPos = vec3(-1161.55, -1520.14, 10.47), target = "tvscreen" },
	{ propName = "des_tvsmash_start", propPos = vec3(-810.59, 170.46, 77.25), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-892.74, -423.08, 94.28), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-920.44, -438.59, 120.42), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-877.98, -451.21, 125.35), target = "tvscreen" },

	{ propName = "ex_prop_ex_tv_flat_01", propPos = vec3(-1567.5, -579.75, 108.94), target = "ex_tvscreen" },
	{ propName = "ex_prop_ex_tv_flat_01", propPos = vec3(-138.44, -639.81, 169.24), target = "ex_tvscreen" },
	{ propName = "ex_prop_ex_tv_flat_01", propPos = vec3(-1373.87, -476.79, 72.46), target = "ex_tvscreen" },
	{ propName = "ex_prop_ex_tv_flat_01", propPos = vec3(-70.19, -809.12, 243.8), target = "ex_tvscreen" },

	{ propName = "prop_tv_03", propPos = vec3(256.73, -995.45, -98.86), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(337.28, -996.67, -99.03), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-1479.18, -531.98, 55.74), target = "tvscreen" },
	{ propName = "hei_heist_str_avunitl_03", propPos = vec3(-1469.46, -548.59, 72.24), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-479.78, -716.99, 52.22), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-455.88, -681.25, 75.9), target = "tvscreen" },
	{ propName = "prop_tv_flat_01", propPos = vec3(-623.85, 67.78, 106.84), target = "tvscreen" },
	{ propName = "hei_heist_str_avunitl_03", propPos = vec3(-606.34, 40.26, 96.4), target = "tvscreen" },

	{ propName = "prop_trev_tv_01", propPos = vec3(1979.02, 3819.52, 34.09), target = "tvscreen" },

	{ propName = "apa_mp_h_str_avunits_01", propPos = vec3(-568.26, 642.93, 144.44), target = "tvscreen" },
	{ propName = "apa_mp_h_str_avunits_04", propPos = vec3(-161.65, 482.89, 136.24), target = "tvscreen" },
	{ propName = "apa_mp_h_str_avunits_01", propPos = vec3(-1281.54, 432.18, 96.5), target = "tvscreen" },
	{ propName = "apa_mp_h_str_avunits_01", propPos = vec3(377.45, 404.73, 144.51), target = "tvscreen" },

	{ propName = "apa_mp_h_str_avunits_04", propPos = vec3(331.14, 421.66, 147.97), target = "tvscreen" },
	{ propName = "apa_mp_h_str_avunits_01", propPos = vec3(127.29, 543.4, 182.91), target = "tvscreen" },
	{ propName = "apa_mp_h_str_avunits_01", propPos = vec3(-850.26, 674.47, 151.46), target = "tvscreen" },
	{ propName = "apa_mp_h_str_avunits_04", propPos = vec3(-771.4, 604.59, 142.73), target = "tvscreen" },
	{ propName = "apa_mp_h_str_avunits_04", propPos = vec3(-664.09, 585.9, 143.97), target = "tvscreen" },
	-- Studio musique
	{ propName = "hei_heist_str_avunitl_03", propPos = vec3(7.1, 10.3, 33.34), target = "tvscreen" },
	-- 
	{ propName = "hei_heist_str_avunitl_03", propPos = vec3(-15.520, -1.064, 56.604), target = "tvscreen" },
	-- Penthouse casino (home cinema)
	{ propName = "vw_prop_vw_cinema_tv_01", propPos = vec3(958.64, 31.78, 116.92), target = "tvscreen" },
}

local exteriorScreens = {
	{ propName = "V_ILev_CIN_Screen", propPos = vec3(338.73, 192.39, 105.99), target = "cinscreen", dist = 60, interiorID = true, roomID = -218226154 },
	{ propName = "ex_prop_ex_tv_flat_01", propPos = vec3(299.060, -599.972, 44.143), target = "ex_tvscreen", dist = 24, interiorID = true, roomID = 549289364 },
	{ propName = "xm_prop_x17_tv_ceiling_scn_01", propPos = vec3(-1085.670, -830.458, 30.018), target = "prop_x17_tv_ceil_scn_01", dist = 32, interiorID = true, roomID = -716118340 },
	{ propName = "xs_prop_arena_bigscreen_01", propPos = vec3(2800.0, -3801.482, 231.2379), target = "bigscreen_01", dist = 500, interiorID = true, roomID = 289098304 },
	{ propName = "prop_huge_display_02", propPos = vec3(-1558.55, -1135.18, 3.0), target = "big_disp", dist = 60 },
	-- Courtroom TV
	{ propName = "prop_cs_tv_stand", propPos = vec3(246.2557, -1108.19, 28.97071), target = "tvscreen", dist = 18, interiorID = true, roomID = -218226154 },
	-- Event screens
	{ propName = "prop_huge_display_01", propPos = vec3(-692.16, -988.94, 19.39), target = "big_disp", dist = 32, private = true },
	{ propName = "prop_huge_display_01", propPos = vec3(-1518.03, -1248.86, 1.41), target = "big_disp", dist = 32, private = true },
	{ propName = "prop_huge_display_01", propPos = vec3(-388.74, -102.09, 40.73), target = "big_disp", dist = 32, private = true },
}

local function deleteScreen()
	if not duiObj then return end

	DestroyDui(duiObj)
	duiObj = nil
end

local function createDUIObject(link, startTime)
	duiObj = CreateDui("https://www.gtaliferp.fr/prod/video3.html", GetScreenResolution())
	while not IsDuiAvailable(duiObj) do Wait(100) end

	txd = CreateRuntimeTxd(runtimeTxd)
	CreateRuntimeTextureFromDuiHandle(txd, "woof", GetDuiHandle(duiObj))

	Wait(2000)
	if duiObj and link then
		PrintTable(link)
		if link.twitch then
			SendDuiMessage(duiObj, json.encode({ type = "setTwitchChannel", channelName = link.value }))
		else
			SendDuiMessage(duiObj, json.encode({ type = "update", currentTime = startTime or 0, src = { type = "video/youtube", url = link.value } }))
			SendDuiMessage(duiObj, json.encode({ type = "volume", volume = 0.4 }))
		end
	end
end

local function createScreen(intID, link, seconds, startTime, boolResume, boolExterior)
	local tbl = boolExterior and exteriorScreens[intID] or interiorScreens[intID]
	currentScreen = { link = link, seconds = (seconds or 0) + math.floor(startTime and (GetCloudTimeAsInt() - startTime) or 0), screenID = intID, exterior = boolExterior }

	if not currentScreen.handle then
		currentScreen.renderId = tbl.target
		currentScreen.handle = CreateNamedRenderTargetForModel(tbl.target, GetHashKey(tbl.propName))
	end

	if not boolResume then
		currentScreen.startTime = startTime
	end

	if not duiObj then
		createDUIObject(link, currentScreen.seconds)
		-- CommitRuntimeTexture(txd)
	else
		if link.twitch then
			SendDuiMessage(duiObj, json.encode({ type = "setTwitchChannel", channelName = link.value }))
		else
			SendDuiMessage(duiObj, json.encode({ type = "update", currentTime = currentScreen.seconds, src = { type = "video/youtube", url = link.value } }))
			SendDuiMessage(duiObj, json.encode({ type = "volume", volume = 0.4 }))
		end
	end

	Citizen.Trace('screen created\n')
end

RegisterNetEvent("pichot_nb:screenUpdate")
AddEventHandler("pichot_nb:screenUpdate", function(_id, _data, boolExterior)
	if _id == 1 or _id == 3 then
		createScreen(_data.screenID, _data.link, _data.seconds or 0, _data.startTime, _id == 3, boolExterior)
	elseif _id == 2 then
		deleteScreen()
		currentScreen = {}
	end
end)

local function canSeeScreen(Player, v)
	local ped, plPos, plInt = Player.Ped, Player.Pos, Player.InteriorID
	local plRoom = GetRoomKeyFromEntity(ped)
	return GetDistanceBetweenCoords(v.propPos, plPos) <= (v.dist or 10) and (not v.roomID or v.roomID == plRoom)
end

local function GetClosestScreen(interiorId, noPrivate)
	local Player = LocalPlayer()
	local plPos = Player.Pos
	local boolExterior = not interiorId or not interiorId[1]

	local newClosest
	local screens = boolExterior and exteriorScreens or interiorScreens
	for k,v in pairs(screens) do
		local dist = GetDistanceBetweenCoords(v.propPos, plPos)
		if canSeeScreen(Player, v) and (not v.private or not noPrivate) and (not newClosest or dist < GetDistanceBetweenCoords(screens[newClosest].propPos, plPos)) then
			newClosest = k
		end
	end

	return newClosest or false, boolExterior
end

RegisterCommand("screen", function(src, args)
	TriggerEvent("pichot:toggleNUI", {
		input = {
			{ field = "Lien youtube / ID Youtube", id = "link" },
			{ field = "Seconde début (défaut 0)", id = "time" },
		}
	}, true, true, function(entry)
		local link, seconds, youtubeID = entry.link, entry.time
		youtubeID = link:gsub(".*?v=*", "")

		if not youtubeID or youtubeID:len() ~= 11 then return end
		local currentInterior = exports.gtalife:GetCurrentInterior()
		local closestScreen, boolExterior = GetClosestScreen(currentInterior, true)
		if not closestScreen or (not boolExterior and (not currentInterior or not currentInterior[1])) then ShowAboveRadarMessage("~r~Vous devez être à côté d'un écran.") return end

		TriggerServerEvent("pichot_dui:serverAct", 1, { closestScreen, youtubeID, tonumber(seconds), boolExterior and true or currentInterior })
	end)
end)

local closestExt = false
Citizen.CreateThread(function()
	txd = CreateRuntimeTxd(runtimeTxd)
	while true do
		Citizen.Wait(1000)

		local Player = LocalPlayer()

		local newClosest = GetClosestScreen(false)
		if closestExt ~= newClosest then
			TriggerServerEvent("pichot_dui:serverAct", 2, { closestExt or newClosest, newClosest })
			closestExt = newClosest
		end

		if currentScreen and currentScreen.screenID then
			local base = currentScreen.exterior and exteriorScreens[currentScreen.screenID] or not currentScreen.exterior and interiorScreens[currentScreen.screenID]
			local canSee = base and canSeeScreen(Player, base)

			if canSee and not duiObj and base and currentScreen.link then
				createDUIObject(currentScreen.link, (currentScreen.seconds or 0) + math.floor(currentScreen.startTime and (GetCloudTimeAsInt() - currentScreen.startTime) or 0))
				Citizen.Trace('screen resumed\n')
			elseif currentScreen.screenID and duiObj and not canSee then
				deleteScreen()
			end
		end
	end
end)

Citizen.CreateThread(function()
	local defaultRender = GetDefaultScriptRendertargetRenderId()
	while true do
		if currentScreen and currentScreen.screenID and duiObj then
			SetTextRenderId(currentScreen.handle)
				SetScriptGfxDrawOrder(4)
				SetScriptGfxDrawBehindPausemenu(1)
				-- DrawRect(0.0, 0.0, 2.0, 2.0, 255, 0, 0, 255)
				DrawSprite(runtimeTxd, "woof", 0.5, 0.5, 1.0, 1.0, 0.0, 255, 255, 255, 255)
				--DrawRect(0.0, 0.0, 2.0, 2.0, 255, 0, 0, 255)
			SetTextRenderId(defaultRender)
			SetScriptGfxDrawBehindPausemenu(0)
			Citizen.Wait(0)
		else
			Citizen.Wait(1000)
		end
	end
end)

AddEventHandler("onResourceStop", function(r)
	if r ~= GetCurrentResourceName() then return end
	deleteScreen()

	for _,v in pairs(interiorScreens) do
		ReleaseNamedRendertarget(v.target)
	end

	for _,v in pairs(exteriorScreens) do
		ReleaseNamedRendertarget(v.target)
	end
end)