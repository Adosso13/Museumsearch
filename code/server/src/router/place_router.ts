import express from "express";
import PlaceController from "../controller/place_controller.js";

class PlaceRouter {
	// définir un routeur
	private router = express.Router();
	// définir la liste des routes contenues dans le routeur
	public getRoutesList = () => {
		// création de la route d'accueil en GET en utilisant le préfixe /
		this.router.get("/", new PlaceController().index);
		this.router.get("/:id", new PlaceController().one);
		return this.router;
	};
}

export default PlaceRouter;
