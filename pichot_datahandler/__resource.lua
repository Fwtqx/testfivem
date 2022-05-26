client_scripts {
	"@pichot_core/cl_orcus.lua",
	'shared.lua'
}
server_script 'shared.lua'

export "updateVar"
export "getVar"
export "updateVars"
export "updateInVar"

server_export "updateVar"
server_export "getVar"
server_export "updateVars"
server_export "updateInVar"

files { "properties.json", "companies.json" }