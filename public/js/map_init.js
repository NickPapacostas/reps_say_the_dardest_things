var mapInit = function (datamap) {
  datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
    stateClick(geography);
  });
}

var stateClick = function (state) {
  console.log(state.id)
}

var map = new Datamap({
  element: document.getElementById('container'),
  scope: 'usa',
  done: function(datamap) {
    mapInit(datamap);
  }
});
