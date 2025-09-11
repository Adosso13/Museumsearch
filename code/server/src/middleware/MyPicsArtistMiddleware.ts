import fs from "node:fs/promises";
import type { NextFunction, Request, Response } from "express";
import type Artist from "../model/artist.js";
import ArtistRepository from "../repository/artist_repository.js";

class MyPicsArtistMiddleware {
	public process = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			// Récupère les fichiers uploadés depuis la requête
			const files = req.files as Express.Multer.File[] | undefined;
			// Prend le premier fichier s’il y en a un
			const file = files && files.length > 0 ? files[0] : undefined;

			// Variable pour stocker le jeu concerné (utile pour PUT ou DELETE)
			let artist: Artist | null = null;

			// Si la requête est une mise à jour (PUT) ou suppression (DELETE)
			if (req.method === "PUT" || req.method === "DELETE") {
				// On récupère le jeu concerné à partir de son ID dans le body
				const result = await new ArtistRepository().selectOne({
					id: req.body.id,
				});
				// Si un jeu est trouvé et qu’il n’y a pas d’erreur, on le stocke
				if (result && !(result instanceof Error)) {
					artist = result as Artist;
				}
			}

			// Si un fichier est fourni (upload)
			if (file) {
				// Construit un nom de fichier avec son extension d’origine (ex: image.jpg)
				const filename = `${file.filename}.${file.mimetype.split("/")[1]}`;

				// Renomme le fichier temporaire avec l’extension correcte
				await fs.rename(file.path, `${file.destination}/${filename}`);

				// Ajoute le nom du fichier au corps de la requête
				req.body.image = filename;

				// Si on est en mode PUT, supprimer l'ancien fichier associé au jeu
				if (req.method === "PUT" && artist && artist.image) {
					const oldFilePath = `${file.destination}/${artist.image}`;
					try {
						// Vérifie si l’ancien fichier existe
						await fs.access(oldFilePath);
						// Supprime le fichier
						await fs.rm(oldFilePath);
					} catch (error) {
						// En cas d’erreur (ex: fichier inexistant), on log l’info
						console.log(
							`Le fichier ${oldFilePath} n'existe pas ou ne peut pas être supprimé`,
						);
					}
				}
			} else {
				// Si aucun nouveau fichier n'est envoyé mais qu'on met à jour
				if (req.method === "PUT" && artist) {
					// On conserve l’ancien image dans le body
					req.body.image = artist.image;
				}

				// Si on supprime un jeu (DELETE) et qu’il avait un image
				if (req.method === "DELETE" && artist && artist.image) {
					// Définit le répertoire des fichiers (via une variable d’environnement ou par défaut)
					const assetDir = process.env.ASSET_DIR || "public";
					// Chemin complet vers l’image à supprimer
					const filePath = `${assetDir}/img/${artist.image}`;
					try {
						// Vérifie l’existence du fichier
						await fs.access(filePath);
						// Supprime le fichier
						await fs.rm(filePath);
					} catch (error) {
						// Si le fichier n'existe pas ou ne peut être supprimé, log l’info
						console.log(
							`Le fichier ${filePath} n'existe pas ou ne peut pas être supprimé`,
						);
					}
				}
			}

			// Passe la main au middleware suivant
			next();
		} catch (error) {
			// En cas d’erreur inattendue, log l’erreur et renvoie un statut 500
			console.error("Erreur dans artistFileMiddleware:", error);
			res.status(500).json({ error: "Erreur lors du traitement du fichier" });
		}
	};
}

export default MyPicsArtistMiddleware;
