local IsVisible = false
function IsMenuOpened()
	return IsVisible
end

function SetMenuVisible(bool)
	IsVisible = bool
end

local scaleformWorld = {
	{
		model = "bkr_prop_clubhouse_blackboard_01a", scaleform = "CLUBHOUSE_NAME", rendertarget = "clubname_blackboard_01a",
		data = { { name = "SET_CLUBHOUSE_NAME", param = { "THE LOST", 2, 0 } } },
		height = .9, width = .9 - 0.115, x = 0.1375, y = 0.2,
		shouldDraw = function(ped, pos) return GetInteriorAtCoords(pos) == 246273 end,
	},
	{
		model = "bkr_prop_rt_clubhouse_table", scaleform = "BIKER_MISSION_WALL", rendertarget = "clubhouse_table",
		data = {
		--	{ name = "SET_MISSION", param = { 0, "CELL_BIKER_STAN", "GB_BIGUNLOAD_D", "CHM_IMG3", -423.0253, 1681.888, 18.0291 } },
		},
		height = .9, width = 0.9, x = 0.55, y = 0.5,
		--shouldDraw = function(ped, pos) return GetInteriorAtCoords(pos) == 246273 end,
	},
	--[[{
		model = "bkr_prop_rt_clubhouse_plan_01a", scaleform = "BIKER_MISSION_WALL", rendertarget = "clubhouse_Plan_01a",
		data = {
			{ name = "HIDE_MISSION", param = { 1 } },
		},
		height = 1.0, width = 0.9, x = 0.55, y = 0.5,
		shouldDraw = function(ped, pos) return GetInteriorAtCoords(pos) == 246273 end,
	},
	{
		model = "bkr_prop_rt_clubhouse_table", scaleform = "BIKER_MISSION_WALL", rendertarget = "clubhouse_table",
		data = {
			{ name = "SET_MISSION", param = { 3, "CELL_BIKER_CK", "GB_BIGUNLOAD_D", "CHM_IMG3", -423.0253, -1681.888, 18.0291 } },
		},
		height = .9, width = 0.9, x = 0.55, y = 0.5,
		shouldDraw = function(ped, pos) return GetInteriorAtCoords(pos) == 246273 end,
	},]]--
}

function CreateNamedRenderTargetForModel(name, model)
	local handle = 0
	if not IsNamedRendertargetRegistered(name) then
		RegisterNamedRendertarget(name, 0)
	end
	if not IsNamedRendertargetLinked(model) then
		LinkNamedRendertarget(model)
	end
	if IsNamedRendertargetRegistered(name) then
		handle = GetNamedRendertargetRenderId(name)
	end

	return handle
end

local function SetOrganisationName()
	local ped = GetPlayerPed(-1)
	local plyPos = GetEntityCoords(ped)

	for k,v in pairs(scaleformWorld) do
		if v.shouldDraw and v.shouldDraw(ped, plyPos) then
			local targetHash = GetHashKey(v.model)
			v.banner = RequestScaleformMovie(v.scaleform)

			if (not IsNamedRendertargetRegistered(v.rendertarget)) then
				RegisterNamedRendertarget(v.rendertarget, 0)
				LinkNamedRendertarget(targetHash)

				Citizen.Wait(500)

				if (not IsNamedRendertargetLinked(targetHash)) then
					ReleaseNamedRendertarget(targetHash)
				end
			end

			if HasScaleformMovieLoaded(v.banner) then
				for _,p in pairs(v.data) do
					PushScaleformMovieFunction(v.banner, p.name)
					if p.param then
						for _,par in pairs(p.param) do
							local varType = type(par)
							if varType == "number" then
								if math.type(par) == "integer" then
									PushScaleformMovieFunctionParameterInt(par)
								else
									PushScaleformMovieFunctionParameterFloat(par)
								end
							elseif varType == "boolean" then
								PushScaleformMovieFunctionParameterBool(par)
							elseif varType == "string" then
								PushScaleformMovieFunctionParameterString(par)
							end
						end
					end
					if v.func then v.func() end
					PopScaleformMovieFunction()
				end
			end

			local renderID = GetNamedRendertargetRenderId(v.rendertarget)
			SetTextRenderId(renderID)
			DrawScaleformMovie(v.banner, v.x, v.y, v.width, v.height, 255, 255, 255, 255, 0)
			SetTextRenderId(GetDefaultScriptRendertargetRenderId())
		elseif v.banner then
			SetScaleformMovieAsNoLongerNeeded(v.banner)
			v.banner = nil
		end
	end
end

--Citizen.CreateThread(function()
--	while true do
--		Citizen.Wait(0)
--		SetOrganisationName()
--	end
--end)

function GetScaleformMenuInfo(scaleform)
	PushScaleformMovieFunction(scaleform, "GET_CURRENT_SCREEN_ID")
	local a = EndScaleformMovieMethodReturn()
	while not GetScaleformMovieFunctionReturnBool(a) do
		Citizen.Wait(0)
	end

	local screenID = GetScaleformMovieFunctionReturnInt(a)

	PushScaleformMovieFunction(scaleform, "GET_CURRENT_SELECTION")
	a = EndScaleformMovieMethodReturn()
	while not GetScaleformMovieFunctionReturnBool(a) do
		Citizen.Wait(0)
	end

	local selectinID = GetScaleformMovieFunctionReturnInt(a)

	return screenID, selectinID
end

function SetScaleformParams(scaleform, data)
	data = data or {}
	for k,v in pairs(data) do
		PushScaleformMovieFunction(scaleform, v.name)
		if v.param then
			for _,par in pairs(v.param) do
				if math.type(par) == "integer" then
					PushScaleformMovieFunctionParameterInt(par)
				elseif type(par) == "boolean" then
					PushScaleformMovieFunctionParameterBool(par)
				elseif math.type(par) == "float" then
					PushScaleformMovieFunctionParameterFloat(par)
				elseif type(par) == "string" then
					PushScaleformMovieFunctionParameterString(par)
				end
			end
		end
		if v.func then v.func() end
		PopScaleformMovieFunctionVoid()
	end
end

function createScaleform(name, data)
	if not name or string.len(name) <= 0 then return end
	local scaleform = RequestScaleformMovie(name)

	while not HasScaleformMovieLoaded(scaleform) do
		Citizen.Wait(0)
	end

	SetScaleformParams(scaleform, data)
	return scaleform
end