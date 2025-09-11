import express from "express";
import multer from "multer";
import PlaceController from "../controller/place_controller.js";
import MyPicsPlacesMiddleware from "../middleware/MyPicsPlacesMiddleware.js";

class PlaceRouter {
	// définir un routeur
	private router = express.Router();

	private storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, `${process.env.ASSETS_DIR}/img`);
		},
		filename: (req, file, cb) => {
			cb(null, Date.now().toString()); // Nom de fichier unique
		},
	});

	private upload = multer({
		storage: this.storage,
		limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
	});

	// définir la liste des routes contenues dans le routeur
	public getRoutesList = () => {
		// création de la route d'accueil en GET en utilisant le préfixe /
		this.router.get("/", new PlaceController().index);
		this.router.get("/:id", new PlaceController().one);
		this.router.post(
			"/",
			this.upload.any(),
			// middleware gérant le fichier transféré
			new MyPicsPlacesMiddleware().process,
			new PlaceController().insert,
		);
		this.router.put(
			"/",
			this.upload.any(),
			new MyPicsPlacesMiddleware().process,
			new PlaceController().update,
		);
		this.router.delete(
			"/", 
			this.upload.any(), 
			new MyPicsPlacesMiddleware().process,
			new PlaceController().delete);
		return this.router;
	};
}

export default PlaceRouter;
