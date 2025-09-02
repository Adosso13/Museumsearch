import type { Request, Response } from "express";
import WorkOfArtRepository from "../repository/workofart_repository.js";

class WorkOfArtController {
	public index = async (req: Request, res: Response) => {
		// appel d'une méthode d'une classe de dépôt
		const results = await new WorkOfArtRepository().selectAll();
		// si une erreur est renvoyée par la requête
		// afficher l'erreur en environnement de développement
		// afficher un simple message en environnement de production
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}
		/*
    
        */
		res.status(200).json({
			status: 200,
			message: "Welcome tgggggo my API",
			data: results,
		});
	};

	public one = async (req: Request, res: Response) => {
		// appel d'une méthode d'une classe de dépôt
		const results = await new WorkOfArtRepository().selectOne(req.params);
		// si une erreur est renvoyée par la requête
		// afficher l'erreur en environnement de développement
		// afficher un simple message en environnement de production
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}
		/*
    
        */
		res.status(200).json({
			status: 200,
			message: "Welcome tgggggo my API",
			data: results,
		});
	};
}

export default WorkOfArtController;
