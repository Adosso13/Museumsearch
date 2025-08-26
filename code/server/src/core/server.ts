import http from "node:http";
import express, { type Router, type Express } from "express";
import HomepageRouter from "../router/homepage_router.js";

class Server {
    // instancier une application Express
    private app: Express = express();
    // définir un routeur pour Express
    private router: Router = express.Router();
   
    constructor() {
        // lier l'application Express au routeur
        this.app.use(this.router);
        // définir la liste des routeurs
        this.getRoutersList();
    }

    // liste des routeurs
    private getRoutersList = () => {
        // création de la route d'accueil en GET
        this.router.use("/", new HomepageRouter().getRoutesList());
    };

    // créer un serveur Node.js / Express
    public createServer = (): http.Server => {
        return http.createServer(this.app);
    };
}

export default Server;

