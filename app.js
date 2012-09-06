var express = require("express"),
    routes = require("./routes"),
    cast = require("./routes/cast"),
    http = require("http"),
    path = require("path"),
    vote = require("./models/vote"),
    app = express(),
    server = http.createServer(app),
    io = require("socket.io").listen(server);

app.configure(function() {
  app.set("port", process.env.PORT || 3000);
  app.set("views", __dirname + "/views");
  app.set("view engine", "jade");
  app.use(express.favicon());
  app.use(express.logger("dev"));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  return app.use(express["static"](path.join(__dirname, "public")));
});

app.configure("development", function() {
  return app.use(express.errorHandler());
});

app.get("/", routes.index);
app.get("/cast/:mood", cast.index);
app.get("/trend", cast.trend);

server.listen(app.get("port"), function() {
  return console.log("Express server listening on port " + app.get("port"));
});

io.sockets.on('connection', function(socket) {
  emitVotes.bind(socket)();
  return vote.on('created', emitVotes.bind(socket));
});

var emitVotes = function() {
  vote.get_trending_votes(function(votes) {
    return this.emit('votes', votes);
  }.bind(this));
}
