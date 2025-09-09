import type Artist from "../model/artist.js";
import type Place from "../model/place.js";
import type TypeOfWork from "../model/type_of_work.js";
import type WorkOfArt from "../model/work_of_art.js";
import MySQLService from "../service/mysql_service.js";
import ArtistRepository from "./artist_repository.js";
import PlaceRepository from "./place_repository.js";
import TypeOfWorkRepository from "./typeofwork_repository.js";

class WorkOfArtRepository {
	private table = "work_of_art";

	public selectAll = async (): Promise<WorkOfArt[] | unknown> => {
		// se connecter au serveur MySQL
		const connection = await new MySQLService().connect();

		// requête SQL
		const sql = `
            SELECT 
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table};
        `;
		// exécuter la requête SQL ou récupérer une erreur
		try {
			const [results] = await connection.execute(sql);
			// renvoyer les résultats de la requête
			return results;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (
		data: Partial<WorkOfArt>,
	): Promise<unknown | WorkOfArt> => {
		// se connecter au serveur MySQL
		const connection = await new MySQLService().connect();

		// requête SQL
		const sql = `
            SELECT 
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table};
        `;
		try {
			// exécuter la requête SQL principale avec l'objet littéral passé en paramètre
			const [results] = await connection.execute(sql, data);
			// récupérer le premier indice des résultats
			const result = (results as WorkOfArt[]).shift() as WorkOfArt;
			// récupérer la valeur de la clé étrangère et exécuter une requête supplémentaire
			// utiliser le modèle de l'objet en relation
			// assigner le résultat de la requête à une propriété
			result.artist = (await new ArtistRepository().selectOne({
				// récupérer la valeur de la clé étrangère
				id: result.artist_id,
			})) as Artist;

			result.type_of_work = (await new TypeOfWorkRepository().selectOne({
				// récupérer la valeur de la clé étrangère
				id: result.type_of_work_id,
			})) as TypeOfWork;

			result.place = (await new PlaceRepository().selectOne({
				// récupérer la valeur de la clé étrangère
				id: result.place_id,
			})) as Place;
			// si besoin, cacher la propriété contenant la clé étrangère

			// renvoyer le résultat de la requête
			return result;
		} catch (error) {
			return error;
		}
	};

	public selectInList = async (
		list: string,
	): Promise<WorkOfArt[] | unknown> => {
		// se connecter au serveur MySQL
		const connection = await new MySQLService().connect();

		// requête SQL
		const sql = `
		SELECT 
			${this.table}.*
		FROM 
			${process.env.MYSQL_DATABASE}.${this.table}
		WHERE 
			${this.table}.id IN (${list});
		`;

		try {
			// exécuter la requête SQL principale avec l'objet littéral passé en paramètre
			const [results] = await connection.execute(sql);
			// récupérer le premier indice des résultats
			const result = (results as WorkOfArt[]).shift() as WorkOfArt;

			return result;
		} catch (error) {
			return error;
		}
	};

	public insert = async (
		data: Partial<WorkOfArt>,
	): Promise<WorkOfArt | unknown> => {
		const connection = await new MySQLService().connect();
		let sql = `
			INSERT INTO 
				${process.env.MYSQL_DATABASE}.${this.table}
			VALUES
				(NULL, :name);
		`;

		try {
			connection.beginTransaction();
			await connection.execute(sql, data);

			sql = `SET @id = LAST_INSERT_ID();`;
			await connection.execute(sql);

			connection.commit();
			return { success: true };
		} catch (error) {
			connection.rollback();
			return error;
		}
	};

	public update = async (
		data: Partial<WorkOfArt>,
	): Promise<WorkOfArt | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
			UPDATE 
				${process.env.MYSQL_DATABASE}.${this.table}
			SET 
				name = :name
			WHERE 
				id = :id;
		`;

		try {
			await connection.execute(sql, data);
			return { message: "Statut du développeur mis à jour avec succès" };
		} catch (error) {
			return error;
		}
	};

	public delete = async (
		data: Partial<WorkOfArt>,
	): Promise<WorkOfArt | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
			DELETE FROM 
				${process.env.MYSQL_DATABASE}.${this.table}
			WHERE 
				id = :id;
		`;
		try {
			await connection.execute(sql, data);
			return { message: "Suppression du développeur fait avec succès" };
		} catch (error) {
			return error;
		}
	};
}

export default WorkOfArtRepository;
