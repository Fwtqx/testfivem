resource_manifest_version "05cfa83c-a124-4cfa-a768-c24a5811d8f9"

client_scripts {
	"cl_orcus.lua",
	"sh_core.lua",
	"cl_core.lua",
	"cl_players.lua",
	"cl_vehicles.lua",
	"cl_pmenu.lua",
	"cl_dialogue.lua",
	"cl_bars.lua",
	"cl_nui.lua"
}

server_scripts {
	"@mysql-async/lib/MySQL.lua",
	"sv_core.lua"
}

fx_version "adamant"
game "common"