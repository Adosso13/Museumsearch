import type TypeofPlace from "../model/type_of_place.js";
import MySQLService from "../service/mysql_service.js";

class TypeOfPlaceRepository {
	private table = "type_of_place";

	public selectAll = async (): Promise<TypeofPlace[] | unknown> => {
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
		data: Partial<TypeofPlace>,
	): Promise<unknown | TypeofPlace> => {
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
			const result = (results as TypeofPlace[]).shift() as TypeofPlace;

			return result;
		} catch (error) {
			return error;
		}
	};

	public selectInList = async (
		list: string,
	): Promise<TypeofPlace[] | unknown> => {
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
			const result = (results as TypeofPlace[]).shift() as TypeofPlace;

			return result;
		} catch (error) {
			return error;
		}
	};
}

export default TypeOfPlaceRepository;
