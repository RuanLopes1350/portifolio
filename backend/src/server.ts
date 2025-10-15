import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DbConnect from './config/DbConnect.js';
import routerAbout from './routes/routeAbout.js';
import routerSkills from './routes/routeSkills.js';
import routerContact from './routes/routeContact.js';
import routerProjects from './routes/routesProjects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1350;

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use((req, res, next) => {
  console.log('--- Nova Requisição ---');
  console.log(`- Origem: ${req.ip} \n- User-Agent: ${req.headers['user-agent']} \n${req.hostname ? `- Hostname: ${req.hostname}` : ''}`);
  console.log(`Requisição para: ${req.method} ${req.path}`);
  console.log('Horário:', new Date().toLocaleString('pt-BR', { timeZone: 'America/Manaus' }));
  console.log(`IP do usuário: ${req.ip}`);
  console.log('-----------------------');
  req.method !== 'GET' && console.log(`Body:\n ${JSON.stringify(req.body, null, 2)}`);

  next();
});

app.get('/api', (req, res) => {
    res.json({ message: 'Tamo ai!' });
})

app.get('/api/user-info', (req, res) => {
    const userIP = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Desconhecido';
    res.json({ 
        ip: userIP,
        userAgent: req.headers['user-agent'],
        timestamp: new Date().toISOString()
    });
});

app.use('/api', routerAbout);
app.use('/api', routerSkills);
app.use('/api', routerContact);
app.use('/api', routerProjects);

async function startServer() {
  try {
    await DbConnect.conectar();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();