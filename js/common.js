

function heightDetect() {
  $("#mapDiv").css("height", $(window).height());
};
heightDetect();
$(window).resize(function() {
  heightDetect();
});

$('.nav a').click(function(){

        $('.nav .active').removeClass('active'); // remove the class from the currently selected
        $(this).addClass('active'); // add the class to the newly clicked link

      });
   $(window).load(function(){
              $("a[href*='#']").mPageScroll2id();
      });

$("input,select,textarea").not("[type=submit]").jqBootstrapValidation();




require(["esri/map", 
  "esri/dijit/BasemapGallery",
  "esri/dijit/Search",
  "esri/InfoTemplate",
  "dojo/on", 
  "dojo/dom", 
  "dojo/keys",
  "esri/config",
  "esri/domUtils",
  "dojo/dom",
  "dojo/dom-construct",
  "dojo/json",
  "dojo/on",
  "dojo/parser",
  "dojo/_base/array",
  "dojo/_base/lang",
  "dojo/domReady!"], 
  function(Map, BasemapGallery, Search,
    keys, on, dom) {

 // Create map  	

 var map = new Map("mapDiv", {
 	center: [30.500, 50.480],
 	zoom: 12,
 	basemap: "streets"
 });


//baseGallery

 var basemapGallery = new BasemapGallery({
  showArcGISBasemaps: true,
  map: map
}, "basemapGallery");
 basemapGallery.startup();

  // Listen to the basemap selection and set the title
  on(basemapGallery, "onSelectionChange", function() {
    dom.byId("userMessage").innerHTML = basemapGallery.getSelected().title;
  });

      //Create search widget
         var search = new Search({
            map: map,
            //passing in empty source array to clear defaults such as 
            //"All" and the ArcGIS Online World Geocoding service
            sources: [],
            zoomScale: 10000
         }, "search");

         //listen for the load event and set the source properties 
         search.on("load", function () {

            var sources = search.sources;
            sources.push({
               placeholder: "Spain",
               enableLabel: false,
               searchFields: ["Country"],
               displayField: "Country",
               exactMatch: false,
               outFields: ["*"],

               //Create an InfoTemplate and include three fields
               infoTemplate: new InfoTemplate("Ecological Footprint", "<a href= ${URL} target=_blank ;'>Additional Info</a></br></br>Country: ${Country}</br>Rating: ${Rating}")

            });
            //Set the sources above to the search widget
            search.set("sources", sources);
         });
         search.startup();

      });






