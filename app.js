const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mysqlConnexion = require('./database');
const index = require('./router/index');
const inscription = require('./router/inscription');
const connexion = require('./router/connexion');
const session = require('express-session');


const io = new Server(server);


app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}))

mysqlConnexion.connect((err) =>{
  if (err) {
    console.log("Echec de connexion à la base de données");
  }else{
    console.log("Connexion à la base de données réussie");
    
// initialisation de la session
    const sessionMiddleware =(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000202 }
    }))

    app.use(sessionMiddleware);

    io.use((socket, next) =>{
      sessionMiddleware(socket.request, {}, next)
    })


    app.use('/', index)
    app.use('/inscription', inscription)
    app.use('/connexion', connexion)
  }
})



io.on('connection', (socket) => {
  console.log("socket.request.session", socket.request.session.dataUser);
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
io.on('connection', (socket) =>  {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);

      const userid = socket.request.session.dataUser;
      mysqlConnexion.query('INSERT INTO messages (message, userid) VALUES (?, ?)', [msg, userid], (err, result) =>{
        if (err) {
            console.log("Erreur d'enregistrement à la base de donnée", err);
        }else{
            console.log("Enregistrement fait avec succès", result);
        }
      })

    });

});


server.listen(3000, () => {
  console.log('listening on *:3000');
});