import type TypeOfWork from "../model/type_of_work.js";
import MySQLService from "../service/mysql_service.js";

class TypeOfWorkRepository {
	private table = "type_of_work";

	public selectAll = async (): Promise<TypeOfWork[] | unknown> => {
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
		data: Partial<TypeOfWork>,
	): Promise<unknown | TypeOfWork> => {
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
			const result = (results as TypeOfWork[]).shift() as TypeOfWork;

			return result;
		} catch (error) {
			return error;
		}
	};

	public selectInList = async (
		list: string,
	): Promise<TypeOfWork[] | unknown> => {
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
			const result = (results as TypeOfWork[]).shift() as TypeOfWork;

			return result;
		} catch (error) {
			return error;
		}
	};

	public insert = async (
		data: Partial<TypeOfWork>,
	): Promise<TypeOfWork | unknown> => {
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
		data: Partial<TypeOfWork>,
	): Promise<TypeOfWork | unknown> => {
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
		data: Partial<TypeOfWork>,
	): Promise<TypeOfWork | unknown> => {
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

export default TypeOfWorkRepository;
