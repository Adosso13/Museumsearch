import type Artist from "../model/artist.js";
import MySQLService from "../service/mysql_service.js";

class ArtistRepository {
	private table = "artist";

	public selectAll = async (): Promise<Artist[] | unknown> => {
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
		data: Partial<Artist>,
	): Promise<unknown | Artist> => {
		// se connecter au serveur MySQL
		const connection = await new MySQLService().connect();

		// requête SQL
		const sql = `
            SELECT 
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE 
				${this.table}.id = :id;;
        `;
		try {
			// exécuter la requête SQL principale avec l'objet littéral passé en paramètre
			const [results] = await connection.execute(sql, data);
			// récupérer le premier indice des résultats
			const result = (results as Artist[]).shift() as Artist;

			return result;
		} catch (error) {
			return error;
		}
	};

	public selectInList = async (list: string): Promise<Artist[] | unknown> => {
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
			const result = (results as Artist[]).shift() as Artist;

			return result;
		} catch (error) {
			return error;
		}
	};

	public insert = async (data: Partial<Artist>): Promise<Artist | unknown> => {
		const connection = await new MySQLService().connect();
		let sql = `
			INSERT INTO 
				${process.env.MYSQL_DATABASE}.${this.table}
			VALUES
				(NULL, :name, :image, :date_of_birth, :date_of_death, :biography, :nationality);
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

	public update = async (data: Partial<Artist>): Promise<Artist | unknown> => {
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

	public delete = async (data: Partial<Artist>): Promise<Artist | unknown> => {
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

export default ArtistRepository;
