import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.APP_PORT || 5000

const app = express();
app.use(express.json());
app.use(routes);


app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
}).on('error', (err: Error) => {
  console.error(`Failed to start server: ${err.message}`);
  process.exit(1); 
});