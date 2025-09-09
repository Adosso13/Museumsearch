import Server from "./core/server.js";
// demarer le serveur
const server = new Server();
//process.env permet d'acceder aux variables d'environnement
server.create().listen(process.env.PORT);
