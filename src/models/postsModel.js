import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.CONNECTION_STRING);

export async function getEquipePokemon() {
  const db = conexao.db("InstaLike");
  const colecao = db.collection("equipePokemon");  
  return colecao.find().toArray();
}

export async function incluirPokemonNovo(novoPokemon) {
  const db = conexao.db("InstaLike");
  const colecao = db.collection("equipePokemon");  
  return colecao.insertOne(novoPokemon);  
}
export async function updatePokemon(id, pokemon) {
  const db = conexao.db("InstaLike");
  const colecao = db.collection("equipePokemon");  
  const objId = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id:new ObjectId(objId)}, {$set:pokemon});  
}
