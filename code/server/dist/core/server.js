import http from "node:http";
import express, {} from "express";
import HomepageRouter from "../router/homepage_router.js";
class Server {
    // instancier une application Express
    app = express();
    // définir un routeur pour Express
    router = express.Router();
    constructor() {
        // lier l'application Express au routeur
        this.app.use(this.router);
        // définir la liste des routeurs
        this.getRoutersList();
    }
    // liste des routeurs
    getRoutersList = () => {
        // création de la route d'accueil en GET
        this.router.use("/", new HomepageRouter().getRoutesList());
    };
    // créer un serveur Node.js / Express
    createServer = () => {
        return http.createServer(this.app);
    };
}
export default Server;
//# sourceMappingURL=server.js.map