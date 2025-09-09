// biome-ignore assist/source/organizeImports: <>
import http from "node:http";
import express from "express";
import HomepageRouter from "../router/homepage_router.js";
import ArtistRouter from "../router/artist_router.js";
import WorkOfArtRouter from "../router/workofart_router.js";
import TypeOfPlaceRouter from "../router/typeofplace_router.js";
import UserRouter from "../router/user_router.js";
import TypeOfWorkRouter from "../router/typeofwork_router.js";
import PlaceRouter from "../router/place_router.js";
import RoleRouter from "../router/role_router.js";
class Server {
    // instancier une application Express
    app = express();
    // définir un routeur pour Express
    router = express.Router();
    constructor() {
        // d’abord parser le body
        this.app.use(express.json());
        // puis brancher le router
        this.app.use(this.router);
        // définir la liste des routeurs
        this.RoutersList();
        // accès aux fichiers statiques
        this.app.use(express.static(`${process.env.ASSET_DIR}`));
    }
    // liste des routeurs
    RoutersList = () => {
        // création de la route d'accueil en GET
        this.router.use("/", new HomepageRouter().getRoutesList());
        this.router.use("/artist", new ArtistRouter().getRoutesList());
        this.router.use("/place", new PlaceRouter().getRoutesList());
        this.router.use("/type_of_place", new TypeOfPlaceRouter().getRoutesList());
        this.router.use("/work_of_art", new WorkOfArtRouter().getRoutesList());
        this.router.use("/type_of_work", new TypeOfWorkRouter().getRoutesList());
        this.router.use("/user", new UserRouter().getRoutesList());
        this.router.use("/role", new RoleRouter().getRoutesList());
    };
    // créer un serveur Node.js / Express
    create = () => {
        return http.createServer(this.app);
    };
}
export default Server;
