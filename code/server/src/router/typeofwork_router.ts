import express from "express";
import TypeOfWorkController from "../controller/typeofwork_controller.js";

class TypeOfWorkRouter {
	// définir un routeur
	private router = express.Router();
	// définir la liste des routes contenues dans le routeur
	public getRoutesList = () => {
		// création de la route d'accueil en GET en utilisant le préfixe /
		this.router.get("/", new TypeOfWorkController().index);
		this.router.get("/:id", new TypeOfWorkController().one);
		return this.router;
	};
}

export default TypeOfWorkRouter;
