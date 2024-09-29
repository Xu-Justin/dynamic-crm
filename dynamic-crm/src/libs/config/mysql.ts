import 'server-only';
import mysql from 'mysql2';

export const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'db',
});

connection.connect(function (err) {
    const connectionConfig = `${connection.config.database}@${connection.config.host}:${connection.config.port}`;

    if (err) {
        console.error(`Error connecting to ${connectionConfig}`);
        return;
    }

    console.log(`Successfully connected to ${connectionConfig}`);
});

export const queryDatabase = (sql: string, params?: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

export const querySort = <T>(sorts: { key: T, asc?: boolean }[], mappers: (key: T) => string) => {
    return `ORDER BY ${sorts.map(sort => `${mappers(sort.key)}${sort.asc === true ? ' ASC' : sort.asc === false ? ' DESC' : ''}`).join(', ')}`
}

export const queryPage = (page_index: number, page_size: number): string => {
    return `LIMIT ${page_size} OFFSET ${(page_index - 1) * page_size}`;
}

export const selectOne = <T>(arr: T[]): T | null => {
    if (!arr || arr.length === 0) return null;
    return arr[0];
}

export const isExists = <T>(arr: T[]): boolean => {
    return !(!arr || arr.length === 0);
}

export const mustExists = <T>(value: T | null): T | never => {
    if (value === null) {
        throw new Error('Value not exists!');
    }
    return value;
}
