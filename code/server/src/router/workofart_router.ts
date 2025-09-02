import express from "express";
import WorkOfArtController from "../controller/workofart_controller.js";

class WorkOfArtRouter {
	// définir un routeur
	private router = express.Router();
	// définir la liste des routes contenues dans le routeur
	public getRoutesList = () => {
		// création de la route d'accueil en GET en utilisant le préfixe /
		this.router.get("/", new WorkOfArtController().index);
		this.router.get("/:id", new WorkOfArtController().one);
		return this.router;
	};
}

export default WorkOfArtRouter;
