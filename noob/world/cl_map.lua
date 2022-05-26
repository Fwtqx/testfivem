local removeIpls = {
	"FIBlobbyfake",
	"hei_bi_hw1_13_door",
	"sp1_10_fake_interior",
	"sp1_10_fake_interior_lod",
	"id2_14_during_door",
	"id2_14_during1",
	"id2_14_during2",
	"id2_14_on_fire",
	"id2_14_post_no_int",
	"id2_14_pre_no_int",
	"id2_14_during_door",
	"Coroner_Int_off",
	"bh1_16_refurb",
	"jewel2fake",
	"imp_dt1_02_modgarage",
	"imp_dt1_02_cargarage_a",
	"imp_dt1_02_cargarage_b",
	"imp_dt1_02_cargarage_c",
	"imp_dt1_11_modgarage",
	--"imp_dt1_11_cargarage_a",
	"imp_dt1_11_cargarage_b",
	"imp_dt1_11_cargarage_c",
	"imp_sm_13_modgarage",
	"imp_sm_13_cargarage_a",
	"imp_sm_13_cargarage_b",
	"imp_sm_13_cargarage_c",
	"imp_sm_15_modgarage",
	"imp_sm_15_cargarage_a",
	"imp_sm_15_cargarage_b",
	"imp_sm_15_cargarage_c"
}

local permaIpls = {
	"hei_dlc_windows_casino",
	"vw_casino_garage",
	"hei_dlc_casino_door",
	"vw_casino_penthouse",
	"vw_casino_carpark",
	"imp_dt1_11_cargarage_a",
	--"imp_dt1_11_cargarage_b",
	--"imp_dt1_11_cargarage_c",
	--"ex_dt1_02_office_01a",
	"rc12b_default",
	--ex_dt1_02_office_01b",
	--"ex_dt1_02_office_01c",
	--"ex_dt1_02_office_02a",
	--"ex_dt1_02_office_02b", 

	"ex_dt1_02_office_02c",
	--"ex_dt1_02_office_03a",
	--"ex_dt1_02_office_03b",
	--"ex_dt1_02_office_03c",
	"ex_dt1_11_office_03b",
	--"ex_dt1_11_office_01b",
	--"ex_dt1_11_office_01c",
	--"ex_dt1_11_office_02a",
	--"ex_dt1_11_office_02b",
	--"ex_dt1_11_office_02c",
	--"ex_dt1_11_office_03a",
	--"ex_dt1_11_office_03b",
	--"ex_dt1_11_office_03c",
	--"ex_sm_13_office_01a",
	"ex_sm_13_office_01a",
	--"ex_sm_13_office_01c",
	--"ex_sm_13_office_02a",
	--"ex_sm_13_office_02b",
	--"ex_sm_13_office_02c",
	--ex_sm_13_office_03a",
	--"ex_sm_13_office_03b",
	--"ex_sm_13_office_03c",
	--"ex_sm_15_office_01a",
	--"ex_sm_15_office_01b",
	--"ex_sm_15_office_01c",
	--"ex_sm_15_office_02a",
	"ex_sm_15_office_02b",
	--"ex_sm_15_office_02c",
	--"ex_sm_15_office_03a",
	--"ex_sm_15_office_03b",
	--ex_sm_15_office_03c",
	"imp_impexp_interior_placement",
	"imp_impexp_interior_placement_interior_0_impexp_int_01_milo_",
	"imp_impexp_interior_placement_interior_3_impexp_int_02_milo_",
	"imp_impexp_interior_placement_interior_1_impexp_intwaremed_milo_",
	"imp_impexp_interior_placement_interior_2_imptexp_mod_int_01_milo_",
	"apa_v_inttest",
	--apa_v_mp_h_01_a",
	--"apa_v_mp_h_01_b",
	--"apa_v_mp_h_01_c",
	--"apa_v_mp_h_02_a",
	--apa_v_mp_h_02_b",
	--apa_v_mp_h_02_c",
	"apa_v_mp_h_03_a",
	--"apa_v_mp_h_03_b",
	--"apa_v_mp_h_03_c",
	--apa_v_mp_h_04_a",
	--"apa_v_mp_h_04_b",
	--"apa_v_mp_h_04_c",
	--apa_v_mp_h_05_a",
	"apa_v_mp_h_05_b",
	--apa_v_mp_h_05_c",
	--"apa_v_mp_h_06_a",
	--"apa_v_mp_h_06_b",
	"apa_v_mp_h_06_c",
	--"apa_v_mp_h_07_a",
	--"apa_v_mp_h_07_b",
	--"apa_v_mp_h_07_c",
	--"apa_v_mp_h_08_a",
	--"apa_v_mp_h_08_b",
	--"apa_v_mp_h_08_c",
	"hei_mpheist_int_placement",
	"hei_mpheist_int_placement_interior_0_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_1_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_2_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_3_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_4_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_5_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_6_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_7_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_8_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_9_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_10_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_11_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_12_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_13_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_14_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_15_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_16_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_17_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_18_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_19_dlc_apart_high_new_milo_",
	"hei_mpheist_int_placement_interior_20_dlc_apart_high2_new_milo_",
	"hei_mpheist_int_placement_interior_21_dlc_apart_high2_new_milo_",
	"hei_mpheist_int_placement_interior_22_dlc_apart_high2_new_milo_",
	"hei_mpheist_int_placement_interior_23_dlc_apart_high2_new_milo_",
	"hei_mpheist_int_placement_interior_24_dlc_apart_high2_new_milo_",
	"hei_mpheist_int_placement_interior_25_dlc_apart_high2_new_milo_",
	"fiblobby",
	"fiblobby_lod",
	"fbi_colplg",
	"fbi_repair",
	"fbi_repair_lod",
	"v_tunnel_hole",
	"TrevorsTrailerTidy",
	"trevorstrailer",
	"facelobby",
	"farm",
	"farm_props",
	"farmint",
	"farm_lod",
	"des_farmhouse",
	"v_rockclub",
	"bkr_bi_hw1_13_int",
	--"v_carshowroom",
	"shutter_open",
	"smboat",
	"railing_start",
	"sp1_10_real_interior",
	"sp1_10_real_interior_lod",
	"id2_14_during1",
	"Coroner_Int_on",
	"shr_int",
	"post_hiest_unload",
	"FINBANK",
	"imp_impexp_interior_placement_interior_3_impexp_int_02_milo_",
	"imp_impexp_interior_placement_interior_2_imptexp_mod_int_01_milo_",
	"imp_impexp_interior_placement_interior_1_impexp_intwaremed_milo_",
	"imp_impexp_interior_placement_interior_0_impexp_int_01_milo_",
	"imp_impexp_interior_placement",
	"imp_impexp_interior_01",
	"imp_impexp_interior_02",
	"imp_impexp_intwaremed",
	"gr_grdlc_interior_placement",
	"gr_grdlc_interior_placement_interior_0_grdlc_int_01_milo_",
	"gr_grdlc_interior_placement_interior_1_grdlc_int_02_milo_",
	"gr_entrance_placement",
	"gr_entrance_placement_strm",
	"gr_case9_bunkerclosed",
	"imp_imptexp_mod_int_01",
	"refit_unload",
	"gr_grdlc_interior_placement_interior_0_grdlc_int_01_milo_",
	"gr_grdlc_interior_placement_interior_1_grdlc_int_02_milo_",
	"gr_heist_yacht2_lounge",
	"gr_heist_yacht2_enginrm",
	"gr_heist_yacht2_bridge",
	"gr_heist_yacht2_bedrm",
	"gr_heist_yacht2_bar",
	"CS3_05_water_grp1",
	"CS3_05_water_grp2",
	"canyonriver01",
	"railing_start",
	"CS1_02_cf_onmission1",
	"CS1_02_cf_onmission2",
	"CS1_02_cf_onmission3",
	"CS1_02_cf_onmission4",
	"gr_heist_yacht2",
	"gr_heist_yacht2_bar",
	"gr_heist_yacht2_bedrm",
	"gr_heist_yacht2_bridge",
	"gr_heist_yacht2_enginrm",
	"gr_heist_yacht2_lounge",
	"ba_int_placement_ba",
	"ba_int_placement_ba_interior_0_dlc_int_01_ba_milo_",
	"ba_int_placement_ba_interior_1_dlc_int_02_ba_milo_",
	--"ba_int_placement_ba_interior_2_dlc_int_03_ba_milo_",
}

local IsControlJustPressed = IsControlJustPressed
local GetIsTaskActive = GetIsTaskActive
local PlayerPedId = PlayerPedId

Citizen.CreateThread(function ()
	local b = false

	local VehicleInteractions = {
		{ --[[bone = "door_dside_f",]] door = 0, seat = -1 }, -- Door left front (driver)
		{ --[[bone = "door_pside_f",]] door = 1, seat =  0 }, -- Door right front
		{ --[[bone = "door_dside_r",]] door = 2, seat = 1 }, -- Door left back
		{ --[[bone = "door_pside_r",]] door = 3, seat = 2 }, -- Door right back
	}

	while true do
		if IsControlJustPressed(0, 23) then
			local ped = PlayerPedId()
			if GetIsTaskActive(ped, 160) then
				local nearest
				local dist = math.huge
				local ppos = GetEntityCoords(ped)
				local vehicle = GetVehiclePedIsTryingToEnter(ped)

				if DoesEntityExist(vehicle) and GetSeatPedIsTryingToEnter(ped) == -1 then
					local bone
					local len
					local coords

					for i, v in ipairs(VehicleInteractions) do
						coords = false

						-- Use bone coords
						if v.bone then
							bone = GetEntityBoneIndexByName(vehicle, v.bone)

							if bone ~= -1 then
								coords = GetWorldPositionOfEntityBone(vehicle, bone)
							end

						-- Use entry position
						elseif v.door and DoesVehicleHaveDoor(vehicle, v.door) then
							coords = GetEntryPositionOfDoor(vehicle, v.door)
						end

						-- Is interaction is nearest
						if coords then
							len = GetDistanceBetweenCoords(vector3(ppos.x, ppos.y, ppos.z), coords)
							 -- Ignore out of interaction range
							if v.range and len > v.range then
							elseif len < dist then
								dist = len
								nearest = i
							end
						end
					end
				end

				if nearest then
					nearest = VehicleInteractions[nearest]

					if not nearest.seat then
						local door = nearest.door
						if door then -- open the door specified
							ClearPedTasks(ped)
							ClearPedTasksImmediately(ped)

							if GetVehicleDoorAngleRatio(vehicle, door) > 0.0 then
								SetVehicleDoorShut(vehicle, door, false)
								PlayVehicleDoorCloseSound(vehicle, 1)
							else
								SetVehicleDoorOpen(vehicle, door, false, false)
								PlayVehicleDoorOpenSound(vehicle, 0)
							end
						end
					else
						local seat = nearest.seat
						local occupant = GetPedInVehicleSeat(vehicle, seat)

						if DoesEntityExist(occupant) then
							local rel1 = GetRelationshipBetweenPeds(ped, occupant)
							if seat ~= -1 then ClearPedTasks(ped) end
							if rel1 >= 3 and rel1 <= 5 or rel1 == 255 then
							end
						else
							ClearPedTasks(ped)
							CanShuffleSeat(vehicle, false)
							TaskEnterVehicle(ped, vehicle, -1, seat, 1.0, 1, 0)
						end
					end
				end
			end
		elseif (IsControlJustPressed(1, 44) or IsControlJustPressed(1, 33) or IsControlJustPressed(1, 35)) and GetIsTaskActive(PlayerPedId(), 160) then
			ClearPedTasks(PlayerPedId())
		end

		Citizen.Wait(0)
	end
end)

--USELESS
local customColorInt = {
	[260353] = {
		"limbo",
		"GtaMloRoom001",
		"set_floor_decal_3",
		"set_floor_1",
		"set_tint_shell",
		"set_office_modern",
		"set_bedroom_modern",
		"set_modarea",
		--"set_office_traditional",
		--"set_bedroom_traditional",
		--"set_bedroom_blinds_open",
		"set_bedroom_tint",
		--"set_crane_tint",
		"set_lighting_wall_tint04",
		"set_lighting_hangar_c",
		--"set_lighting_tint_props",
		"set_lighting_wall_neutral",
	},
	[123906] = {
		"Int02_Facility_lobby",
		"Int02_base_recep",
		"Int02_base_hanger",
		"Int02_base_data",
		"Int02_Facility_entry",
		"Int02_base_cor1",
		"Int02_Facility_heistplan",
		"Int02_Facility_CANNON",
		"Int02_base_bedrom",
		"Int02_base_Armoury",
		"Int02_base_security",
		"set_int_02_shell",
		"set_int_02_decal_03",
		"set_int_02_cannon",
		"set_int_02_security",
		"set_int_02_lounge3",
		"set_int_02_sleep3",
		"set_int_02_crewemblem",
	},
	[269313] = {
		"Int02_Facility_lobby",
		"Int02_base_recep",
		"Int02_base_hanger",
		"Int02_base_data",
		"Int02_Facility_entry",
		"Int02_base_cor1",
		"Int02_Facility_heistplan",
		"Int02_Facility_CANNON",
		"Int02_base_bedrom",
		"Int02_base_Armoury",
		"Int02_base_security",
		"set_int_02_shell",
		"set_int_02_decal_03",
		"set_int_02_cannon",
		"set_int_02_security",
		"set_int_02_lounge3",
		"set_int_02_sleep3",
		"set_int_02_crewemblem",
	},
	[246529] = {
		"mural_06",
		"walls_01",
		"lower_walls_default",
		"furnishings_02",
		"decorative_02",
		"decorative_01",
		"no_mod_booth",
		"gun_locker",
		"cash_medium",
		"meth_medium",
		"coke_small",
		"weed_small",
	},
	[121090] = {
		"Int_02_Room1",
	},
	[120834] = {
		"Int_03_Room1",
	},
}

local normalInt = {
	[246273] = {
		"mural_06",
		"walls_01",
		"lower_walls_default",
		"furnishings_01",
		"decorative_02",
		"mod_booth",
		"gun_locker",
		"cash_medium",
		"meth_medium",
		"coke_small",
		"weed_small",
	},
	[247809] = {
		"counterfeit_security",
		"counterfeit_upgrade_equip_no_prod",
		"dryera_off",
		"dryerb_off",
		"dryerc_off",
		"dryerd_off",
		"money_cutter",
		"special_chairs",
		"counterfeit_cashpile10d",
	},
	[247553] = {
	--	"security_high",
	--	"equipment_basic",
	},
	[247297] = {
	--	"weed_production", "weed_set_up"
	},
	[247041] = {
	--	"meth_lab_upgrade",
	--	"meth_lab_production",
	--	"meth_lab_security_high",
	--	"meth_lab_setup",
	},
	[237569] = {
		"cash_set_05",
		"office_chairs",
	},
	[241153] = {
		--[["cash_set_12",
		"office_chairs",
		"swag_drugbags2",
		"swag_electronic",
		"swag_guns",
		"swag_drugstatue",
		"swag_art",
		"swag_med",
		"swag_gems",]]--			
		"cash_set_05",
		"office_chairs",
	},
	[244225] = {
		"cash_set_05",
		"office_chairs",
	},
	[238593] = {
		"cash_set_05",
		"office_chairs",
	},
	[252673] = { -- garage
		"branded_style_set",
		"car_floor_hatch",
	},
	[258561] = {
		"bunker_factory",
		"bunker_storage",
		"bunker_bigbit",
		"bunker_tunnels",
		"bunker_shooter",
		"bunker_ModRoom",
		--"gun_range_blocker_set",
		"bunker_style_c",
		--"gun_wall_blocker",
		--"gun_range_lights",
		--"Gun_schematic_set",
		"upgrade_bunker_set",
		"security_upgrade",
		"Office_Upgrade_set",
		"gun_locker_upgrade",
	},
	[246785] = {
		"office",
		"interior_upgrade",
		"equipment_upgrade",
		"production",
		"security_high",
		"set_up",
		"clutter",
	},
	[253441] = {
		"mainRoom001",
		"limbo",
		"garage_decor_04",
		"lighting_option08",
		"numbering_style09_n1",
		"numbering_style06_n2",
		"numbering_style07_n3",
	},
	[7170] = {
		"csr_beforeMission",
		"csr_inMission",
	},
	[206849] = {
		"franklin_settled",
		"bong_and_wine",
		"locked",
	},
	[171777] = {
		"swap_clean_apt",
		"layer_debra_pic",
		"swap_sofa_A",
		"layer_whiskey",
	},
	[166657] = {
		"V_Michael_bed_tidy",
		"V_Michael_M_items",
		"V_Michael_L_Items",
	},
	[197889] = {
		"V_57_FranklinStuff"
	}
}

local toggleInt = {
	[271617] = {
		["Int01_ba_Worklamps"] = false,
		["Int01_ba_security_upgrade"] = true,
		["Int01_ba_equipment_setup"] = true,
		["Int01_ba_Style01"] = false,
		["Int01_ba_Style02"] = false,
		["Int01_ba_Style03"] = true,
		["Int01_ba_style01_podium"] = false,
		["Int01_ba_style02_podium"] = false,
		["Int01_ba_style03_podium"] = true,
		["int01_ba_lights_screen"] = true,
		["Int01_ba_Screen"] = true,
		["Int01_ba_bar_content"] = true,
		["Int01_ba_booze_01"] = false,
		["Int01_ba_booze_02"] = false,
		["Int01_ba_booze_03"] = true,
		["Int01_ba_dj01"] = false,
		["Int01_ba_dj02"] = false,
		["Int01_ba_dj03"] = false,
		["Int01_ba_dj04"] = true,
		["DJ_01_Lights_01"] = false,
		["DJ_01_Lights_02"] = false,
		["DJ_01_Lights_03"] = false,
		["DJ_01_Lights_04"] = false,
		["DJ_02_Lights_01"] = true,
		["DJ_02_Lights_02"] = true,
		["DJ_02_Lights_03"] = true,
		["DJ_02_Lights_04"] = true,
		["DJ_03_Lights_01"] = false,
		["DJ_03_Lights_02"] = false,
		["DJ_03_Lights_03"] = false,
		["DJ_03_Lights_04"] = false,
		["DJ_04_Lights_01"] = false,
		["DJ_04_Lights_02"] = false,
		["DJ_04_Lights_03"] = false,
		["DJ_04_Lights_04"] = false,
		["light_rigs_off"] = true,
		["Int01_ba_lightgrid_01"] = true,
		["Int01_ba_Clutter"] = false,
		["Int01_ba_equipment_upgrade"] = false,
		["Int01_ba_clubname_01"] = false,
		["Int01_ba_clubname_02"] = false,
		["Int01_ba_clubname_03"] = false,
		["Int01_ba_clubname_04"] = false,
		["Int01_ba_clubname_05"] = true,
		["Int01_ba_clubname_06"] = false,
		["Int01_ba_clubname_07"] = false,
		["Int01_ba_clubname_08"] = false,
		["Int01_ba_clubname_09"] = false,
		["Int01_ba_dry_ice"] = false,
		["Int01_ba_deliverytruck"] = true,
		["Int01_ba_trophy04"] = false,
		["Int01_ba_trophy05"] = false,
		["Int01_ba_trophy07"] = false,
		["Int01_ba_trophy09"] = false,
		["Int01_ba_trophy08"] = true,
		["Int01_ba_trophy11"] = false,
		["Int01_ba_trophy10"] = false,
		["Int01_ba_trophy03"] = false,
		["Int01_ba_trophy01"] = false,
		["Int01_ba_trophy02"] = false,
		["Int01_ba_trad_lights"] = true,
		["Int02_ba_floor01"] = true,
		["Int02_ba_floor02"] = true,
		["Int02_ba_floor03"] = true,
		["Int02_ba_floor04"] = true,
		["Int02_ba_floor05"] = true,
	},
	[54454554] = {
		["x17DLC_int_lab_Grg_rm"] = true,
		["x17DLC_int_lab_rm"] = true,
		["x17DLC_int_lab_hall01_rm"] = true,
		["x17DLC_int_lab_hall02_rm"] = true,
		["x17DLC_int_lab_hall03_rm"] = true,
		["x17DLC_int_lab_hall04_rm"] = true,
		["x17DLC_int_lab_Strs01_rm"] = true,
		["x17DLC_int_lab_Strs02_rm"] = true,
	},
	[254465] = {
		["Floor_vinyl_01"] = false,
		["Floor_vinyl_02"] = false,
		["Floor_vinyl_03"] = false,
		["Floor_vinyl_04"] = false,
		["Floor_vinyl_05"] = true,
		["Floor_vinyl_06"] = false,
		["Floor_vinyl_07"] = false,
		["Floor_vinyl_08"] = false,
		["Garage_Decor_01"] = false,
		["Garage_Decor_02"] = false,
		["Garage_Decor_03"] = false,
		["Garage_Decor_04"] = true,
		["Lighting_Option01"] = false,
		["Lighting_Option02"] = false,
		["Lighting_Option03"] = false,
		["Lighting_Option04"] = false,
		["Lighting_Option05"] = false,
		["Lighting_Option06"] = false,
		["Lighting_Option07"] = false,
		["Lighting_Option08"] = true,
		["Lighting_Option09"] = false,
		["Lighting_Option10"] = false,
		["Lighting_Option11"] = false,
		["Lighting_Option12"] = false,
		["Lighting_Option13"] = false,
		["Lighting_Option14"] = false,
		["Lighting_Option15"] = false,
		["Lighting_Option16"] = false,
		["Lighting_Option17"] = false,
		["Lighting_Option18"] = false,
		["Lighting_Option19"] = false,
		["Lighting_Option20"] = false,
		["Numbering_Style01"] = true,
		["Numbering_Style02"] = false,
		["Numbering_Style03"] = false,
		["Numbering_Style04"] = false,
		["Numbering_Style05"] = false,
		["Numbering_Style06"] = false,
		["Numbering_Style07"] = false,
		["Numbering_Style08"] = false,
		["Numbering_Style09"] = false,
		["Numbering_Style10"] = false,
		["Numbering_Style11"] = false,
		["Numbering_Style12"] = false,
		["Numbering_Style13"] = false,
		["Numbering_Style14"] = false,
		["Numbering_Style15"] = false,
		["Numbering_Style16"] = false,
		["Numbering_Style17"] = false,
		["Numbering_Style18"] = false,
		["Numbering_Style19"] = false,
		["Numbering_Style20"] = false
	},
	[274689] = {
		["set_pent_tint_shell"] = 3,
		["set_pent_media_bar_open"] = 3,
		["set_pent_spa_bar_open"] = 3,
		["set_pent_dealer"] = false,
		["set_pent_nodealer"] = 3,
		["set_pent_media_bar_closed"] = false,
		["set_pent_spa_bar_closed"] = false,
		["set_pent_pattern_01"] = false,
		["set_pent_pattern_02"] = false,
		["set_pent_pattern_03"] = 3,
		["set_pent_pattern_04"] = false,
		["set_pent_pattern_05"] = false,
		["set_pent_pattern_06"] = false,
		["set_pent_pattern_07"] = false,
		["set_pent_pattern_08"] = false,
		["set_pent_pattern_09"] = false,
		["set_pent_arcade_modern"] = 3,
		["set_pent_arcade_retro"] = false,
		["set_pent_clutter_03"] = false,
		["set_pent_clutter_02"] = false,
		["set_pent_clutter_01"] = 3,
		["set_pent_lounge_blocker"] = false,
		["set_pent_guest_blocker"] = false,
		["set_pent_office_blocker"] = false,
		["set_pent_cine_blocker"] = false,
		["set_pent_spa_blocker"] = false,
		["set_pent_bar_blocker"] = false,
		["set_pent_bar_party_after"] = false,
		["set_pent_bar_clutter"] = 3,
		["set_pent_bar_party_2"] = false,
		["set_pent_bar_light_01"] = false,
		["set_pent_bar_light_0"] = false,
		["set_pent_bar_light_02"] = 3,
		["set_pent_bar_party_0"] = 3,
		["set_pent_bar_party_1"] = false,
	}
}

local themeInt = {
	[260353] = 2,
	[123906] = 1,
	[246529] = 1,
	[269313] = 1,
	[121346] = 2,
	[121090] = 5,
	[120834] = 1,
	[274689] = 2,
}

local function timeCheck()
	OnEnterMp()

	for _,v in pairs(removeIpls) do
		RemoveIpl(v)
	end

	for _,v in pairs(permaIpls) do
		RequestIpl(v)
	end

	for k,v in pairs(normalInt) do
		SetInteriorActive(k, true)
		for _,l in pairs(v) do
			ActivateInteriorEntitySet(k, l)
		end
		RefreshInterior(k)
	end

	for k,v in pairs(toggleInt) do
		SetInteriorActive(k, true)
		for n,b in pairs(v) do
			if b then
				ActivateInteriorEntitySet(k, n)

				if type(b) == "number" then
					print(n)
					SetInteriorEntitySetColor(k, n, b)
				end
			else
				DeactivateInteriorEntitySet(k, n)
			end
		end
		RefreshInterior(k)
	end

	for k,v in pairs(customColorInt) do
		SetInteriorActive(k, true)
		for _,l in pairs(v) do
			ActivateInteriorEntitySet(k, l)
			SetInteriorEntitySetColor(k, l, themeInt[k])
		end
		RefreshInterior(k)
	end

	print("interior inits")
end

AddEventHandler("GamemodeInitialize", timeCheck)