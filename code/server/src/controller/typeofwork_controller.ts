import type { Request, Response } from "express";
import TypeOfWorkRepository from "../repository/typeofwork_repository.js";

class TypeOfWorkController {
	public index = async (req: Request, res: Response) => {
		// appel d'une méthode d'une classe de dépôt
		const results = await new TypeOfWorkRepository().selectAll();
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
		const results = await new TypeOfWorkRepository().selectOne(req.params);
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

	public insert = async (req: Request, res: Response) => {
		const results = await new TypeOfWorkRepository().insert(req.body);
		console.log(req.body);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				// afficher un simple message pour la production, sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}

		res.status(201).json({
			status: 201,
			message: "Artist cree",
			data: results,
		});
	};
	public update = async (req: Request, res: Response) => {
		const results = await new TypeOfWorkRepository().update(req.body);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				// afficher un simple message pour la production, sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Artist updated",
			data: results,
		});
	};

	public delete = async (req: Request, res: Response) => {
		const results = await new TypeOfWorkRepository().delete(req.body);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				// afficher un simple message pour la production, sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "Artist deleted",
			data: results,
		});
	};
}

export default TypeOfWorkController;
