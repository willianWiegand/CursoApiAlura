import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.CONNECTION_STRING);

export async function getEquipePokemon() {
    const db = conexao.db("InstaLike");
    const colecao = db.collection("equipePokemon");  
    return colecao.find().toArray();
  }