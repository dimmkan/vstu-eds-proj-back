import { ConnectionOptions } from 'typeorm';


const config: ConnectionOptions = {
    type: 'mysql',
    host: String(process.env.DB_HOST),
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'certificates',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
};

export default config;