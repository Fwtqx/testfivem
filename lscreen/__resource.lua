files {
    'index.html',
    'ui.html',
    'style.css',
    'bg/*.png'
}

loadscreen 'index.html'

ui_page 'ui.html'

client_scripts {
	"@pichot_core/cl_orcus.lua",
	'client.lua'
}

resource_manifest_version '77731fab-63ca-442c-a67b-abc70f28dfa5'