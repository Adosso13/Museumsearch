import type Role from "../model/role.js";
import type User from "../model/user.js";
import MySQLService from "../service/mysql_service.js";
import RoleRepository from "./role_repository.js";

class UserRepository {
	private table = "user";

	public selectAll = async (): Promise<User[] | unknown> => {
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

	public selectOne = async (data: Partial<User>): Promise<unknown | User> => {
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
			const result = (results as User[]).shift() as User;
			// récupérer la valeur de la clé étrangère et exécuter une requête supplémentaire
			// utiliser le modèle de l'objet en relation
			// assigner le résultat de la requête à une propriété
			result.role = (await new RoleRepository().selectOne({
				// récupérer la valeur de la clé étrangère
				id: result.role_id,
			})) as Role;
			// si besoin, cacher la propriété contenant la clé étrangère

			// renvoyer le résultat de la requête
			return result;
		} catch (error) {
			return error;
		}
	};
}

export default UserRepository;
