import { ConnectionOptions } from 'typeorm';


const config: ConnectionOptions = {
    type: 'mysql',
    host: '0.0.0.0',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'certificates',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
};

export default config;