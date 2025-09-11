import http from "node:http";
import cors from "cors";
import express, { type Express, type Router } from "express";
import ArtistRouter from "../router/artist_router.js";
import HomepageRouter from "../router/homepage_router.js";
import PlaceRouter from "../router/place_router.js";
import RoleRouter from "../router/role_router.js";
import TypeOfPlaceRouter from "../router/typeofplace_router.js";
import TypeOfWorkRouter from "../router/typeofwork_router.js";
import UserRouter from "../router/user_router.js";
import WorkOfArtRouter from "../router/workofart_router.js";

class Server {
	// instancier une application Express
	private app: Express = express();
	// définir un routeur pour Express
	private router: Router = express.Router();

	constructor() {
		// 1. Activer le CORS (important que ça soit tôt, pour éviter des blocages navigateur)
		this.app.use(cors());

		// 2. Parser le body (avant d'utiliser les routes, sinon req.body sera vide)
		this.app.use(express.json());

		// 3. Définir les routes
		this.RoutersList();

		this.app.use(this.router);

		// 4. Servir les fichiers statiques (souvent en dernier, sinon ça peut "voler" des routes API)
		this.app.use(express.static(`${process.env.ASSET_DIR}`));
	}

	// liste des routeurs
	private RoutersList = () => {
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
	public create = () => {
		return http.createServer(this.app);
	};
}

export default Server;
