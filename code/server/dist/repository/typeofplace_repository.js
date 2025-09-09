import MySQLService from "../service/mysql_service.js";
class TypeOfPlaceRepository {
    // Nom de la table SQL
    table = "type_of_place";
    // Récupérer tous les enregistrements
    // async: créer une promesse
    // La fonction renvoie un objet unknow lorsqu'une erreur est renvoyée
    selectAll = async () => {
        //  Connexion au serveur MySQL
        const connection = await new MySQLService().connect();
        // Resquête SQL
        const sql = `
            SELECT
                ${this.table}.* 
            FROM
                ${process.env.MYSQL_DATABASE}.${this.table};
        `;
        // Exécuter la requête
        // try / catch: permet d'exécuter une instruction, si l'instruction échoue, une erreur est récupérer
        try {
            // Récupérer les resultats de la requete
            // results représente le premier indice du array renvoyé
            const [results] = await connection.execute(sql);
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
            }
            // Si la requête à réussi
            return results;
        }
        catch (error) {
            // Si la requete à échoué
            return error;
        }
    };
    // Récupérer les enregistrements par liste d'ID
    selectInList = async (list) => {
        const connection = await new MySQLService().connect();
        //  selectioner une reqÃªte service.* from garagecrisservice_dev WHERE service.id IN (1,2)
        const sql = `
            SELECT 
                ${this.table}.*
            FROM
                ${process.env.MYSQL_DATABASE}.${this.table}
            WHERE
                ${this.table}.id IN (${list});
        `;
        try {
            const [results] = await connection.execute(sql);
            // for (let i = 0; i < (results as Service[]).length; i++) {
            //     const result = (results as Service[])[i];
            // console.log(result);
            return results;
        }
        catch (error) {
            return error;
        }
    };
    selectOne = async (data) => {
        //  Connexion au serveur MySQL
        const connection = await new MySQLService().connect();
        // Resquête SQL
        const sql = `
            SELECT
                ${this.table}.* 
            FROM
                ${process.env.MYSQL_DATABASE}.${this.table}
            WHERE
               ${this.table}.id = :id 
              ;
        `;
        // Exécuter la requête
        // try / catch: permet d'exécuter une instruction, si l'instruction échoue, une erreur est récupérer
        try {
            const [results] = await connection.execute(sql, data);
            const result = results.shift();
            return result;
        }
        catch (error) {
            return error;
        }
    };
    insert = async (data) => {
        const connection = await new MySQLService().connect();
        let sql = `
		INSERT INTO
			${process.env.MYSQL_DATABASE}.${this.table}
		VALUES
			(NULL, :name);
		`;
        try {
            // Démarrer la transaction
            connection.beginTransaction();
            // Exécuter la requête
            await connection.execute(sql, data);
            sql = `SET @id = LAST_INSERT_ID();`;
            await connection.execute(sql);
            connection.commit();
            return { success: true };
        }
        catch (error) {
            connection.rollback();
            return error;
        }
    };
    update = async (data) => {
        const connection = await new MySQLService().connect();
        const sql = `
		UPDATE ${process.env.MYSQL_DATABASE}.${this.table}
		SET 
		name = :name
		WHERE id = :id;
		`;
        try {
            await connection.execute(sql, data);
            return { message: "Statut du TypeofPlace mis à jour avec succès" };
        }
        catch (error) {
            return error;
        }
    };
    delete = async (data) => {
        const connection = await new MySQLService().connect();
        const sql = `
			DELETE FROM ${process.env.MYSQL_DATABASE}.${this.table}
			WHERE id = :id;
		`;
        try {
            await connection.execute(sql, data);
            return { message: "Suppression du TypeofPlace fait avec succès" };
        }
        catch (error) {
            return error;
        }
    };
}
export default TypeOfPlaceRepository;
