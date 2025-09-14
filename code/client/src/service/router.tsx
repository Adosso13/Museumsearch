import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../layout/BaseLayout";
import Homepage from "../page/website/Homepage";
import Museumlist from "../page/website/Museumlist";
import Workslist from "../page/website/Workslist";

const router = createBrowserRouter([
	{
		// préfixe des routes enfants
        path: "/",
        element: <BaseLayout/>,
        children: [
            {
                // page d'accueil
                path: "",
                element: <Homepage />,
            },
            {
                // page d'accueil
                path: "liste-des-musees",
                element: <Museumlist />,
            },
            {
                // page d'accueil
                path: "liste-des-oeuvresl",
                element: <Workslist />,
            },
        ],
	},
]);

export default router;
