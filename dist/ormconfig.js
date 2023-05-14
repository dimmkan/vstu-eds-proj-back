"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log(process.env.DB_HOST);
const config = {
    type: 'mysql',
    host: String(process.env.DB_HOST),
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'certificates',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map