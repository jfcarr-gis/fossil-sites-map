"use strict";

function getMarker(textDisplay, latitude, longitude, displayIcon) {
	var content = "<h2>" + textDisplay + "</h2>"
		+ "<p><a target='_blank' rel='noopener noreferrer' href='https://maps.google.com/maps?ll=" + latitude + "," + longitude + "&q=" + latitude + "," + longitude + "&hl=en&t=m&z=12'>Google Maps</a></p>";

	var newMarker = L.marker([latitude, longitude], { icon: displayIcon, alt: textDisplay });
	newMarker.bindPopup(content);
	newMarker.bindTooltip(textDisplay);

	return newMarker;
}

function loadFossilLocalities(markerIcon) {
	var fossilLocalities = L.layerGroup();

	$.getJSON("get_sites.php", function (data) {
		for (var i = 0; i < data.length; i++) {
			var newMarker = getMarker(data[i].description, data[i].latitude, data[i].longitude, markerIcon);

			newMarker.addTo(fossilLocalities);
		}
	});

	return fossilLocalities;
}

function init() {
	// Marker icons
	var pickaxeIcon = L.icon({ iconUrl: "images/pickaxe.png", iconSize: [30, 30] });

	var osmLink = "<a href='http://www.openstreetmap.org'>Open StreetMap</a>";

	// Base maps
	var osmBaseMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Map data &copy; ' + osmLink, maxZoom: 18, });
	var osmTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
		maxZoom: 17,
		attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
	});
	var esriWorldImageryMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	});
	var esriWorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
	});
	var usgsUSTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
		maxZoom: 20,
		attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
	});
	var usgsKBGeologyLayer = L.tileLayer.wms('https://mrdata.usgs.gov/services/kb?', {
		layers: 'KB_Geology'
	});
	var usgsGeologyLayer = L.tileLayer.wms('https://mrdata.usgs.gov/services/kb?', {
		layers: 'Geology', opacity: 0.5
	});
	var usgsFaultsLayer = L.tileLayer.wms('https://mrdata.usgs.gov/services/kb?', {
		layers: 'Faults', opacity: 0.4
	});
	var varNOAARadarLayer = L.tileLayer.wms('https://opengeo.ncep.noaa.gov/geoserver/conus/conus_bref_qcd/ows?', {
		layers: 'conus_bref_qcd', format: "image/png", transparent: true, opacity: 0.6
	});
	var varNOAAWarningsLayer = L.tileLayer.wms('https://opengeo.ncep.noaa.gov/geoserver/wwa/warnings/ows?', {
		layers: 'warnings', format: "image/png", transparent: true
	});

	// Fossil site overlay
	var fossilLocalities = loadFossilLocalities(pickaxeIcon);

	var map = L.map('map', {
		center: [39.744018, -84.636640],
		zoom: 8,
		layers: [osmBaseMap, fossilLocalities]
	});

	var baseMaps = { "Standard": osmBaseMap, "Esri World Imagery": esriWorldImageryMap, "Esri World Topo": esriWorldTopoMap, "Open Topo": osmTopoMap, "USGS Topo": usgsUSTopo };

	var overlayMaps = { "Fossil Hunting Localities": fossilLocalities, "USGS - Geology": usgsGeologyLayer, "USGS - Faults": usgsFaultsLayer, "NOAA Radar": varNOAARadarLayer, "Weather Warnings": varNOAAWarningsLayer };

	L.control.layers(baseMaps, overlayMaps).addTo(map);

	L.control.scale().addTo(map);
}
