import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

class DbConnect {
    static async conectar() {
        try {
            let environment = process.env.NODE_ENV
            console.log(`Rodando em ambiente: ${environment}`)
            let mongoUri
            mongoUri = process.env.MONGO_URI;
            console.log(mongoUri)
            if (!mongoUri) {
                throw new Error("A variável de ambiente DB_URL não está definida.")
            }

            mongoose.connection.on('connected', () => {
            });

            mongoose.connection.on('error', (err) => {
            });

            mongoose.connection.on('disconnected', () => {
            });

            await mongoose.connect(mongoUri).then( () =>
                console.log('Conexão com o banco de dados bem sucedida!')
            )

        } catch (erro) {
            console.error('Erro ao conectar ao banco!')
            throw erro;
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