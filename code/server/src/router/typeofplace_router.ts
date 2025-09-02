import express from "express";
import TypeOfPlaceController from "../controller/typeofplace_controller.js";

class TypeOfPlaceRouter {
	// définir un routeur
	private router = express.Router();
	// définir la liste des routes contenues dans le routeur
	public getRoutesList = () => {
		// création de la route d'accueil en GET en utilisant le préfixe /
		this.router.get("/", new TypeOfPlaceController().index);
		this.router.get("/:id", new TypeOfPlaceController().one);
		return this.router;
	};
}

export default TypeOfPlaceRouter;
