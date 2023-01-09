module.exports = {
  HOST: 'localhost',
  utilisateur: 'test',
  PASSWORD: 'Thr123',
  DB: 'testdb',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

//Ceci est le fichier de configuration pour la base de données définissant le nom d'utilisateur, le mot de passe et le nom de la base de données
