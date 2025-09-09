import type { Request, Response } from "express";
import TypeOfPlaceRepository from "../repository/typeofplace_repository.js";

class TypeOfPlaceController {
	public index = async (req: Request, res: Response) => {
		const results = await new TypeOfPlaceRepository().selectAll();
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
		const results = await new TypeOfPlaceRepository().selectOne(req.params);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "ok",
			data: results,
		});
	};

	public insert = async (req: Request, res: Response) => {
		const results = await new TypeOfPlaceRepository().insert(req.body);
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
			message: "TypeOfPlace cree",
			data: results,
		});
	};

	public update = async (req: Request, res: Response) => {
		const results = await new TypeOfPlaceRepository().update(req.body);

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
			message: "TypeOfPlace updated",
			data: results,
		});
	};

	public delete = async (req: Request, res: Response) => {
		const results = await new TypeOfPlaceRepository().delete(req.body);

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
			message: "TypeOfPlace deleted",
			data: results,
		});
	};
}

export default TypeOfPlaceController;
