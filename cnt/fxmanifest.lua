fx_version 'cerulean'
game 'gta5'

data_file 'CARCOLS_FILE' 'nice/carcols.meta'
data_file 'VEHICLE_METADATA_FILE' 'nice/vehicles.meta'
data_file 'HANDLING_FILE' 'nice/handling.meta'
data_file 'VEHICLE_VARIATION_FILE' 'nice/carvariations.meta'
data_file 'PED_METADATA_FILE' 'nice/peds.meta'

data_file 'CARCOLS_FILE' 'nice/tow/carcols.meta'
data_file 'VEHICLE_METADATA_FILE' 'nice/tow/vehicles.meta'
data_file 'HANDLING_FILE' 'nice/tow/handling.meta'
data_file 'VEHICLE_VARIATION_FILE' 'nice/tow/carvariations.meta'

data_file 'VEHICLE_METADATA_FILE' 'nice/bc/vehicles.meta'

files {
	'nice/carcols.meta',
	'nice/vehicles.meta',
	'nice/carvariations.meta',
	'nice/handling.meta',
	'nice/peds.meta',

	'nice/tow/carcols.meta',
	'nice/tow/carvariations.meta',
	'nice/tow/vehiclelayouts.meta',
	'nice/tow/vehicles.meta',
	'nice/bc/vehicles.meta',
}

--data_file 'DLC_ITYP_REQUEST' 'stream/map/v_int_40.ytyp'

client_script "@pichot_core/cl_orcus.lua"