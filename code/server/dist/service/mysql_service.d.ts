import mysql from "mysql2/promise";
declare class MySQLService {
    private static connection;
    connect: () => Promise<mysql.PoolConnection>;
}
export default MySQLService;
//# sourceMappingURL=mysql_service.d.ts.map