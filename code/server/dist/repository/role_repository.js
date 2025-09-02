import MySQLService from "../service/mysql_service.js";
class RoleRepository {
    table = "role";
    selectAll = async () => {
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
        }
        catch (error) {
            return error;
        }
    };
    selectOne = async (data) => {
        // se connecter au serveur MySQL
        const connection = await new MySQLService().connect();
        // requête SQL
        const sql = `
            SELECT 
                ${this.table}.*
            FROM 
                ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE
               ${this.table}.id = :id 
              ;
        `;
        try {
            // exécuter la requête SQL principale avec l'objet littéral passé en paramètre
            const [results] = await connection.execute(sql, data);
            // récupérer le premier indice des résultats
            const result = results.shift();
            return result;
        }
        catch (error) {
            return error;
        }
    };
}
export default RoleRepository;
