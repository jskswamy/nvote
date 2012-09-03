var pieHandler = null;

$(function() {
  PieChart.init([1,1]);
  setInterval(refreshData, 5000);
});

var PieChart = {
  init: function(data) {
    this.w = 960;
    this.h = 500;
    this.r = Math.min(this.w, this.h) / 2;
    this.color = d3.scale.category20();
    this.donut = d3.layout.pie().sort(null);
    this.arc = d3.svg.arc().innerRadius(this.r - 100).outerRadius(this.r - 20);
    this.svg = this._appendSvg();
    this.arcs = this._drawPie(data);
  },
  _appendSvg: function() {
    var svg = d3.select("div.pie_chart").append("svg:svg")
      .attr("width", this.w)
      .attr("height", this.h)
      .append("svg:g")
      .attr("transform", "translate(" + 231 + "," + 231 + ")");
    return svg;
  },
  _drawPie: function(data) {
    var arcs = this.svg.selectAll("path")
      .data(this.donut(data))
      .enter().append("svg:path")
      .attr("fill", $.proxy(function(d, i) { return this.color(i); }, this))
      .attr("d", this.arc);
    return arcs;
  },
  refresh: function(data) {
    this.arcs.data(this.donut(data)).attr("d", this.arc);
  }
};

function refreshData() {
  $.getJSON('/trend', updateGraph);
}

function updateGraph(data) {
  var plusOne = 0, minusOne = 0;
  $(data.votes).each(function(index, vote) {
    if (vote.mood) plusOne++;
    else minusOne++;
  });
  PieChart.refresh([plusOne, minusOne]);
}
