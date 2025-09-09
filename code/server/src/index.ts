import Server from "./core/server.js";

// demarer le serveur
const server: Server = new Server();

//process.env permet d'acceder aux variables d'environnement
server.create().listen(process.env.PORT);
