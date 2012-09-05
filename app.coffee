express = require("express")
routes = require("./routes")
cast = require("./routes/cast")
http = require("http")
path = require("path")
vote = require("./models/vote")
app = express()

app.configure ->
  app.set "port", process.env.PORT or 3000
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.favicon()
  app.use express.logger("dev")
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static(path.join(__dirname, "public"))

app.configure "development", ->
  app.use express.errorHandler()

server = http.createServer(app)
io = require("socket.io").listen(server)


app.get "/", routes.index
app.get "/cast/:mood", cast.index
app.get "/trend", cast.trend

server.listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")

io.sockets.on('connection', (socket) ->
  vote.on('created', (votes) ->
    socket.emit('votes', votes)
  )
)
