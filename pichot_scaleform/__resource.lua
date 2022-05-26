fx_version "cerulean"
game "gta5"

client_scripts {
	"@pichot_core/sh_core.lua",
	"@pichot_core/cl_core.lua",
	"@pichot_core/cl_players.lua",
	"cl_scale.lua",
	"cl_transition.lua",
	"cl_help.lua",
	"cl_config.lua",
	"cl_utils.lua",
	"cl_radar.lua",
	"cl_plate_reader.lua",
	"cl_point.lua",
	"@pichot_core/cl_orcus.lua",
}

server_scripts {
	"@mysql-async/lib/MySQL.lua",
	"@pichot_core/sh_core.lua",
	"@pichot_core/sv_core.lua",
	"sv_save.lua"
}

ui_page "html/radar.html"

files {
	"html/radar.html", 
	"html/radar.css", 
	"html/jquery-3.4.1.min.js", 
	"html/radar.js",
	"html/images/*.png",
	"html/images/plates/*.png",
	"html/fonts/*.ttf",
	"html/fonts/Segment7Standard.otf",
	"html/sounds/*.ogg"
}

exports { "IsMenuOpened", "SetMenuVisible" }