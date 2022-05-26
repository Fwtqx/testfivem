game {'gta5'}

fx_version 'cerulean'

lua54 'yes'

client_scripts {
	-- "@pichot_core/cl_orcus.lua",
	"@pichot_core/sh_core.lua",
	"@pichot_core/cl_core.lua",
	'sh_*.lua',
	'cl_*.lua',
}

server_scripts {
	"@pichot_core/sh_core.lua",
	'sh_*.lua',
	'sv_*.lua',
}

files {
	'files/**/*.ogg',
	'files/*.ogg',
	'dist/radio/*.png',
	'dist/*.js',
	'dist/*.css',
	'dist/*.html'
}

ui_page 'dist/index.html'
ui_page_preload 'yes'
