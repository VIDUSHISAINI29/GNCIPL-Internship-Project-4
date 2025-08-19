import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

import {connectDb} from './src/config/db.js';
import routes from './src/routes/index.js';

const app = express();

const port = process.env.PORT;


app.use(cors({
  origin: process.env.FRONTEND_URL, // React app URL (adjust if different)
  credentials: true,  // if you want to send cookies or auth headers
}));

app.use(express.json());
app.use(routes);

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`server in running on http://localhost:${port}`);
    });
});
