import type { Request, Response } from "express";
import WorkOfArtRepository from "../repository/workofart_repository.js";

class WorkOfArtController {
	public index = async (req: Request, res: Response) => {
		const results = await new WorkOfArtRepository().selectAll();
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}
		res.status(200).json({
			status: 200,
			message: "Welcome to my API",
			data: results,
		});
	};

	public one = async (req: Request, res: Response) => {
		const results = await new WorkOfArtRepository().selectOne(req.params);

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
		const results = await new WorkOfArtRepository().insert(req.body);
		//console.log(req.body);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}

		res.status(201).json({
			status: 201,
			message: "jeu cree",
			data: results,
		});
	};

	public update = async (req: Request, res: Response) => {
		const results = await new WorkOfArtRepository().update(req.body);
		console.log(req.body);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "WorkOfArt updated",
			data: results,
		});
	};

	public delete = async (req: Request, res: Response) => {
		const results = await new WorkOfArtRepository().delete(req.body);
		console.log(results);

		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			return;
		}

		res.status(200).json({
			status: 200,
			message: "WorkOfArt deleted",
			data: results,
		});
	};
}

export default WorkOfArtController;
