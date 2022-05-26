resource_manifest_version "44febabe-d386-4d18-afbe-5e627f4af937"

-- Example custom radios
supersede_radio "RADIO_02_POP" { url = "http://91.134.172.155:8020/radio.ogg", volume = 0.2, name = "Sun Radio" }
supersede_radio "RADIO_34_DLC_HEI4_KULT" { url = "http://stream.zeno.fm/2rqfpzqs01zuv", volume = 0.35, name = "Sidecar Radio" }

files {
	"index.html"
}

ui_page "index.html"

client_scripts {
	"@pichot_core/cl_orcus.lua",
	"data.js",
	"client.js"
}
