var pieHandler = null;

$(function() {
  //PieChart.init([1,1]);
  Smiley.init();
  bindRefresh();
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

function bindRefresh() {
  var socket = io.connect('http://localhost:3000');
  socket.on('votes', refresh);
}

function refresh(data) {
  var plusOne = 0, minusOne = 0;
  $(data).each(function(index, vote) {
    if (vote.mood) plusOne++;
    else minusOne++;
  });
  Smiley.updateSmile({plusOne: plusOne, minusOne: minusOne})
  //PieChart.refresh([plusOne, minusOne]);
}

var Smiley = {
  init: function() {
    this.w = 960;
    this.h = 500;
    this.svg = this._getSVGHandle();
    this._drawFace();
  },
  _getSVGHandle: function() {
    var svg = d3.select("div.pie_chart").append("svg:svg").attr("width", this.w).attr("height", this.h);
    var defs = svg.append("svg:defs");
    var shineGradient = defs.append("svg:radialGradient").attr("id","shine").attr("cx",".2").attr("cy",".2").attr("r",".5").attr("fx",".2").attr("fy",".2");
    var colorDefinition = defs.append("svg:radialGradient").attr("id","grad").attr("cx",".5").attr("cy",".5").attr("r",".5");

    shineGradient.append("svg:stop").attr("offset","0").attr("stop-color","white").attr("stop-opacity","0")
    shineGradient.append("svg:stop").attr("offset","1").attr("stop-color","white").attr("stop-opacity","0")
    colorDefinition.append("svg:stop").attr("offset", "0").attr("stop-color","yellow")
    colorDefinition.append("svg:stop").attr("offset", ".75").attr("stop-color","yellow")
    colorDefinition.append("svg:stop").attr("offset", ".95").attr("stop-color","#ee0")
    colorDefinition.append("svg:stop").attr("offset", "1").attr("stop-color","#e8e800")

    return svg.append("svg:g").attr("transform", "translate(" + 231 + "," + 231 + ")");
  },
  _drawFace: function() {
    this.svg.append("svg:circle").attr("r", "220").attr("stroke", "black").attr("stroke-width","3").attr("fill","url(#grad)");
    this.svg.append("svg:circle").attr("r", "220").attr("fill","url(#shine)");

    var face = this.svg.append("svg:g").attr("id","face");
    face.append("svg:ellipse").attr("rx","30").attr("ry","50").attr("cx","-100").attr("cy","-75").attr("fill","black");

    this.svg.append("svg:use").attr("xlink:href","#face").attr("transform","scale(-1,1)");
    this.svg.append("path").attr("id","smile").attr("fill","none").attr("stroke","black").attr("stroke-width","3").attr("d", "M -75, 87 a 12, 10, 0 0, 0 150, 0");
  },
  updateSmile: function(moodData) {
    var happyPercentile = ((moodData.plusOne - moodData.minusOne) / 10);
    console.log(moodData);
    console.log(happyPercentile);
    this.svg.select("#smile").attr("d","M -75, 87 a 12," + happyPercentile + ", 0 0, 0 150, 0");
  }
}
