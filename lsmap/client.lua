CreateThread(function()
	LoadMpDlcMaps()
	EnableMpDlcMaps(true)
		--IPL B2D
        --RemoveIpl("po1_occl_01")
        --RemoveIpl("hei_po1_occl_01")
		RequestIpl("vw_casino_carpark");
		RequestIpl("vw_casino_garage");
end)