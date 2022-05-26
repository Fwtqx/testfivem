local pages = {}
local disableFiring = false
local disableMovements = false
local keepInput = false
local threadCreated = false
local controlDisabled = {0, 1, 2, 3, 4, 5, 6, 18, 24, 25, 37, 68, 69, 70, 91, 92, 142, 182, 199, 200, 245, 257}

local function HasDisabledControls()
    return disableFiring or disableMovements or keepInput
end

local function GetPageIndex(resourceName)
    for k,v in pairs(pages) do
        if v.resourceName == resourceName then 
            return k 
        end
    end
    return -1
end

local function CreateThreadIfNeeded()
    if HasDisabledControls() and not threadCreated then
        threadCreated = true
        Citizen.CreateThread(function()
            local playerId = PlayerId()

            while HasDisabledControls() do
                Wait(0)

                if disableMovements then
                    for i = 30,37 do
                        DisableControlAction(0, i, true)
                    end
                end
                    
                if keepInput then
                    for _,v in pairs(controlDisabled) do
                        DisableControlAction(0, v, true)
                    end
                end
                
                if disableFiring then DisablePlayerFiring(playerId, true) end
            end
            threadCreated = false
        end)
    end
end

local function SetFocusForCurrentPage()
    if #pages > 0 then
        local currentPage = pages[#pages]
        currentPage.setFocus(currentPage.focus, currentPage.cursor)
        if currentPage.setKeepInput then currentPage.setKeepInput(currentPage.keepInput) end

        keepInput = currentPage.keepInput

        local shouldDisableFiring, shouldDisableMovements = false, false
        for _, page in pairs(pages) do
            shouldDisableFiring = shouldDisableFiring or page.disableFiring
            shouldDisableMovements = shouldDisableMovements or page.disableMovements
        end
        disableFiring, disableMovements = shouldDisableFiring, shouldDisableMovements
        CreateThreadIfNeeded()
    else
        keepInput = false
        disableFiring = false
        disableMovements = false
    end
end

function SetFocusForPage(resourceName, focus, cursor, options, setFocus, setKeepInput)
    local index = GetPageIndex(resourceName)
    if index == -1 then index = (#pages + 1) end
    
    pages[index] = {
        resourceName = resourceName,
        focus = focus,
        cursor = cursor,
        keepInput = options.keepInput,
        disableFiring = options.disableFiring,
        disableMovements = options.disableMovements,
        setKeepInput = setKeepInput,
        setFocus = setFocus
    }
    
    SetFocusForCurrentPage()
end
exports('SetFocusForPage', SetFocusForPage)

function RemoveFocusForPage(resourceName)
    local index = GetPageIndex(resourceName)
    if index > 0 then
        local removedPage = pages[index]
        removedPage.setFocus(false, false)
        if removedPage.setKeepInput then removedPage.setKeepInput(false) end

        table.remove(pages, index)
    end

    SetFocusForCurrentPage()
end
exports('RemoveFocusForPage', RemoveFocusForPage)

function IsInNuiKeepMode()
    return keepInput
end
exports('IsInNuiKeepMode', IsInNuiKeepMode)


AddEventHandler("onResourceStop", function(resource)
    RemoveFocusForPage(resource)
end)