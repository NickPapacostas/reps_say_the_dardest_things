var mapInit = function (datamap) {
  datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
    stateClick(geography);
  });
}

var stateClick = function (state) {
  getPhrases(state.id)
}


var getPhrases = function(state) {
  var Sunlight = {
    endpoint: 'http://capitolwords.org/api/phrases.json',
    defaultParams: {
      apikey: "3e45fa3f533947169823f6097289a378",
      entity_type: 'state',
      entity_value: state, 
      n: parseInt($('#phrase-length').val()) || 3
    },

  };
  var queryParams = {
    data: Sunlight.defaultParams,
    type: "GET",
    dataType: 'jsonp',
    phrase: "fiscal",
  }
  var response = jQuery.ajax(
    Sunlight.endpoint, 
    queryParams
    ).done(addResponse)
  
  function addResponse(response){
    var responseObj = {};
    responseObj[state] = response;

    if ($('#number-of-results').val()) {
      var listLength = parseInt($('#number-of-results').val());
    } else {
      var listLength = 10;
    }

    var phraseList = response.slice(0,listLength).map(function(r){ return {phrase: r.ngram}});
    var template = Handlebars.compile($('#top-phrase-list').html());
    $('#current-results').html(template({state: state, phrases: phraseList}));        
    

    map.updateChoropleth(responseObj);
  }
}

function mapConfig(element) {
  return {
    element: element,
    scope: 'usa',
    done: function(datamap) {
      mapInit(datamap);
    },
    data: {}, 
    geographyConfig: {
      popupTemplate: function(geo, data){
        return "<div class='popup'>" + geo.id + "</div>"
      }
    }
  }
}
var map = new Datamap(mapConfig(document.getElementById('map-element')));

function resetMap(){
  $('#map-element').remove();
  $('#current-results').text("Click a state to load some results...");
  var newMap = document.createElement('div')
  $(newMap).attr('id', 'map-element');
  $('#map-container').append(newMap)
  map = new Datamap(mapConfig(document.getElementById('map-element')));
}

$(document).ready(function(){
  $('#reset-map').on('click', function(){
    resetMap();
  });
})


