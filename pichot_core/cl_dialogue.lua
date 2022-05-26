--
local Dialogue = {}
local color_white = { 255, 255, 255 }
local pearl_blue = { 70, 130, 180 }
local gold_color = { 255, 165, 0 }

function Dialogue:CreateCam(Ped)
	self.Base.Cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", false)
	exports["gtalife"]:AuthCam(self.Base.Cam)
	SetCamActive(self.Base.Cam, true)
	--AttachCamToEntity(self.Base.Cam, Ped, 0.0, -0.75, 0.6, true)
	AttachCamToEntity(self.Base.Cam, Ped, 0.0, 0.75, 0.6, true)
	SetCamRot(self.Base.Cam, 0.0, 0.0, GetEntityHeading(Ped) - 180.0, 2)
	RenderScriptCams(1, 1, 750, 1, 0)
end

function Dialogue:DestroyCam()
	DestroyCam(self.Base.Cam)
	exports["gtalife"]:DesCam(self.Base.Cam)
	RenderScriptCams(0, 1, 1000, 0, 0)
end

function Dialogue:CloseMenu()
	self.IsVisible = false
	if self.Base.Cam then
		self:DestroyCam()
	end

	self.Base = {}
	self.Menu = {}

	self.Base.Count = 0
	self.Base.Selected = 0
	self.Base.Cam = false
end

function Dialogue:KeyTick()
	DisablePlayerFiring(PlayerId(), true)

	if self.Base.Selected ~= 0 and IsControlJustPressed(2, 223) then
		local selectedLine, stayOpen = self.Menu[self.Base.Selected]
		if self.Base.Callback and selectedLine and not selectedLine.fail then
			stayOpen = Dialogue.Base.Callback(selectedLine, Dialogue.Base.Selected)
		end

		if not stayOpen then
			self:CloseMenu()
		end
	end

	if IsControlJustPressed(2, 177) then
		self:CloseMenu()
	end
end

function Dialogue:DrawTick()
	if not self.IsVisible then return end

	SetMouseCursorActiveThisFrame()
	HideHudAndRadarThisFrame()
	DisableControlAction(0, 1, true)
	DisableControlAction(0, 2, true)
	DisableControlAction(0, 24, true)
	DisableControlAction(0, 25, true)

	DrawRect(.5, .9, 1.0, .2, 0, 0, 0, 100)

	local startY = 0.825
	local spriteW, spriteH = 0.025, 0.05
	local firstX, spacingX, firstY, spacingY = 0.4875, 0.025, startY + 0.0675, 0.045

	self.Base.Selected = 0

	DrawText2(4, self.Base.Desc or "Je n'ai pas très bien compris ce que vous désirez.", .5, .5, startY, color_white, true, 0)
	for i = 1, 4 do
		local dialogue, rightLine, belowLine = self.Menu[i], i == 2 or i == 3, i > 2
		local intX, intY = rightLine and firstX + spacingX or firstX, belowLine and firstY + spacingY or firstY

		if IsMouseInBounds(intX + (rightLine and .14 or -.14), intY, .25, .04) then
			self.Base.Selected = i
		end

		local item_color = dialogue and self.Selected == i and gold_color or pearl_blue
		DrawSprite("helicopterhud", "hud_corner", intX, intY, spriteW, spriteH, -90.0 + 90.0 * i, item_color[1], item_color[2], item_color[3], 255)
		if dialogue then
			DrawSprite("helicopterhud", "hud_line", intX + (rightLine and spacingX * .45 or -firstX * 0.025), intY, 0.015, 0.004, 180.0, item_color[1], item_color[2], item_color[3], 255)
			DrawText2(4, (self.Base.Selected == i and "~HUD_COLOUR_PLATFORM_GREY~" or "") .. dialogue.text, .425, intX - (rightLine and -firstX or firstX) * 0.04, intY - 0.0175, color_white, true, rightLine and 1 or 2)
		end
	end

	if self.Base.Cam then
		SetLocalPlayerInvisibleLocally(PlayerId())
	end
end

function Dialogue:CreateDialogue(tbl, callback, update)
	if not update and self.IsVisible then return end

	if not HasStreamedTextureDictLoaded("helicopterhud") or not HasStreamedTextureDictLoaded("pichot_content2") then
		RequestStreamedTextureDict("helicopterhud")
		RequestStreamedTextureDict("pichot_content2")
	end

	self.Base = self.Base or {}
	self.Menu = tbl.Menu or {}

	self.Base.Desc = tbl.Desc
	self.Base.Callback = callback

	self.Base.Count = #self.Menu
	self.IsVisible = true

	if not update and tbl.Ped then
		PlayAmbientSpeech1(tbl.Ped, "GENERIC_HI", "SPEECH_PARAMS_STANDARD")
		self:CreateCam(tbl.Ped)
	end

	if update then return end

	Citizen.CreateThread(function()
		while Dialogue.IsVisible do
			Citizen.Wait(0)

			Dialogue:DrawTick()
		end
	end)

	Citizen.CreateThread(function()
		while Dialogue.IsVisible do
			Citizen.Wait(0)

			Dialogue:KeyTick()
		end
	end)
end

function CreateDialogue(a, cb, update)
	return Dialogue:CreateDialogue(a, cb, update)
end