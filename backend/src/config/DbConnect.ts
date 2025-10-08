import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

class DbConnect {
    static async conectar() {
        try {
            let mongoUri = process.env.MONGO_URI;
            console.log('Conectando ao MongoDB...');
            if (!mongoUri) {
                throw new Error('MONGO_URI não está definido nas variáveis de ambiente.');
            }
            await mongoose.connect(mongoUri);
            console.log('Conexão com o MongoDB estabelecida com sucesso.');

            mongoose.connection.on('connected', () => {
            });

            mongoose.connection.on('error', (err) => {
            });

            mongoose.connection.on('disconnected', () => {
            });

            await mongoose.connect(mongoUri).then(() =>
                console.log('Conexão com o banco de dados bem sucedida!')
            )
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB:', error);
            throw error;
        }
    }

    static async desconectar() {
        try {
            await mongoose.disconnect();
            console.log('Conexão com o banco de dados encerrada sem erros!')
        } catch (erro) {
            console.error('Erro ao desconectar do banco!')
            throw erro;
        }
    }
}

export default DbConnect;