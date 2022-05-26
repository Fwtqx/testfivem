fx_version 'adamant'
game 'common'

ui_page 'ui/index.html'
ui_page_preload 'yes'

client_script {
	'@pichot_core/sh_core.lua',
	'@pichot_core/cl_core.lua',
	'@pichot_core/cl_players.lua',
	'@pichot_core/cl_vehicles.lua',
	"@pichot_core/cl_orcus.lua",
	"client.lua",
}

files {
	'ui/*',
	'ui/**/*'
}
