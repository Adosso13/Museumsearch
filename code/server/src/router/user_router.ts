import express from "express";
import UserController from "../controller/user_controller.js";

class UserRouter {
	// définir un routeur
	private router = express.Router();
	// définir la liste des routes contenues dans le routeur
	public getRoutesList = () => {
		// création de la route d'accueil en GET en utilisant le préfixe /
		this.router.get("/", new UserController().index);
		this.router.get("/:id", new UserController().one);
		return this.router;
	};
}

export default UserRouter;
