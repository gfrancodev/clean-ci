import express from 'express';
import user_route from './routes/user';

const app = express();

app.use(express.json());
app.use(user_route);

export default app;
