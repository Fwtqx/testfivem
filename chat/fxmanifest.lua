description 'chat management stuff'

ui_page 'dist/ui.html'
ui_page_preload 'yes'

client_scripts {
	"@pichot_core/cl_orcus.lua",
  'cl_chat.lua', 
  '@pichot_core/cl_core.lua'
}

server_script 'sv_chat.lua'

files {
  'dist/ui.html',
  'dist/index.css',
  'html/vendor/*.css',
  'html/vendor/fonts/*.woff2',
}

fx_version 'adamant'
games { 'rdr3', 'gta5' }
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
