//global for map

/* ======= Model =======*/

    var mapModel = function(){

        this.latlong = new google.maps.LatLng(45.4528785, -75.5980628);//"45.4528785,-75.5980628",
        this.map = new google.maps.Map($('#map')[0], {
            zoom: 13,
            center: new google.maps.LatLng(45.4528785, -75.5980628),
            mapTypeId: 'terrain'
        });

         this.markers = ko.observableArray(
            [
                { name: "Canada Aviation and Space Museum", latitude: 45.4343347, longitude: -75.574817113 },
                { name: "La cite collegiale", latitude: 45.439544, longitude: -75.626530 },
                { name: "Canada Science and Technology Museum", latitude: 45.4081887, longitude: -75.6371472 },
                { name: "Metro Ogilvie Market ", latitude: 45.4497511, longitude: -75.6025145 },
                //{name: "La cite collegiale", latitude: 45.439544, longitude: -75.626530}
                //{name: "La cite collegiale", latitude: 45.439544, longitude: -75.626530}
            ]
        );

      //  iconBase: ko.observable('https://maps.google.com/mapfiles/kml/shapes/'),
    };




/* ======= View model =======*/

//var mapViewModel = {

    mapModel.prototype.init = function() {
        var self = this;
        // tell our views to initialize
        self.render();
    };

    mapModel.prototype.createMap = function() {

        var self = this;
        //map = mapModel.map;
        var input = document.createElement("input");/** @type {HTMLInputElement} */
        document.getElementById('textForm').appendChild(input);
        var attId = document.createAttribute("id");       // Create a "class" attribute
        attId.value = "textinput";                           // Set the value of the class attribute
        input.setAttributeNode(attId);                          // Add the class attribute to <h1>
        var attType = document.createAttribute("type");
        attType.value = "search";
        input.setAttributeNode(attType);
        var attPlace = document.createAttribute("placeholder");
        attPlace.value = "Search Box";
        input.setAttributeNode(attPlace);
        var attBind = document.createAttribute("data-bind");       // Create a "class" attribute
        attBind.value = "onsearch: mapModel.removeMarker";                           // Set the value of the class attribute
        input.setAttributeNode(attBind);
        var attOnsearch = document.createAttribute("onsearch");
        attOnsearch.value = "onsearch=mapModel.removeMarker()";
        input.setAttributeNode(attOnsearch);


        self.addMarker(self.markers());

        // Allow each marker to have an info window
     /*   google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
                alert("KKKK");
            }
        })(marker, i));*/

        // Automatically center the map fitting all markers on the screen
        //map.fitBounds(bounds);
       return self.map;

    };

    mapModel.prototype.addMarker = function(theMarker){
        var self = this;
          //self.marker.setMap(map);

       // var bounds = new google.maps.LatLngBounds();
        for( i = 0; i < theMarker.length; i++ ) {

            var position = new google.maps.LatLng(theMarker[i].latitude, theMarker[i].longitude);
         //   bounds.extend(position);
            marker = new google.maps.Marker({
                    position: position,
                    map: self.map,
                    title: theMarker[i].name
                }
            );
            //myMarker[i] =  markers()[i].name;
        }
    };

    mapModel.prototype.matchInArray = function (string, expressions) {
        var len = expressions.length,
            i = 0;
            for (; i < len; i++) {
                if (string.match(expressions[i])) {
                    return true;
                }
            }
        return false;
    };

    mapModel.prototype.removeMarker = function(){
        var self = this;
      /*  //setAllMap(null);
        var theText = document.getElementById("textinput").value;
        for (var i = 0; i < self.markers().length - 1; i++) {
            if(theText == self.markers()[i].name){
                alert(theText);
               // alert(mapModel.markers()[i]);
                self.markers()[i] = null;
               // mapModel.markers() = null;
            }
        }*/
        //alert("YYY");
        this.marker.setMap(null);

        while(self.markers().length > 0) {
            self.markers.pop();//.removeMarker();
        }
    };

    mapModel.prototype.markerSearch = function() {
        self = this;
        if (self.markers().length == 0) {
            return;
        }
      //  var theText = document.getElementById("textinput").value;

       // alert(theText);

        self.removeMarker();

    };

    mapModel.prototype.render = function() {
        // update the DOM elements with values from the current map
        var self = this;
        self.createMap();
    }

//};

var myModel = new mapModel();

ko.applyBindings(myModel.init());


/* ======= View ======= */
/*
var mapView = {

        init: function() {
        // store pointers to our DOM elements for easy access later
       var icons = {
                    parking: {
                                icon: mapModel.iconBase + 'parking_lot_maps.png'
                            },
                    library: {
                                icon: mapModel.iconBase +  'library_maps.png'
                            },
                    info: {
                                icon: mapModel.iconBase +  'info-i_maps.png'
                            }
                };

        script= document.createElement("script"),
        script.type = mapModel.type;//'text/javascript';
        script.src= "https://www.google.com/maps/embed/v1/place?key=AIzaSyAJPtgqJ15BlHs_2HkflaOYp666oJjNvZo";
        document.body.appendChild(script);

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current map
        var theMap = mapController.getMap();
        //mapController.launchSearch();
        mapController.addMarker();
    }
   // mapController.launchSearch();

};*/

// make it go!



/*
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');




    // load nytimes
    // obviously, replace all the "X"s with your own API key
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    $.getJSON(nytimesUrl, function(data){

        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                '<p>' + article.snippet + '</p>'+
            '</li>');
        };

    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });



    // load wikipedia data
    var wikiUrl = 'http://en.wikipediaxxxx.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);
*/