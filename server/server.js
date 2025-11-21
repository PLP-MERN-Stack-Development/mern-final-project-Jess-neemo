// server/server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load .env ONLY if not in test
if (process.env.NODE_ENV !== 'test') {
  dotenv.config();
}

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/resources', resourceRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// ONLY connect DB and start server if NOT in test mode AND file is run directly
if (process.env.NODE_ENV !== 'test') {
  const connectDB = (await import('./config/db.js')).default;
  connectDB();

  const PORT = process.env.PORT || 5000;
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  }
}

// ✅ ALWAYS export the app — even in test mode
export default app;