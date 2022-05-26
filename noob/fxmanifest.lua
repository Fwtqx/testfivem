resource_manifest_version "05cfa83c-a124-4cfa-a768-c24a5811d8f9"
server_script "@mysql-async/lib/MySQL.lua"

client_scripts {
	"@pichot_core/cl_orcus.lua",
	"@pichot_core/sh_core.lua",
	"@pichot_core/cl_core.lua",
	"@pichot_core/cl_players.lua";
	"@pichot_core/cl_pmenu.lua",
	"@pichot_core/cl_vehicles.lua",
	"@pichot_scaleform/cl_scale.lua",
	"@gtalife/cl_player.lua",
	"jobs/cl_lscustom.lua",
	"world/cl_tow.lua",
	"world/cl_atm.lua",
	"world/cl_map.lua",
	"world/cl_dui.lua",
	"cl_misc.lua",
	"cl_siren.js"
}

server_scripts {
	"@pichot_core/sh_core.lua",
	"@pichot_core/sv_core.lua",
	"sv_stats.lua"
}

server_export "SavePlayerStats"

fx_version 'cerulean'
game 'common'