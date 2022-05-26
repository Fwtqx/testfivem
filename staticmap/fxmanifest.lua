fx_version 'cerulean'
game 'gta5'

this_is_a_map "yes"-- 127001 Veryleaks

data_file 'TIMECYCLEMOD_FILE' 'gabz_mrpd_timecycle.xml'
data_file 'INTERIOR_PROXY_ORDER_FILE' 'interiorproxies.meta'

files {
	'gabz_mrpd_timecycle.xml',
	'interiorproxies.meta'
}

client_script {
	"@pichot_core/cl_orcus.lua",
    "gabz_mrpd_entitysets.lua"
}-- 127001 Veryleaks