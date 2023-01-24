var map, marker, latitude, longitude;

function initMap() {
  var location = new google.maps.LatLng(28.7041, 77.1025);
  var mapProperty = {
    center: location,
    zoom: 50,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  map = new google.maps.Map(document.getElementById("map", mapProperty));

  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: location,
  });

  geocodePosition(marker.getPosition());

  google.maps.event.addListener(marker, "dragend", function () {
    map.setCenter(marker.getPosition());
    geocodePosition(marker.getPosition());
    latitude = marker.getPosition().lat();
    longitude = marker.getPosition().lng();
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      latitude = pos.lat;
      longitude = pos.lng;

      marker.setPosition(pos);

      map.setCenter(marker.getPosition());
      geocodePosition(marker.getPosition());
    });
  }
}

function geocodePosition(pos) {
  geocoder = new google.maps.Geocoder();
  geocoder.geocode(
    {
      latLng: pos,
    },
    function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results[0].formatted_address);
      } else {
        console.log("Error");
      }
    }
  );
}
