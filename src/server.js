import express from "express";
import { db, connectDB } from './db.js';
import fs from 'fs';
import admin from 'firebase-admin';
import 'dotenv/config';

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// let articlesInfo = [{
//     name: 'learn-react',
//     upvotes: 0,
//     comments: [],
// },{
//     name: 'learn-node',
//     upvotes: 0,
//     comments: [],
// },{
//     name: 'mongodb',
//     upvotes: 0,
//     comments: [],
// }]


const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());
// This line for hosting frontend + backend
app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

// till here

app.use( async (req, res, next) => {
    const { authtoken } = req.headers;
    if(authtoken){
        try{
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch(e){
            return res.sendStatus(400);
        }
    }

    req.user = req.user || {};

    next();
});

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if(article){
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        res.json(article);
    } else {
        res.sendStatus(404);
    }

})

// app.post('/hello', (req, res) => {
//     console.log(req.body);
//     res.send(`Hello ${req.body.name}!`);
// });

// app.get('/hello/:name', (req, res) => {
//     const {name} = req.params;
//     res.send(`Hello ${name}!!`);
// });

app.use((req, res, next) => {
    if(req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const {name} = req.params;
    const { uid } = req.user;
    // const article = articlesInfo.find(a => a.name ===name);
    const article = await db.collection('articles').findOne({ name });

    if(article){
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);

        if(canUpvote){
            await db.collection('articles').updateOne({ name },{
                $inc: { upvotes: 1 },
                $push: {upvoteIds: uid},
            });
        }
    }
    const updatedArticle = await db.collection('articles').findOne({ name });

    if(article) {
        res.json(updatedArticle);
    } else {
        res.send('That Article does not exist.');
    }
    
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    const { email } = req.user;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy: email, text } },
    });

    const article = await db.collection('articles').findOne({ name });

    if(article) {
        res.json(article);
    } else {
        res.send('That article does not exist.');
    }
});

//Add Blog
app.post('/api/articles/addpost', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    const { email } = req.user;

    await db.collection('articledetails').insertOne({ name }, {
        $push: { title:  req.title},
        $push: { postedBy: email},
    });

    const article = await db.collection('articles').findOne({ name });

    if(article) {
        res.json(article);
    } else {
        res.send('That article does not exist.');
    }
});

const PORT = process.env.PORT || 8000;

// This will not let the server run until, it is connected to DB
connectDB(() => {
    console.log('Successfully connected database!!!');
    app.listen(PORT, () => {
        console.log("Server is listening on port "+PORT);
    });
})