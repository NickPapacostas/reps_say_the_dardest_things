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
      popupTemplate: function(geo, data) {
        if (data) {
          if ($('#number-of-results').val()) {
            var listLength = parseInt($('#number-of-results').val());
          } else {
            var listLength = 10;
          }
          var phraseList = data.slice(0,listLength).map(function(r){ return {phrase: r.ngram}});
          var template = Handlebars.compile($('#top-phrase-list').html());
          return template({state: geo.id, phrases: phraseList});        
        } else {
          return "<h2>click to load....</h2>"
        }
      }
    }
  }
}

var map = new Datamap(mapConfig(document.getElementById('map-element')));
$(document).ready(function(){
  $('#reset-map').on('click', function(){
    $('#map-element').remove()
    var newMap = document.createElement('div')
    $(newMap)
    .attr('id', 'map-element')
    .css('position', 'relative')
    .css('width', '1000px')
    .css('height', '600px');
    $('#map-container').append(newMap)
    map = new Datamap(mapConfig(document.getElementById('map-element')));
  });
})


