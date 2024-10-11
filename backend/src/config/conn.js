import { Sequelize } from "sequelize"
//database  username  senha
const sequelize = new Sequelize('todo3f', 'root', 'Sen@iDev77!.', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    await sequelize.authenticate();
    console.log('A conexão foi estabelecida com sucesso.');
} catch (error) {
    console.error('Não é possível conectar-se ao banco de dados:', error);
}

export default sequelize

