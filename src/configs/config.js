import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const getConnection = () => {
    mongoose
        .connect(process.env.MONGODATABASE_URI)
        .then(() => {
            console.log('Successful connection to the database');
        })
        .catch((err) => {
            console.log(err, 'Connect error');
        });
};

export default getConnection;
