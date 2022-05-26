local isLite = GetConvarInt("sv_gtalite", 0) == 1
local lsc_locations = {
	{ x = -1155.54, y = -2007.183, z = 12.74 },
	{ x = 731.82, y = -1088.82, z = 21.73 },
	{ x = 1175.04, y = 2640.22, z = 37.32 },
	{ x = 998.22, y = -2991.63, z = -40.65 },
	{ x = 999.29, y = -3011.62, z = -40.65 },
	{ x = 222.04, y = -1478.51, z = 28.17 },
	{ x = 946.4, y = 725.46, z = 4.99 },
	{ x = 956.62, y = 723.98, z = 4.91 },
	{ x = -337.96, y = -137.8, z = 37.83 },
	vector3(541.79, -187.4, 53.48),
	vector3(472.55, -1881.19, 25.1),
	vector3(974.88, -1838.61, 30.26),
	{ x = 1166.91, y = 2651.03, z = 37.01 }, -- Route 68
	{ x = 2514.04, y = 4221.16, z = 38.9 },
	{ x = 2524.47, y = 4195.17, z = 38.96 },
	{ x = 1684.92, y = 6434.3, z = 31.31 },
	{ x = 1450.63, y = -1674.81, z = 64.5 },
	{ x = 2517.42, y = 4218.8, z = 38.93 },
	{ x = 266.5, y = -1813.12, z = 26.11 },
	{ x = 163.09, y = 274.42, z = 108.95 }, -- Custom Mayans
	{ x = 7.79, y = -1405.66, z = 28.27 },
	{ x = 194.1, y = -1484.17, z = 28.17 },
	{ x = 180.36, y = -1244.13, z = 28.21 },
	{ x = 256.43, y = 2601.55, z = 43.85 },
	{ x = 1141.82, y = -773.24, z = 57.65 }, -- Custom Viking Motors
	{ x = -1112.53, y = -2883.74, z = 12.95 }, -- Custom hélico aéroport LS pad 3
	{ x = -799.4, y = -1504.12, z = -1.47 }, -- Custom bateau marina LS
	{ x = -337.67, y = -117.05, z = 38.05, a = 339.92 }, -- Custom Luxury Motors big instance (Lite)
	{ x = -328.7, y = -120.31, z = 38.05, a = 339.3 }, -- Custom Luxury Motors big instance (Lite)
	{ x = -236.88, y = -1318.01, z = 29.89, a = 99.26 }, -- Big Benny's 1
	{ x = -236.6, y = -1325.64, z = 29.89, a = 113.17 }, -- Big Benny's 2
	{ x = -194.7, y = -1319.14, z = 29.89, a = 189.25 }, -- Big Benny's 3
	{ x = -236.88, y = -1326.95, z = 47.41, a = 93.66 }, -- Big Benny's 4
	{ x = 1741.3, y = 3245.2, z = 41.1 }, -- Custom aéroport shore
	{ x = -31.98, y = -1090.59, z = 26.42 }, -- Custom concessionnaire centre (Lite)
}

if not isLite then
	table.insert(lsc_locations, { x = 111.09, y = 6625.95, z = 30.79 }) -- Concess Paleto (Life)
	table.insert(lsc_locations, { x = 126.62, y = 6624.57, z = 30.8 }) -- Concess Paleto (Life)
else
	table.insert(lsc_locations, { x = -1137.56, y = -2015.31, z = 12.22 }) -- Custom aéroport big instance (Lite)
	table.insert(lsc_locations, { x = -1144.27, y = -2022.06, z = 12.22 }) -- Custom aéroport big instance (Lite)
	table.insert(lsc_locations, { x = 1989.16, y = 3766.25, z = 32.18 }) -- Custom Sandy Shores, station service à côté du PDP (Lite)
end

local tempData = { veh = 0 }
local closeLS = false

local listCouleurType = {
	{ name = "Couleur", slidemax = 159, pr = 75 },
	{ name = "Couleur custom" },
}

local availableModsBenny = {30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 44, 45, 48, 49, 50}
local firstPerson = {27, 28, 29, 30, 33, 32, 34}
local capotOpen = {39, 40, 45}
local coffreOpen = {37}

local modificationList = {
	{ id = 0, name = "Aileron", pr = 400 },
	{ id = 1, name = "PC Avant", pr = 300 },
	{ id = 2, name = "PC Arrière", pr = 300 },
	{ id = 3, name = "Carroserie", pr = 250 },
	{ id = 4, name = "Pot d'échappement", pr = 400 },
	{ id = 5, name = "Cadre", pr = 400 },
	{ id = 6, name = "Calandre", pr = 300 },
	{ id = 7, name = "Capot", pr = 400 },
	{ id = 8, name = "GB gauche", pr = 250 },
	{ id = 9, name = "GB droit", pr = 250 },
	{ id = 10, name = "Toît", pr = 250 },
	{ id = 25, name = "Support plaque", pr = 250 },
	{ id = 26, name = "Plaque avant", pr = 250 },
	{ id = 27, name = "Style intérieur", pr = 250 }, -- first person
	{ id = 28, name = "Figurine", pr = 250 },  -- first person
	{ id = 29, name = "Motif dashboard", pr = 250 }, -- first person
	{ id = 30, name = "Cadran", pr = 250 },  -- first person
	{ id = 31, name = "Haut-parleur portes", pr = 250 },
	{ id = 32, name = "Motif sièges", pr = 250 },
	{ id = 33, name = "Volant", pr = 250 },
	{ id = 34, name = "Levier", pr = 250 },
	{ id = 35, name = "Logo custom", pr = 250 },
	{ id = 36, name = "ICE", pr = 250 },
	{ id = 37, name = "Haut-parleur coffre", pr = 250 }, -- ouvrir coffre
	{ id = 38, name = "Hydrolique", pr = 250 },
	{ id = 39, name = "Moteur", pr = 250 }, -- ouvrir capot
	{ id = 40, name = "Filtres à air", pr = 250 }, -- ouvrir capot
	{ id = 41, name = "Entretoises", pr = 250 },
	{ id = 42, name = "Arc couverture", pr = 250 },
	{ id = 43, name = "Antenne", pr = 250 },
	{ id = 44, name = "Motif extérieur", pr = 250 },
	{ id = 45, name = "Réservoir", pr = 250 },
	{ id = 46, name = "Fenêtre", pr = 250 },
	{ id = 48, name = "Style", pr = 250 },
}

local DoesEntityExist = DoesEntityExist
local IsControlJustPressed = IsControlJustPressed

local function ShouldWeCloseTheMenu()
	if tempData.veh == 0 or not DoesEntityExist(tempData.veh) or not LocalPlayer():GetVehicle() or not (GetPedInVehicleSeat(tempData.veh, -1) == PlayerPedId()) then
		CloseMenu()
		return true
	end
end

local formerVehData = {}

local slideFunction = {
	["couleur intérieur"] = function(veh, b)
		SetVehicleInteriorColour(veh, b.slidenum and b.slidenum - 1 or 0)
	end,
	["effet couleur"] = function(veh, b)
		local _, w = GetVehicleExtraColours(veh)
		SetVehicleExtraColours(veh, b.slidenum and b.slidenum - 1 or 0, w)
	end,
	["couleur principale"] = function(veh, b, id)
		if b.RGBA then
			local r, g, bb = GetVehicleCustomPrimaryColour(veh)
			ClearVehicleCustomPrimaryColour(veh)
			SetVehicleCustomPrimaryColour(veh, b.RGBA[1] or r, b.RGBA[2] or g, b.RGBA[3] or bb)
		else
			local _, s = GetVehicleColours(veh)
			local color = (b.slidenum or 1) - 1
			ClearVehicleCustomPrimaryColour(veh)
			SetVehicleColours(veh, color, s)
		end
	end,
	["couleur secondaire"] = function(veh, b, id)
		if b.RGBA then
			local r, g, bb = GetVehicleCustomSecondaryColour(veh)
			ClearVehicleCustomSecondaryColour(veh)
			SetVehicleCustomSecondaryColour(veh, b.RGBA[1] or r, b.RGBA[2] or g, b.RGBA[3] or bb)
		else
			local p = GetVehicleColours(veh)
			local color = (b.slidenum or 1) - 1

			ClearVehicleCustomSecondaryColour(veh)
			SetVehicleColours(veh, p, color)
		end
	end,
	["klaxon"] = function(veh, b) SetVehicleMod(veh, 14, b.slidenum - 2, false) end,
	["type de roue"] = function(veh, b, id, menuData, self)
		local allMenu = self.Menu[menuData.currentMenu]
		if not allMenu or not allMenu.b or not allMenu.b[2] then return end
		SetVehicleWheelType(veh, b.slidenum - 1)
		allMenu.b[2].slidenum = 1
		allMenu.b[2].slidemax = GetNumVehicleMods(veh, 23) - 1
	end,
	["modèle roues principales"] = function(veh, b) SetVehicleMod(veh, 23, b.slidenum - 2, GetVehicleModVariation(veh, 23)) end,
	["modèle roues arrières"] = function(veh, b) SetVehicleMod(veh, 24, b.slidenum - 2, GetVehicleModVariation(veh, 24)) end,
	["couleur roue"] = function(veh, b)
		local a = GetVehicleExtraColours(veh)
		SetVehicleExtraColours(veh, a, b.slidenum and b.slidenum - 1 or 0)
	end,
	["roues customs"] = function(veh, b)
		local enabled = b.slidenum == 2 or false
		SetVehicleMod(veh, 23, GetVehicleMod(veh, 23), enabled)
	end,
	["roues customs arrières"] = function(veh, b)
		local enabled = b.slidenum == 2 or false
		SetVehicleMod(veh, 24, GetVehicleMod(veh, 24), enabled)
	end,
	["teinte fenêtre"] = function(veh, b) SetVehicleWindowTint(veh, b.slidenum and b.slidenum - 1 or 0) end,
	["couleur tableau de bord"] = function(veh, b) SetVehicleDashboardColour(veh, b.slidenum and b.slidenum - 1 or 0) end,
	["modèle plaque"] = function(veh, b) SetVehicleNumberPlateTextIndex(veh, b.slidenum and b.slidenum - 1 or 0) end,
	["neons"] = function(veh, b)
		local r, g, bb = GetVehicleNeonLightsColour(veh)
		if b.RGBA then SetVehicleNeonLightsColour(veh, b.RGBA[1] or r, b.RGBA[2] or g, b.RGBA[3] or bb) end
	end,
	["modifications custom"] = function(veh, b) SetVehicleMod(veh, b.id, b.slidenum and b.slidenum - 2 or - 1) end,
	["performances"] = function(veh, b) SetVehicleMod(veh, b.id, b.slidenum and b.slidenum - 2 or - 1) end,
	["modifications benny's"] = function(veh, b) SetVehicleMod(veh, b.id, b.slidenum and b.slidenum - 2 or - 1) end,
	["roues"] = function(veh, b)
		local r, g, bb = GetVehicleTyreSmokeColor(veh)
		if b.RGBA then SetVehicleTyreSmokeColor(veh, b.RGBA[1] or r, b.RGBA[2] or g, b.RGBA[3] or bb) end
	end,
	["livery"] = function(veh, b) SetVehicleLivery(veh, b.slidenum and b.slidenum - 1) end,
	["couleur des phares"] = function(veh, b) SetVehicleXenonLightsColour(veh, b.slidenum and b.slidenum - 1) end,
	["accessoires"] = function(veh, b) SetVehicleExtra(veh, b.id, ((b.slidenum ~= nil and b.slidenum == 1) and 1) or ((b.slidenum ~= nil and b.slidenum == 2) and 0)) end,
}

local function onSlide(menuData, currentButton, currentSlt, self)
	local currentMenu, buttonName = menuData.currentMenu, string.lower(currentButton.name)
	local lastMenu = menuData.back[#menuData.back]

	if ShouldWeCloseTheMenu() then return end
	local slidenum = currentButton.slidenum and currentButton.slidenum - 1 or 0
	if currentMenu == "couleur principale" or currentMenu == "couleur secondaire" then -- extra args
		buttonName = currentMenu
		if currentSlt == 1 then currentButton.pType = slidenum end
	elseif currentMenu == "couleur custom" then
		buttonName = lastMenu.menu
		currentButton.RGBA = { [currentSlt] = slidenum }
	elseif currentMenu == "modifications custom" or (currentMenu == "roues" and currentSlt == 5) or currentMenu == "modifications benny's" or currentMenu == "performances" then
		buttonName = currentMenu
	end

	local slideFunc = slideFunction[buttonName] or slideFunction[currentMenu]
	if slideFunc then
		slideFunc(tempData.veh, currentButton, currentSlt, menuData, self)
	end
end

local function GetModObjects(veh, mod)
	local tbl = {"Défaut"}
	for i = 0, tonumber(GetNumVehicleMods(veh,mod)) - 1 do
		local toBeInserted = "0"
		local labelName = GetModTextLabel(veh,mod,i)
		if labelName ~= nil then
			local name = tostring(GetLabelText(labelName))
			if name ~= "NULL" then
				toBeInserted = name
			end
		end
		tbl[#tbl + 1] = toBeInserted
	end

	return tbl
end

local function getAllCustomFromVeh(BENNY)
	local veh, tbl = tempData.veh, {}
	if ShouldWeCloseTheMenu() then return tbl end

	for _,v in pairs(modificationList) do
		local INSIDE = tableHasValue(availableModsBenny, v.id)
		if BENNY and INSIDE or not BENNY and not INSIDE then
			local num = GetNumVehicleMods(veh, v.id)
			if num and num > 0 then
				tbl[#tbl + 1] = { name = v.name, slidemax = GetModObjects(veh, v.id), customSlidenum = GetVehicleMod(veh, v.id) + 2, id = v.id, pr = v.pr or 200 }
			end
		end
	end

	return tbl
end

local function getExtraFromVehicle()
	local veh, tbl = tempData.veh, {}
	if ShouldWeCloseTheMenu() then return {} end

	for i = 0, 20 do
		if DoesExtraExist(veh, i) then
			tbl[#tbl + 1] = { name = "Extra #" .. i, id = i, slidemax = {"OFF", "ON"}, customSlidenum = function() return IsVehicleExtraTurnedOn(veh, i) and 2 or 1 end, pr = 50 }
		end
	end

	return tbl
end

local function onButtonSelected(this, currentSlt, old, currentButton)
	if ShouldWeCloseTheMenu() or not currentButton or not currentButton.name then return end

	SetVehicleDoorShut(tempData.veh, 5, true)
	SetVehicleDoorShut(tempData.veh, 4, true)
	if GetFollowVehicleCamViewMode() == 4 then SetFollowVehicleCamViewMode(0) end

	if currentButton.id then
		local shouldOpenTrunk = tableHasValue(coffreOpen, currentButton.id)
		local shouldOpenCapot = tableHasValue(capotOpen, currentButton.id)
		local shouldToggleFirst = tableHasValue(firstPerson, currentButton.id)

		if shouldOpenTrunk or shouldOpenCapot then
			SetVehicleDoorOpen(tempData.veh, shouldOpenTrunk and 5 or 4, false, true)
		end

		if shouldToggleFirst then
			SetFollowVehicleCamViewMode(4)
		end
	end
end

local function canPayCustom(user, price)
	if user and user.bankmoney >= price then return true end
	ShowAboveRadarMessage("~r~Vous n'avez pas suffisamment d'argent en banque.")
end

local function onSelected(self, menuData, currentButton, currentSlt, allButtons)
	local currentMenu, customPr = menuData.currentMenu
	local buttonName, user = string.lower(currentButton.name), GM.State.user
	local checkbox = currentButton.checkbox ~= nil and currentButton.checkbox()

	if currentMenu == "couleur custom" then currentMenu = menuData.back[#menuData.back].menu end
	if currentButton.name == "couleur custom" or currentMenu == "menu de personnalisation" then return end

	if user and (not currentButton.pr or canPayCustom(user, currentButton.pr)) then
		if currentButton.toggle then
			local enable = not checkbox
			ToggleVehicleMod(tempData.veh, currentButton.toggle, enable)
			if not enable then customPr = 0 end
			formerVehData.mods[currentButton.toggle] = enable and 1 or -1
		elseif currentMenu == "performances" and currentButton.id then
			customPr = currentButton.pr * currentButton.slidenum
			if not canPayCustom(user, customPr) then return end
			formerVehData.mods[currentButton.id] = currentButton.slidenum - 2
		elseif (currentMenu == "modifications custom" or currentMenu == "modifications benny's" or currentMenu == "modifications classiques") and currentButton.id then
			local id = currentButton.slidenum - 2
			customPr = id == -1 and 0 or currentButton.pr
			if not canPayCustom(user, customPr) then return end
			formerVehData.mods[currentButton.id] = id
		elseif currentMenu == "modifications classiques" then
			if buttonName == "teinte fenêtre" then
				formerVehData.win = currentButton.slidenum - 1
			elseif buttonName == "modèle plaque" then
				formerVehData.pl = currentButton.slidenum - 1
			elseif buttonName == "livery" then
				formerVehData.t = currentButton.slidenum - 1
			elseif buttonName == "couleur des phares" then
				formerVehData.he = currentButton.slidenum - 1
			end
		elseif currentMenu == "neons" then
			if currentButton.checkbox ~= nil then
				local enable = not checkbox
				SetVehicleNeonLightEnabled(tempData.veh, currentSlt - 1, enable)
				formerVehData.neon[1] = formerVehData.neon[1] or {}
				formerVehData.neon[1][currentSlt] = enable
				if not enable then customPr = 0 end
			else
				customPr = 250
				if not canPayCustom(user, customPr) then return end
				formerVehData.neon[2] = { allButtons[1].slidenum or 0, allButtons[2].slidenum or 0, allButtons[3].slidenum or 0 }
			end
		elseif currentMenu == "couleur principale" or currentMenu == "couleur secondaire" then
			if currentButton.name == "Type" then return end
			customPr = currentButton.pr
			if not customPr or not canPayCustom(user, customPr) then return end

			local boolSecondary = currentMenu == "couleur secondaire"
			formerVehData[boolSecondary and "cs" or "c"] = boolSecondary and table.pack(GetVehicleCustomSecondaryColour(tempData.veh)) or table.pack(GetVehicleCustomPrimaryColour(tempData.veh))
		elseif currentMenu == "peintures" then
			if buttonName == "couleur intérieur" then
				formerVehData.intC = currentButton.slidenum - 1
			elseif buttonName == "couleur tableau de bord" then
				formerVehData.da = currentButton.slidenum - 1
			elseif buttonName == "effet couleur" then
				formerVehData.c2 = formerVehData.c2 or {}
				formerVehData.c2[1] = currentButton.slidenum - 1
			end
		elseif currentMenu == "roues" then
			if buttonName == "couleur roue" then
				formerVehData.c2 = formerVehData.c2 or {}
				formerVehData.c2[2] = currentButton.slidenum - 1
			elseif buttonName == "roues customs" then
				formerVehData.cw = formerVehData.cw or {}
				formerVehData.cw[1] = currentButton.slidenum - 1
			elseif buttonName == "roues customs arrières" then
				formerVehData.cw = formerVehData.cw or {}
				formerVehData.cw[2] = currentButton.slidenum - 1
			elseif currentButton.id then
				formerVehData.wt = allButtons[1].slidenum - 1
				formerVehData.mods[currentButton.id] = currentButton.slidenum - 2
			elseif currentButton.slidemax then
				customPr = 250
				if not canPayCustom(user, customPr) then return end
				formerVehData.tr = table.pack(GetVehicleTyreSmokeColor(tempData.veh))
			end
		elseif currentMenu == "accessoires" then
			formerVehData.ext = formerVehData.ext or {}
			if currentButton.slidenum == 2 then
				formerVehData.ext[currentButton.id] = 0
			else
				formerVehData.ext[currentButton.id] = 1
			end
		end

		local price = customPr or currentButton.pr
		if price then
			PrintTable(formerVehData)
			SetVehicleCustom(tempData.veh, formerVehData)
			TriggerEvent("pichot:buyLSCustom", { price = price, n = buttonName })
		end
	else
		ShowAboveRadarMessage("~r~Vous ne pouvez pas payer.")
	end
end

local function onRender(self, allButtons, currentButton)
	local currentMenu = self.Data.currentMenu
	if currentMenu == "menu de personnalisation" or not currentButton then return end
	local useMult = currentMenu == "performances" and currentButton.slidemax
	local price = currentButton.pr

	if price then
		price = useMult and price * (currentButton.slidenum or 1) or price
		DrawText2(0, "~g~" .. price .. "$", 3.0, 1.0, .825, {255, 255, 255}, true, 2)
	end
end

local menuOpen
local LSCustomMenu = {
	Base = { Header = {"shopui_title_supermod", "shopui_title_supermod"}, Title = "" },
	Data = { currentMenu = "menu de personnalisation" },
	Events = {
		onOpened = function()
			RequestStreamedTextureDict("shopui_title_supermod", false)
			tempData.veh = GetVehiclePedIsIn(PlayerPedId())
			SetVehicleModKit(tempData.veh, 0)
			formerVehData = GetCustomData(tempData.veh, false, true)
			FreezeEntityPosition(tempData.veh, true)
			SetEntityInvincible(tempData.veh, true)
			SetStreamedTextureDictAsNoLongerNeeded("shopui_title_supermod")
		end,
		onRender = onRender,
		onSlide = onSlide,
		onSelected = onSelected,
		onButtonSelected = onButtonSelected,
		onExited = function()
			FreezeEntityPosition(tempData.veh, false)
			SetEntityInvincible(tempData.veh, false)
			SetVehicleCustom(tempData.veh, formerVehData)
			tempData = {}
			formerVehData = {}
			menuOpen = nil
		end
	},
	Menu = {
		["menu de personnalisation"] = {
			b = {
				{ name = "Peintures" },
				{ name = "Roues" },
				{ name = "Modifications classiques" },
				{ name = "Modifications custom" },
				{ name = "Modifications Benny's" },
				{ name = "Performances" },
				{ name = "Neons", canSee = function() return IsThisModelACar(GetEntityModel(tempData.veh)) end },
				{ name = "Accessoires" },
			}
		},
		["modifications classiques"] = {
			b = {
				{ name = "Klaxon", pr = 80, id = 14, slidemax = function() return GetNumVehicleMods(tempData.veh, 14) - 1 end, customSlidenum = function() return GetVehicleMod(tempData.veh, 14) + 2 end },
				{ name = "Teinte fenêtre", pr = 200, slidemax = {"Normale", "Noire", "Fumée noire", "Fumée simple", "Stock", "Limousine"}, customSlidenum = function() return math.max(1, math.min(10, GetVehicleWindowTint(tempData.veh) + 1)) end },
				{ name = "Phares xenons", pr = 200, toggle = 22, checkbox = function() return IsToggleModOn(tempData.veh, 22) ~= false end },
				{ name = "Modèle plaque", pr = 150, slidemax = {"Défaut", "San Andreas noir", "San Andreas bleu", "San Andreas blanc", "Simple blanche", "Yankton blanche"}, customSlidenum = function() return GetVehicleNumberPlateTextIndex(tempData.veh) + 1 end },
				{ name = "Livery", pr = 700, slidemax = function() return GetVehicleLiveryCount(tempData.veh) - 1 end },
				{ name = "Couleur des phares", pr = 250, slidemax = 12 },
			}
		},
		["roues"] = {
			slidertime = 75,
			b = {
				{ name = "Type de roue", slidemax = {"Sport", "Muscle", "Lowrider", "SUV", "Offroad", "Tuner", "Moto", "High end", "Bespokes Originals", "Bespokes Smokes"}, customSlidenum = function() return GetVehicleWheelType(tempData.veh) + 1 end },
				{ name = "Modèle roues principales", pr = 500, id = 23, slidemax = function() return GetNumVehicleMods(tempData.veh, 23) - 1 end },
				{ name = "Modèle roues arrières", pr = 500, id = 24, slidemax = function() return GetNumVehicleMods(tempData.veh, 24) - 1 end, canSee = function() return IsThisModelABike(GetEntityModel(tempData.veh)) end },
				{ name = "Couleur roue", pr = 90, slidemax = 160 },
				{ name = "Fumée pneus", pr = 3000, toggle = 20, checkbox = function() return IsToggleModOn(tempData.veh, 20) ~= false end },
				{ name = "Couleur custom", pr = 200 },
				{ name = "Roues customs", pr = 90, slidemax = {"Désactiver", "Activer"}, customSlidenum = function() return GetVehicleModVariation(tempData.veh, 23) == 1 and 2 or 1 end},
				{ name = "Roues customs arrières", pr = 90, slidemax = {"Désactiver", "Activer"}, customSlidenum = function() return GetVehicleModVariation(tempData.veh, 24) == 1 and 2 or 1 end, canSee = function() return IsThisModelABike(GetEntityModel(tempData.veh)) end},
			}
		},
		["performances"] = {
			b = {
				{ name = "Suspension", pr = 400, slidemax = function() return table.move({"Stock", "Rabaissée", "Rue", "Sport", "Course"}, 1, GetNumVehicleMods(tempData.veh, 15) + 1, 1, {}) end, customSlidenum = function() return GetVehicleMod(tempData.veh, 15) + 2 end, id = 15 },
				{ name = "Transmission", pr = 500, slidemax = function() return table.move({"Stock","Rue", "Sport", "Course"}, 1, GetNumVehicleMods(tempData.veh, 13) + 1, 1, {}) end, customSlidenum = function() return GetVehicleMod(tempData.veh, 13) + 2 end, id = 13 },
				{ name = "Moteur", pr = 2400, slidemax = function() return table.move({"Stock", "Evo 1", "Evo 2", "Evo 3", "Evo max"}, 1, GetNumVehicleMods(tempData.veh, 11) + 1, 1, {}) end, customSlidenum = function() return GetVehicleMod(tempData.veh, 11) + 2 end, id = 11 },
				{ name = "Frein", pr = 1000, slidemax = function() return table.move({"Stock", "Rue", "Sport", "Course"}, 1, GetNumVehicleMods(tempData.veh, 11) + 1, 1, {}) end, customSlidenum = function() return GetVehicleMod(tempData.veh, 12) + 2 end, id = 12 },
				{ name = "Turbo", pr = 14000, toggle = 18, checkbox = function() return IsToggleModOn(tempData.veh, 18) ~= false end, canSee = function() return IsThisModelACar(GetEntityModel(tempData.veh)) end },
			}
		},
		["peintures"] = {
			slidertime = 75,
			b = {
				{ name = "Couleur principale" },
				{ name = "Couleur secondaire" },
				{ name = "Couleur intérieur", slidemax = 158, pr = 125 },
				{ name = "Couleur tableau de bord", slidemax = 158, pr = 125 },
				{ name = "Effet couleur", slidemax = 158, pr = 300 },
			}
		},
		["couleur custom"] = { slidertime = 25, b = { { name = "Rouge", slidemax = 255, pr = 50 }, { name = "Vert", slidemax = 255, pr = 50 }, { name = "Bleu", slidemax = 255, pr = 50 } } },
		["couleur principale"] = { slidertime = 75, b = listCouleurType },
		["couleur secondaire"] = { slidertime = 75, b = listCouleurType },
		["accessoires"] = {
			b = getExtraFromVehicle
		},
		["neons"] = {
			b = {
				{ name = "Néon gauche", pr = 1500, checkbox = function() return IsVehicleNeonLightEnabled(tempData.veh, 0) == 1 end },
				{ name = "Néon droit", pr = 1500, checkbox = function() return IsVehicleNeonLightEnabled(tempData.veh, 1) == 1 end },
				{ name = "Néon avant", pr = 1500, checkbox = function() return IsVehicleNeonLightEnabled(tempData.veh, 2) == 1 end },
				{ name = "Néon arrière", pr = 1500, checkbox = function() return IsVehicleNeonLightEnabled(tempData.veh, 3) == 1 end },
				{ name = "Couleur custom", pr = 330 }
			}
		},
		["modifications custom"] = {
			b = function() return getAllCustomFromVeh() end
		},
		["modifications benny's"] = {
			b = function() return getAllCustomFromVeh(true) end
		}
	}
}


local function listenOpenMenu()
	Citizen.CreateThread(function()
		while closeLS do
			Citizen.Wait(0)

			if closeLS and IsControlJustPressed(0, 51) then
				ClearHelp(-1)
				CreateMenu(LSCustomMenu)
				menuOpen = true
			end
		end
	end)
end

Citizen.CreateThread(function()
	local Player = LocalPlayer()
	while true do
		Citizen.Wait(5000)

		local vehicle, plyPos = Player:GetVehicle(), Player.Pos
		-- Not used
		-- canSeeVeh = tempData.veh ~= 0 and DoesEntityExist(tempData.veh)
		if vehicle and DoesEntityExist(vehicle) and exports.gtalife:IsDep() then
			for i,pos in ipairs(lsc_locations) do
				if GetDistanceBetweenCoords(pos.x, pos.y, pos.z, plyPos) <= 5 then
					if not closeLS then
						listenOpenMenu()
						closeLS = i
					else
						closeLS = i
					end
					DrawTopNotification("Appuyez sur ~INPUT_CONTEXT~ pour rentrer dans ~b~le Los Santos Custom~w~.", true)
					break
				elseif closeLS == i then
					closeLS = nil
					ClearHelp(-1)
					if menuOpen then CloseMenu() menuOpen = nil end
				end
			end
		elseif closeLS then
			closeLS = nil
			ClearHelp(-1)
		end

		if menuOpen and (not tempData or not tempData.veh or not DoesEntityExist(tempData.veh) or not vehicle) then
			CloseMenu()
		end
	end
end)