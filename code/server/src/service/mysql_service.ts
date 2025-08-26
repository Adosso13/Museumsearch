import mysql, { type Pool } from "mysql2/promise";
class MySQLService {
// design pattern Singleton : propriété statique stockant l'instance de la classe
static instance: Pool;
public connect = async (): Promise<Pool> => {
// déstructurer les variables d'environnement
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE }:
NodeJS.ProcessEnv = process.env;
// créer un objet de configuration
const options = {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    namedPlaceholders: true,
};
// créer une connexion au serveur MySQL
// design pattern Singleton : tester si une instance existe déjà
// si aucune connexion n'existe
if (!MySQLService.instance) MySQLService.instance = mysql.createPool(options);
// si une connexion existe déjà
return MySQLService.instance;
};
}
export default MySQLService;