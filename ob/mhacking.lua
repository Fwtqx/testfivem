local mhacking = {}
local mhackingCallback = {}
local seqRemaingingTime = 0
local hasSurrender
local seqSwitch

function mhacking:Show()
	SendNUIMessage({ hack = true, show = true })
	SetNuiFocusForPage(true)
end

function mhacking:Hide()
	SendNUIMessage({ hack = true, show = false })
	RemoveNuiFocusForPage()
end

function mhacking:Start(solutionlength, duration, callback)
	mhackingCallback = callback
	SendNUIMessage({
		hack = true,
		s = solutionlength,
		d = duration,
		start = true
	})
end

-- not used
function mhacking:SetMessage(msg)
	SendNUIMessage({ hack = true, displayMsg = msg })
end

RegisterNUICallback('callback', function(data, cb)
	mhackingCallback(data.success, data.remainingtime, data.surrend)
	cb('ok')
end)

local function mhackingSeqCallback(success, remainingtime, boolSurrender)
	seqSwitch = success
	seqRemaingingTime = math.floor(remainingtime / 1000.0 + 0.5)
	hasSurrender = boolSurrender
	print(hasSurrender)
end

function mhacking:SeqStart(solutionlength, duration, callback)
	local itrTbl, solTblLen, durTblLen, success = {}, 0, 0, {}
	for _ in ipairs(solutionlength) do solTblLen = solTblLen + 1 end
	for _ in ipairs(duration) do durTblLen = durTblLen + 1 end

	itrTbl = duration
	if solTblLen > durTblLen then itrTbl = solutionlength end

	mhacking:Show()
	for idx in ipairs(itrTbl) do
		mhacking:Start(solutionlength[idx], duration[idx], mhackingSeqCallback)
		while seqSwitch == nil do
			Citizen.Wait(5)
		end

		if seqSwitch then
			success[#success + 1] = true
		else
			break
		end
		seqSwitch = nil
	end

	--callback(seqSwitch, seqRemaingingTime, success, hasSurrender)
	mhacking:Hide()
	seqRemaingingTime = 0
	seqSwitch = nil
	mhackingCallback = {}
	callback(success, hasSurrender)
	hasSurrender = nil
end

AddEventHandler("pichot:HackingMinigame", function(_id, _tblData)
	if _id == 1 then
		mhacking:Show()
		mhacking:SeqStart(table.unpack(_tblData))
	elseif _id == 2 then
		mhacking:Hide()
	end
end)
