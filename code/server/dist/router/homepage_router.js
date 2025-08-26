import express from "express";
import HomepageController from "../controller/hompage_controller.js";
class HomepageRouter {
    // définir un routeur
    router = express.Router();
    // définir la liste des routes contenues dans le routeur
    getRoutesList = () => {
        // création de la route d'accueil en GET en utilisant le préfixe /
        this.router.get("/", new HomepageController().get);
        return this.router;
    };
}
export default HomepageRouter;
//# sourceMappingURL=homepage_router.js.map