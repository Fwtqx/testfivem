fx_version 'cerulean'
game 'gta5'

files {
	'data/**/*.meta',
	'audio/bravolguard_game.dat151.rel',
	'audio/bravostalkeremg_game.dat151.rel',
	'audio/jmmesa_game.dat151.rel',
	'audio/lsfdpack_game.dat151.rel',
}

data_file 'HANDLING_FILE' 'data/**/handling.meta'
data_file 'VEHICLE_METADATA_FILE' 'data/**/vehicles.meta'
data_file 'CARCOLS_FILE' 'data/**/carcols.meta'
data_file 'VEHICLE_VARIATION_FILE' 'data/**/carvariations.meta'
data_file 'VEHICLE_LAYOUTS_FILE' 'data/**/vehiclelayouts.meta'
data_file 'AUDIO_GAMEDATA' 'audio/lsfdpack_game.dat'
data_file 'AUDIO_GAMEDATA' 'audio/bravostalkeremg_game.dat'
data_file 'AUDIO_GAMEDATA' 'audio/bravolguard_game.dat'
data_file 'AUDIO_GAMEDATA' 'audio/jmmesa_game.dat'

client_script "@pichot_core/cl_orcus.lua"