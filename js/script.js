
        // VARIABLES
        //the map with its option
        var map = new google.maps.Map($('.map-canvas')[0], {
            zoom: 13,
            center: new google.maps.LatLng(45.4528785, -75.5980628),
            mapTypeId: 'terrain'
        });
        //wikipedia api endpoint
        var wikiEndpoint = "http://en.wikipedia.org/w/api.php?";
        var markerArray = [];//will contain all the marker for managing the marker toggling.
        var infowindow = new google.maps.InfoWindow();//this will hold content for each marker infowindow.

        //this function will hold the observables for markers and manage the wiki request for every marker
        mapMarker = function(name, lat, lon) {
            var self = this;

                var marker;//to poupulate the map with marker
                var contentString;//the text for marker infowindow
                //observables
                self.name = ko.observable(name);
                self.lat  = ko.observable(lat);
                self.lon  = ko.observable(lon);
                //marker creation
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lon),
                    map: self.map,
                    title: name,

                });
                marker.setMap(map);
                markerArray.push(marker);

           var url = wikiEndpoint + "action=opensearch&search=" + name + "&format=json&callback=wikiCallback"; //"action=parse&format=json&page=" + name + "&prop=text&section=0&callback=?";//action=parse&page=" + name + "&prop=text&section=0&format=json&callback=?";
           var wikiRequestTimeout = setTimeout(function() {
                contentString =  "<div class='markerInfoWindow noscroll'><h4>" + "Failed to get wikipedia resources" + "</h4></div>";
            }, 3000);
           //Wikipedia ajax() request
           // load wikipedia data
           contentString =  "<div class='markerInfoWindow noscroll'><h4>" + "Failed to get wikipedia resources" + "</h4></div>";
           try{
            $.ajax({
                url: url,
                dataType: 'jsonp',
                success: function(data) {

                    contentString =  "<div class='markerInfoWindow noscroll'><h4>" + data[2] + "</h4></div>";
                    infoWindow = new google.maps.InfoWindow({
                        content: contentString,

                    });

                    clearTimeout(wikiRequestTimeout);
                }
            });
            }
            catch(err) {
                contentString += err;
            }
            //finally {}

            self.isVisible = ko.observable(true);

            self.isVisible.subscribe(function(currentState) {
                if (currentState) {
                    marker.setMap(map);
                }
                else
                {
                    marker.setMap(null);
                }
            });

            self.isVisible(true);
            //here this event listener wait for a marker click, if clicked the map will center based on marker position
            //marker will starts bouncing and infowindow will open with its content.
            google.maps.event.addListener(marker, 'click', function() {
                map.setCenter(marker.getPosition());
                markerToggle(marker);
                infoWindow.setContent(contentString);
                infoWindow.open(map,marker);
            });
            return false;
        };

        // toggles wiki info window visibility status
        //if a marker is clicked it will start bouncing
        function markerToggle(marker) {
            for(var i = 0; i < markerArray.length; i++){
                if( i != markerArray[markerArray.indexOf(marker)]) {
                    markerArray[i].setAnimation(null);
                }
            }
            markerArray[markerArray.indexOf(marker)].setAnimation(google.maps.Animation.BOUNCE);
        }

        /* ============================================*/
        /*              viewModel           */
        /* ============================================*/

        var viewModel =  {

                markers : //ko.observableArray(
                [
                    new mapMarker("Canada Aviation and Space Museum", 45.4343347, -75.574817113 ),
                    new mapMarker("La Cité collégiale", 45.439544, -75.626530 ),
                    new mapMarker("Canada Science and Technology Museum", 45.4081887, -75.6371472 ),
                    new mapMarker("Gloucester High School", 45.438373, -75.599555 ),
                    new mapMarker("St. Laurent Centre", 45.421713,-75.639227 ),
                    new mapMarker("Canadian Museum of Nature", 45.3792579, -75.5785937 ),
                    new mapMarker("Lester B. Pearson Catholic High School", 45.443309, -75.595915 ),
                    new mapMarker("Gloucester Public Library", 45.428169, -75.604758 ),
                    new mapMarker("Montfort Hospital", 45.445432, -75.63906),
                    new mapMarker("The Children's Hospital of Eastern Ontario", 45.401004,-75.651373 ),
                ] //)
                ,
                query : ko.observable('')
        };

        //searchbox management and location display
        viewModel.markersToShow = ko.pureComputed ( function() {
            var self = this;
            search = self.query().toLowerCase();
            return ko.utils.arrayFilter ( viewModel.markers, function(marker) {
                var found = marker.name().toLowerCase().indexOf(search) >= 0;
                marker.isVisible(found);
                return found;
                });
            }, viewModel);

ko.applyBindings(viewModel);