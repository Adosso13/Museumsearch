import MySQLService from "../service/mysql_service.js";
import ArtistRepository from "./artist_repository.js";
import PlaceRepository from "./place_repository.js";
import TypeOfWorkRepository from "./typeofwork_repository.js";
class WorkOfArtRepository {
    table = "work_of_art";
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
                ${process.env.MYSQL_DATABASE}.${this.table};
        `;
        try {
            // exécuter la requête SQL principale avec l'objet littéral passé en paramètre
            const [results] = await connection.execute(sql, data);
            // récupérer le premier indice des résultats
            const result = results.shift();
            // récupérer la valeur de la clé étrangère et exécuter une requête supplémentaire
            // utiliser le modèle de l'objet en relation
            // assigner le résultat de la requête à une propriété
            result.artist = (await new ArtistRepository().selectOne({
                // récupérer la valeur de la clé étrangère
                id: result.artist_id,
            }));
            result.type_of_work = (await new TypeOfWorkRepository().selectOne({
                // récupérer la valeur de la clé étrangère
                id: result.type_of_work_id,
            }));
            result.place = (await new PlaceRepository().selectOne({
                // récupérer la valeur de la clé étrangère
                id: result.place_id,
            }));
            // si besoin, cacher la propriété contenant la clé étrangère
            // renvoyer le résultat de la requête
            return result;
        }
        catch (error) {
            return error;
        }
    };
    selectInList = async (list) => {
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
            const result = results.shift();
            return result;
        }
        catch (error) {
            return error;
        }
    };
}
export default WorkOfArtRepository;
