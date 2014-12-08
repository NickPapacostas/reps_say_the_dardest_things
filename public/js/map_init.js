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
      n: 3
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
    window.response = responseObj;
    map.updateChoropleth(responseObj)

  }
}


var map = new Datamap({
  element: document.getElementById('container'),
  scope: 'usa',
  done: function(datamap) {
    mapInit(datamap);
  },
  data: {}, 
  geographyConfig: {
    popupTemplate: function(geo, data) {
      if (data) {
        var phraseList = data.slice(0,5).map(function(r){ return {phrase: r.ngram}});
        var template = Handlebars.compile($('#top-phrase-list').html());
        return template({state: geo.id, phrases: phraseList});        
      }
    }
  }
});
window.map = map;