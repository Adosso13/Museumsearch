import type Place from "../model/place.js";
import type TypeofPlace from "../model/type_of_place.js";
import MySQLService from "../service/mysql_service.js";
import TypeOfPlaceRepository from "./typeofplace_repository.js";

class PlaceRepository {
	private table = "place";

	public selectAll = async (): Promise<Place[] | unknown> => {
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

	public selectOne = async (data: Partial<Place>): Promise<unknown | Place> => {
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
			const result = (results as Place[]).shift() as Place;
			// récupérer la valeur de la clé étrangère et exécuter une requête supplémentaire
			// utiliser le modèle de l'objet en relation
			// assigner le résultat de la requête à une propriété
			result.type_of_place = (await new TypeOfPlaceRepository().selectOne({
				// récupérer la valeur de la clé étrangère
				id: result.type_of_place_id,
			})) as TypeofPlace;

			// si besoin, cacher la propriété contenant la clé étrangère

			// renvoyer le résultat de la requête
			return result;
		} catch (error) {
			return error;
		}
	};

	public selectInList = async (list: string): Promise<Place[] | unknown> => {
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
			const result = (results as Place[]).shift() as Place;

			return result;
		} catch (error) {
			return error;
		}
	};

	public insert = async (data: Partial<Place>): Promise<Place | unknown> => {
		const connection = await new MySQLService().connect();
		let sql = `
			INSERT INTO 
				${process.env.MYSQL_DATABASE}.${this.table}
			VALUES
				(NULL, :name, :image, :description, :address, :date_of_creation, :average_visit_time, :type_of_place_id);
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

	public update = async (data: Partial<Place>): Promise<Place | unknown> => {
		const connection = await new MySQLService().connect();

		const sql = `
			UPDATE 
				${process.env.MYSQL_DATABASE}.${this.table}
			SET 
				name = :name, 
				image = :image, 
				description = :description, 
				address = :address,
				date_of_creation = :date_of_creation, 
				average_visit_time = :average_visit_time,
				type_of_place_id = :type_of_place_id
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

	public delete = async (data: Partial<Place>): Promise<Place | unknown> => {
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

export default PlaceRepository;
