import express from "express";
import multer from "multer";
import WorkOfArtController from "../controller/workofart_controller.js";
import MyPicsWorksMiddleware from "../middleware/MyPicsWorksMiddleware.js";

class WorkOfArtRouter {
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
		this.router.get("/", new WorkOfArtController().index);
		this.router.get("/:id", new WorkOfArtController().one);
		this.router.post(
			"/",
			this.upload.any(),
			// middleware gérant le fichier transféré
			new MyPicsWorksMiddleware().process,
			new WorkOfArtController().insert,
		);
		this.router.put(
			"/",
			this.upload.any(),
			new MyPicsWorksMiddleware().process,
			new WorkOfArtController().update,
		);
		this.router.delete(
			"/",
			this.upload.any(),
			new MyPicsWorksMiddleware().process,
			new WorkOfArtController().delete,
		);
		return this.router;
	};
}

export default WorkOfArtRouter;
