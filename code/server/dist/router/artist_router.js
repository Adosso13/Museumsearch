import express from "express";
import multer from "multer";
import ArtistController from "../controller/artist_controller.js";
import MyPicsArtistMiddleware from "../middleware/MyPicsArtistMiddleware.js";
class ArtistRouter {
    // définir un routeur
    router = express.Router();
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${process.env.ASSETS_DIR}/img`);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString()); // Nom de fichier unique
        },
    });
    upload = multer({
        storage: this.storage,
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    });
    // définir la liste des routes contenues dans le routeur
    getRoutesList = () => {
        // création de la route d'accueil en GET en utilisant le préfixe /
        this.router.get("/", new ArtistController().index);
        this.router.get("/:id", new ArtistController().one);
        this.router.post("/", this.upload.any(), 
        // middleware gérant le fichier transféré
        new MyPicsArtistMiddleware().process, new ArtistController().insert);
        this.router.put("/", this.upload.any(), new MyPicsArtistMiddleware().process, new ArtistController().update);
        this.router.delete("/", this.upload.any(), new MyPicsArtistMiddleware().process, new ArtistController().delete);
        return this.router;
    };
}
export default ArtistRouter;
