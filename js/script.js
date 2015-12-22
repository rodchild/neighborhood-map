/ VARIABLES
//the map with its option
var map = new google.maps.Map($('.map-canvas')[0], {
    zoom: 13,
    center: new google.maps.LatLng(45.4528785, -75.5980628),
    mapTypeId: 'terrain'
});
//wikipedia api endpoint
var WIKI_ENDPOINT = "http://en.wikipedia.org/w/api.php?";
var markerArray = []; //will contain all the marker for managing the marker toggling.
var infowindow = new google.maps.InfoWindow(); //this will hold content for each marker infowindow.

/* ============================================*/
/*              viewModel           */
/* ============================================*/

/* this function will hold the observables for markers and manage the wiki request for every marker */
viewModel = function(name, lat, lon) {
    var self = this;

    var marker; //to poupulate the map with marker
    var contentString; //the text for marker infowindow
    //observables
    self.name = ko.observable(name);
    self.lat = ko.observable(lat);
    self.lon = ko.observable(lon);
    //marker creation
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon),
        map: self.map,
        title: name,

    });
    marker.setMap(map);
    markerArray.push(marker);

    var url = WIKI_ENDPOINT + "action=opensearch&search=" + name + "&format=json&callback=wikiCallback";
    var wikiRequestTimeout = setTimeout(function() {
        contentString = "<div class='markerInfoWindow noscroll'><h4>" + "Failed to get wikipedia resources" + "</h4></div>";
    }, 3000);
    //Wikipedia ajax() request
    // load wikipedia data
    contentString = "<div class='markerInfoWindow noscroll'><h5>" + "Failed to get wikipedia resources" + "</h5></div>";
    try {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {

                contentString = "<aside class='markerInfoWindow noscroll'><header>" + '<h4>' + marker.title + '</h4>' + "</header><hr><p><h5>" + data[2] + "</h5></p></aside>";
                infoWindow = new google.maps.InfoWindow({
                    content: contentString,

                });

                clearTimeout(wikiRequestTimeout);
            }
        });
    } catch (err) {
        contentString += err;
    }

    self.isVisible = ko.observable(true);

    self.isVisible.subscribe(function(currentState) {
        if (currentState) {
            marker.setMap(map);
        } else {
            marker.setMap(null);
        }
    });

    self.isVisible(true);
    /* here this event listener wait for a marker click, if clicked the map will center based on marker position */
    /* marker will starts bouncing and infowindow will open with its content. */
    google.maps.event.addListener(marker, 'click', function() {
        map.setCenter(marker.getPosition());
        markerToggle(marker);
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
    });
    return false;
};


/* show and hide listview when mouse hover on search box */
$( ".form-control" ).hover(function() {
        $('.container-fluid').show();
    }, function() {
        $('.container-fluid').hide();
    });

/* toggles wiki info window visibility status */
/* if a marker is clicked it will start bouncing */
function markerToggle(marker) {
    for (var i = 0; i < markerArray.length; i++) {
        if (i != markerArray[markerArray.indexOf(marker)]) {
            markerArray[i].setAnimation(null);
        }
    }
    markerArray[markerArray.indexOf(marker)].setAnimation(google.maps.Animation.BOUNCE);
}


var mapMarker = {

    markers: [
        new viewModel("Canada Aviation and Space Museum", 45.4343347, -75.574817113),
        new viewModel("La Cité collégiale", 45.439544, -75.626530),
        new viewModel("Canada Science and Technology Museum", 45.4081887, -75.6371472),
        new viewModel("Gloucester High School", 45.438373, -75.599555),
        new viewModel("St. Laurent Centre", 45.421713, -75.639227),
        new viewModel("Canadian Museum of Nature", 45.3792579, -75.5785937),
        new viewModel("Lester B. Pearson Catholic High School", 45.443309, -75.595915),
        new viewModel("Gloucester Public Library", 45.428169, -75.604758),
        new viewModel("Chapel Hill South", 45.442319, -75.517147),
        new viewModel("Industrial Park", 45.413888, -75.654476),
        new viewModel("Carson Grove - Carson Meadows", 45.441838, -75.635250),
        new viewModel("Montfort Hospital", 45.445432, -75.63906),
        new viewModel("Playfair Park - Lynda Park - Guildwood Estates", 45.389782, -75.647609),
        new viewModel("Vanier South", 45.433952, -75.662709),
        new viewModel("Old Ottawa South", 45.388882, -75.687772),
        new viewModel("The Children's Hospital of Eastern Ontario", 45.401004, -75.651373),
    ],

    query: ko.observable('')
};

/* searchbox management and location display */
mapMarker.markersToShow = ko.pureComputed(function() {
    var self = this;
    search = self.query().toLowerCase();
    return ko.utils.arrayFilter(mapMarker.markers, function(marker) {
        var found = marker.name().toLowerCase().indexOf(search) >= 0;
        marker.isVisible(found);
        return found;
    });
}, mapMarker);



ko.applyBindings(mapMarker);
