import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import cors from 'cors';
import { exec } from 'child_process';

dotenv.config();

const port = process.env.APP_PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

// Função para verificar se um contêiner específico está em execução
function checkDockerContainer(containerName: string) {
  exec('docker ps --filter "name=' + containerName + '" --format "{{.Names}}"', (err, stdout, stderr) => {
    if (err) {
      console.error('Erro ao verificar contêiner:', stderr);
      return;
    }
    if (stdout.trim()) {
      console.log(`O contêiner '${containerName}' está em execução.`);
    } else {
      console.log(`O contêiner '${containerName}' não está em execução.`);
    }
  });
}

// Verifique se o contêiner 'postgres-ingresso' está em execução
checkDockerContainer('postgres-ingresso');

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
}).on('error', (err: Error) => {
  console.error(`Failed to start server: ${err.message}`);
  process.exit(1);
});
