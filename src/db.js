import { MongoClient } from "mongodb";
let db;

async function connectDB(cb) {
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.u1aeexl.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();

    db = client.db('react-blog-db');

    cb();
}

export {
    db,
    connectDB,
}
