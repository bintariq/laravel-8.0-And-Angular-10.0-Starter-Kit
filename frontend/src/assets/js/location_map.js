var updated_sites;
function initializeOnLocation(zones, sites) {
	updated_sites = sites;
    /*
    |--------------------------------------------------------------------------
    | ZONES / LOCATION POLYGONES
    |--------------------------------------------------------------------------
    */

	/** Map Center **/ 
	var myLatLng = new google.maps.LatLng(51.4949, -0.12441);
	/** General Options **/ 
	var mapOptions = {
		zoom: 2,
		center: myLatLng,
		mapTypeId: google.maps.MapTypeId.RoadMap
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	for (var i = 0; i < zones.length; i++) {

		/**  Polygon Coordinates **/
		Coords = JSON.parse(zones[i].coordinates);
		var triangleCoords = [];
		for (var j = 0; j < Coords.length; j++) {
			triangleCoords.push(new google.maps.LatLng(+ Coords[j].lat, Coords[j].lng))
		}
		/**  Styling & Controls **/
		myPolygon = new google.maps.Polygon({
			paths: triangleCoords,
			draggable: false, 
			editable: false,
			strokeColor: '#5e72e4',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#5e72e4',
			fillOpacity: 0.35
		});

		myPolygon.setMap(map);

	}
		/*
		|--------------------------------------------------------------------------
		| SEARCH CALL
		|--------------------------------------------------------------------------
		*/
        const input = document.getElementById("pac-input");
        var options = {
            types : ['geocode']
        };
        var autocomplete = new google.maps.places.Autocomplete(input, options);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            newpolybounds = 350;
            console.log(place);
            console.log(place.formatted_address);
            console.log(place.name);
            console.log(place.geometry.location);
            console.log(place.geometry.location[0]);

            // Show the map to the current location selected
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
				console.log(place.geometry.viewport);
				console.log('view port');
				map.setZoom(11);


            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(11);
                // Why 17? Because it looks good.
            }
        });
    /*
    |--------------------------------------------------------------------------
    | END SEARCH CALL
    |--------------------------------------------------------------------------
    */

	/*
    |--------------------------------------------------------------------------
    | SITES / LOCATION MARKERS
    |--------------------------------------------------------------------------
    */

	var locations = [];
	var temp = '';
	for (var i = 0; i < sites.length; i++) {
		temp = [sites[i].zone_name, sites[i].latitude, sites[i].longitude, sites[i].id, sites[i].name];
		locations.push(temp);
	}
	var infowindow = new google.maps.InfoWindow();
	var icon = {
		url: "assets/img/icons/Iconn.png", // url
		scaledSize: new google.maps.Size(50, 50), // scaled size
		origin: new google.maps.Point(0,0), // origin
		anchor: new google.maps.Point(0, 0) // anchor
	};
	var marker, i;

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			draggable: true,
			map: map,
			icon: icon 
		});

		google.maps.event.addListener(marker, 'dragend', (function (marker, i) {
			return function () {
				console.log(marker + locations[i][3]);
				returnCoords(locations[i][3], marker.getPosition().lat(), marker.getPosition().lng());
			}
		})(marker, i));		
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				console.log(i);

				zoomLevel = map.getZoom();
				if (zoomLevel <= 11) {
					map.panTo(this.getPosition());
					smoothZoom(map, 13, map.getZoom()); /** call smoothZoom, parameters map, final zoomLevel, and starting zoom level **/ 
				} else {
					var center = new google.maps.LatLng(-37.6756817, 145.6690691);
					map.setCenter(center);
					smoothZoom(map, 13, map.getZoom()); /** call smoothZoom, parameters map, final zoomLevel, and starting zoom level **/
				}
				infowindow.setContent('Zone:' + locations[i][0] + 'Site:' + locations[i][4]);
				infowindow.open(map, marker);
			}
		})(marker, i));

		google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0] + '  ,' + locations[i][4]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}



/** The Smooth Zoom Function **/
function smoothZoom(map, max, cnt) {
	if (cnt >= max) {
		return;
	}
	else {
		z = google.maps.event.addListener(map, 'zoom_changed', function (event) {
			google.maps.event.removeListener(z);
			smoothZoom(map, max, cnt + 1);
		});
		setTimeout(function () { map.setZoom(cnt) }, 200); /**  200ms  **/
	}
}  


function returnCoords(location_id,lat,lng) {
	updated_sites.forEach(v => {
		if (v.id === location_id){
			v.latitude = lat;
			v.longitude = lng;
		};
	  });
	return updated_sites;
}