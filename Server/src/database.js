import config from './config.json';
import mongoose from 'mongoose';

async function connect() {
    try {
        await mongoose.connect(config.database.uri, { useNewUrlParser: true, useCreateIndex: true });
        console.log('Connected to the database');
    } catch(error) {
        console.log('Could not connect to the database');
    }
}

export default connect;