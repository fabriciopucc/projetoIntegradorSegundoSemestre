import mysql from 'mysql2';

const local = {
  host: "localhost",
  user: "root",
  password: "123456",
  database: "biblioteca",
}

const servidor = {
  host: "mysql.railway.internal",
  user: "root",
  password: "mwtmeHDLhsylqJfRGoIKhfqgXvBlsekt",
  database: "railway",
  port: "3306"
}

let seraLocal = true;

//Conexão com banco de dados
const conexao = mysql.createConnection((seraLocal) ? local : servidor);

conexao.connect((err) => {
  if(err) throw err;
  else console.log("Conectado com sucesso!");
})

export const consulta = (sql, valores='', mensagemReject) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, valores, (erro, resultado) => {
      if(erro){
        if(erro.code == 'ER_DUP_ENTRY'){
          const atributo = erro.sqlMessage.split(".")[1].replace("'", "").toUpperCase();
          return reject("Desculpe, este "+atributo+" já está sendo utilizado!");
        }
        return reject(mensagemReject);
      }
      const row = JSON.parse(JSON.stringify(resultado))
      return resolve(row)
    })
  })
}

export default conexao;