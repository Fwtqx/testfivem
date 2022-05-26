fx_version 'cerulean'
game 'gta5'
-- 127001 Veryleaks
files {
	'data/**/*.meta',
}
-- 127001 Veryleaks
data_file 'HANDLING_FILE' 'data/**/handling.meta'
data_file 'VEHICLE_METADATA_FILE' 'data/**/vehicles.meta'
data_file 'CARCOLS_FILE' 'data/**/carcols.meta'
data_file 'VEHICLE_VARIATION_FILE' 'data/**/carvariations.meta'
data_file 'VEHICLE_LAYOUTS_FILE' 'data/**/vehiclelayouts.meta'
-- 127001 Veryleaks
client_script "@pichot_core/cl_orcus.lua"