var map_initial_lat = 51.4949;
var map_initial_lng = -0.12441;
var polygone;
//var myPolygon;
in_coords = '';
function initialize(Coords,zone_info) {
	if(Coords != null){
		// Polygon Coordinates
		Coords = JSON.parse(Coords);
		var triangleCoords = [];
		for (var i = 0; i < Coords.length; i++) {
			triangleCoords.push(new google.maps.LatLng( + Coords[i].lat , Coords[i].lng))	
		}
	    in_coords = triangleCoords;
	}
	else{
		var triangleCoords = [
		new google.maps.LatLng(51.4949, -0.12441),
		new google.maps.LatLng(51.5116, -0.16759),
		new google.maps.LatLng(51.5111, -0.08949)
		];
		in_coords = triangleCoords;
	}

	/*
    |--------------------------------------------------------------------------
    | MAP LOCATION SETTER AND POLYGONE DRAW CALL
    |--------------------------------------------------------------------------
    */
		var geocoder =  new google.maps.Geocoder();
		var zoomLevelOfMap = '';
		var searchText = '';
		var polybounds = ''
		var country = zone_info.country_name;
		var state = zone_info.state_name;
		var city = zone_info.city_name;
		if(country != null && state == null && city == null){
			zoomLevelOfMap = 7;
			searchText = country;
			polybounds = 70050;
			console.log('sirf country hy');
		}
		else if(country != null && state != null && city == null){
			zoomLevelOfMap = 7;
			searchText = country + ',' + state;
			polybounds = 60050;
			console.log('country hy or state hy');
		}
		else if(country != null && state == null && city != null){
			zoomLevelOfMap = 12;
			searchText = country + ',' + city;
			polybounds = 50050;
			console.log('country hy or city hy');
		}
		else if(country != null && state != null && city != null){
			zoomLevelOfMap = 9;
			searchText = country + ',' + city;
			console.log('sirf city hy');
		}
		else if(Coords == null){
			zoomLevelOfMap = 6;
			searchText = 'London,UK';
			console.log('kuch nae hy');
		}
		console.log('ye hy searc h text')
		console.log(searchText)

		geocoder.geocode({'address':searchText}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				fetch('https://nominatim.openstreetmap.org/search.php?q=' + searchText + '&polygon_geojson=1&format=json')
				// Handle success
				.then(response => response.json())  // convert to json
				.then(json => {
					console.log(json)
					var coords_json = json;
				})    
				.catch(err => {var coords_json = '';console.log('Request Failed', err)});
				if(coords_json.geojson.type == 'Point'){
					console.log('Point')
				}
				if(coords_json.geojson.type == 'Polygon'){
					console.log('Polygon')
				}
				if(Coords == null){
					var triangle1 = google.maps.geometry.spherical.computeOffset(results[0].geometry.location, 15050, 0);
					var triangle2 = google.maps.geometry.spherical.computeOffset(results[0].geometry.location, 15050, 120);
					var triangle3 = google.maps.geometry.spherical.computeOffset(results[0].geometry.location, 15050, -120);
					var triangleCoords = [triangle1, triangle2, triangle3];
					in_coords = triangleCoords;
					console.log(in_coords);
				}
				map_initial_lat = results[0].geometry.location.lat();
				map_initial_lng = results[0].geometry.location.lng();
				var myLatLng = new google.maps.LatLng(map_initial_lat, map_initial_lng);
				var mapOptions = {
					zoom: 8,
					center: myLatLng,
					mapTypeId: google.maps.MapTypeId.RoadMap
					};
				var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
				myPolygon = new google.maps.Polygon({
					paths: in_coords,
					draggable: true, // turn off if it gets annoying
					editable: true,
					strokeColor: '#FF0000',
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: '#FF0000',
					fillOpacity: 0.35
					});
					myPolygon.setMap(map);
					polygone = myPolygon;
					google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
					google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);
			}
			else{
				if(Coords == null){
						map_initial_lat =51.4949;
						map_initial_lng = -0.12441;
				}
				else{
					map_initial_lat = Coords[0].lat;
					map_initial_lng = Coords[0].lng;
				}
				
				console.log(Coords);
				console.log(map_initial_lat)
				console.log(map_initial_lng)
				console.log('coords hain bhae');
				var myLatLng = new google.maps.LatLng(map_initial_lat, map_initial_lng);
				var mapOptions = {
					zoom: 8,
					center: myLatLng,
					mapTypeId: google.maps.MapTypeId.RoadMap
					};
				var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
				myPolygon = new google.maps.Polygon({
					paths: in_coords,
					draggable: true, // turn off if it gets annoying
					editable: true,
					strokeColor: '#FF0000',
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: '#FF0000',
					fillOpacity: 0.35
					});
					myPolygon.setMap(map);
					google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
					google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);
					polygone = myPolygon;

			}
				// General Options
				searchCall(map_initial_lat,map_initial_lng,map);
				clickToAddPolyGone(map);
			
		});
	/*
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    */
     

  }
  
  function searchCall(map_initial_lat,map_initial_lng,map){
	  
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
            var marker = new google.maps.Marker({
                position : place.geometry.location,
                map : map,
                draggable : true,
            });
        });
    /*
    |--------------------------------------------------------------------------
    | END SEARCH CALL
    |--------------------------------------------------------------------------
    */
  }

  function clickToAddPolyGone(map){
	google.maps.event.addListener(map, 'click', function(event) {
	   console.log(event.latLng);
	//    deletePolyGone();
       if(polygone){
		  console.log(polygone);
		  return
	   }
	   var triangle1 = google.maps.geometry.spherical.computeOffset(event.latLng, 15050, 0);
	   var triangle2 = google.maps.geometry.spherical.computeOffset(event.latLng, 15050, 120);
	   var triangle3 = google.maps.geometry.spherical.computeOffset(event.latLng, 15050, -120);
	   var triangleCoords = [triangle1, triangle2, triangle3];
	   console.log(triangleCoords);
	   in_coords = triangleCoords;
	   myPolygon = new google.maps.Polygon({
		paths: triangleCoords,
		draggable: true, // turn off if it gets annoying
		editable: true,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.35
		});
		polygone = myPolygon;
		myPolygon.setMap(map);
		google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
		google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);
		
	});
        google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deletePolyGone);

  }

  //Display Coordinates below map
  function getPolygonCoords() {
	var len = myPolygon.getPath().getLength();
	var htmlStr = "";
	var cords = [];

	for (var i = 0; i < len; i++) {
		var res = myPolygon.getPath().getAt(i).toUrlValue(5).split(",");
		var lat = res[0];
		var lng = res[1];
		var single_vertex = {lat : lat, lng : lng};
		cords.push(single_vertex);
	    htmlStr += "new google.maps.LatLng(" + myPolygon.getPath().getAt(i).toUrlValue(5) + "), ";
	}
	console.log(cords);
	document.getElementById('info').innerHTML = htmlStr;
	Coords = cords;
	in_coords = Coords;

  }

  function returnCoordss() {
	//   if(Coords == 'no-update'){
	// 	  return 'no-update';
	//   }
	console.log(in_coords);
	  return JSON.stringify(in_coords);  
	}
 
  function deletePolyGone() {
	if (polygone) {
		polygone.setMap(null);
		polygone = null;
	  }
	}
  