/* ======= Model ======= */

    var model = {
        theMap: null,
        script: null,
        mapProp: {
        center: new google.maps.LatLng(51.508742, -0.120850), zoom: 7, mapTypeId: google.maps.MapTypeId.ROADMAP
    },

   // map:new google.maps.Map(document.getElementById("googleMap"), mapProp),
  // script: document.createElement("script"),
   //script.src: "http://maps.googleapis.com/maps/api/js?callback=initialize",

};


/* ======= Controller ======= */

var controller = {

    init: function() {
        // set our current cat to the first one in the list

       // model.script = document.createElement("script");
       // model.script.src = "http://maps.googleapis.com/maps/api/js?callback=initialize";
        //var mapProp = { center: new google.maps.LatLng(51.508742, -0.120850), zoom: 7,mapTypeId: google.maps.MapTypeId.ROADMAP
       // };
        model.theMap = new google.maps.Map(document.getElementById("googleMap"), model.mapProp);



        // tell our views to initialize
        //catListView.init();
        mapView.init();
    },

    getMap: function() {
        google.maps.event.addDomListener(window, 'load', mapView.init);

        return model.theMap;
    },
};


/* ======= View ======= */

var mapView = {

        init: function() {
        // store pointers to our DOM elements for easy access later
       // document.body.appendChild(model.script);
       // this.mapElem = new google.maps.Map(document.getElementById("googleMap"), model.theMap);//document.getElementById('map');
        //this.catNameElem = document.getElementById('cat-name');
       // this.catImageElem = document.getElementById('cat-img');
        //this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        /*this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });*/


        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current map
        var theMap = controller.getMap();
        /*this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
        */
    }

};

// make it go!
controller.init();

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