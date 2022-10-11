import { ConnectionOptions } from 'typeorm';


const config: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'certificates',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
};

export default config;