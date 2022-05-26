resource_manifest_version '05cfa83c-a124-4cfa-a768-c24a5811d8f9'

fx_version 'cerulean'
--fx_version 'adamant'
game 'common'

ui_page 'ui/index.html'
ui_page_preload 'yes'

client_script {
	"@pichot_core/cl_orcus.lua",
	'@pichot_core/sh_core.lua',
	'@pichot_core/cl_core.lua',
	'@pichot_core/cl_players.lua',
	'@pichot_core/cl_pmenu.lua',
	'@pichot_scaleform/cl_scale.lua',
	'client.lua',
}

files {
	'ui/*',
	'ui/locales/**/*.json'
}

exports { "IsPhoneOpen" }