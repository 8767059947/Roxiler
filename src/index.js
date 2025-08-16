import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import storeRouter from './routes/store.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors()); // CORS 


app.use(express.json());

// Routes ko register karein
app.use("/api/v1/users", userRouter);
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/dashboard", dashboardRouter);


app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});