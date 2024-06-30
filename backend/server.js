import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import quizRouter from './routes/quizeRoutes.js';
import scoreRouter from './routes/scoreRoute.js'

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRouter);
app.use('/api/scores', scoreRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
