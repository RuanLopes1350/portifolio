import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DbConnect from '../config/DbConnect.js';
import routerAbout from '../routes/routeAbout.js';
import routerSkills from '../routes/routeSkills.js';
import routerContact from '../routes/routeContact.js';
import routerProjects from '../routes/routesProjects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1350;

app.use(cors());
app.use(express.json());

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

// Conecta ao banco de dados antes de processar requests
let dbConnected = false;

app.use(async (req, res, next) => {
    if (!dbConnected) {
        try {
            await DbConnect.conectar();
            dbConnected = true;
            console.log('Conexão com MongoDB estabelecida');
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB:', error);
            return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
        }
    }
    next();
});

// Exporta para a Vercel (serverless)
export default app;