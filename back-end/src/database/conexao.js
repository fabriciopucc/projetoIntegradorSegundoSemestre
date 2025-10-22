import mysql from 'mysql2';

const local = {
  host: "localhost",
  user: "root",
  password: "123456",
  database: "biblioteca",
  port: "3306"
}

const servidor = {
  host: "gondola.proxy.rlwy.net",
  user: "root",
  password: "mwtmeHDLhsylqJfRGoIKhfqgXvBlsekt",
  database: "railway",
  port: "46786"
}

let seraLocal = false;

//Conexão com banco de dados
const conexao = mysql.createConnection((seraLocal) ? local : servidor);

conexao.connect((err) => {
  if(err) throw err;
  else console.log("Conectado com sucesso!");
})

export const consulta = (sql, valores='', mensagemReject) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, valores, (erro, resultado) => {
      if(erro) return reject(mensagemReject);
      const row = JSON.parse(JSON.stringify(resultado))
      return resolve(row)
    })
  })
}

export default conexao;