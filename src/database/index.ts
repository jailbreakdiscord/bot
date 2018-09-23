import { createConnection } from 'typeorm';

import { Configuration } from '../Config';

export function connect() {
    return createConnection({
        entities: [__dirname + '/entities/*.js'],
        ...Configuration.database
    });
}
