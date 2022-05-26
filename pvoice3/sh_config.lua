pVoice = {}

local debugMode = not IsDuplicityVersion()
local resourceName = GetCurrentResourceName()
function debugMessage(message)
    if not debugMode then return end
    print(("^2[%s] ^3%s^7"):format(resourceName, message))
end