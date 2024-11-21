import express, { json } from "express";
import conectarAoBanco from "./src/config/dbConfig.js";

console.log(process.env.CONNECTION_STRING);
const conexao = await conectarAoBanco(process.env.CONNECTION_STRING)
// console.log(conexao.CONNECTION_STRING)
// const equipePokemon = [
//     {
//       id: 6,
//       nome: "Charizard",
//       tipo: ["Fogo", "Voador"],
//       descricao: "Uma forma evoluída final de Charmander, conhecido por seu poder de fogo.",
//       imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png"
//     },
//     {
//       id: 131,
//       nome: "Lapras",
//       tipo: ["Água", "Psiquico"],
//       descricao: "Um Pokémon aquático gentil e inteligente, com poderes psíquicos.",
//       imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/131.png"
//     },
//     {
//       id: 25,
//       nome: "Pikachu",
//       tipo: ["Elétrico"],
//       descricao: "O parceiro de Ash Ketchum, um Pokémon elétrico muito popular.",
//       imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png"
//     },
//     {
//       id: 145,
//       nome: "Zapdos",
//       tipo: ["Elétrico", "Voador"],
//       descricao: "Um dos três pássaros lendários, conhecido por seus poderosos ataques elétricos.",
//       imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/145.png"
//     },
//     {
//       id: 94,
//       nome: "Gengar",
//       tipo: ["Fantasma", "Veneno"],
//       descricao: "Um Pokémon fantasma travesso e poderoso, conhecido por seus ataques sorrateiros.",
//       imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/094.png"
//     },
//     {
//       id: 134,
//       nome: "Vaporeon",
//       tipo: ["Água"],
//       descricao: "A evolução de Eevee do tipo água, conhecido por sua habilidade de controlar a água.",
//       imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/134.png"
//     },
//     {
//       id: 149,
//       nome: "Dragonite",
//       tipo: ["Dragão", "Voador"],
//       descricao: "Um Pokémon pseudo-lendário do tipo dragão, conhecido por sua força e velocidade.",
//       imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/149.png"
//     },
//     {
//       id: 9,
//       nome: "Blastoise",
//       tipo: ["Água"],
//       descricao: "A evolução final de Squirtle, conhecido por seus poderosos canhões de água.",
//       imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png"
//     },
//     {
//       id: 448,
//       nome: "Lucario",
//       tipo: ["Aço", "Lutador"],
//       descricao: "Um Pokémon com a capacidade de sentir a aura e prever os movimentos do oponente.",
//       imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/448.png"
//     },
//     {
//       id: 445,
//       nome: "Garchomp",
//       tipo: ["Dragão", "Terra"],
//       descricao: "Um Pokémon pseudo-lendário do tipo dragão e terra, conhecido por sua força e velocidade.",
//       imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/445.png"
//     }
//   ];

const app = express();
app.use(express.json());

app.listen(3000,()=>{
    console.log("Servidor Escutando...");
});

async function getEquipePokemon() {
  const db = conexao.db("InstaLike");
  const colecao = db.collection("equipePokemon");  
  return colecao.find().toArray();
}

app.get("/equipePokemon", async(req,res)=>{
    const equipePokemon = await getEquipePokemon();
    res.status(200).json(equipePokemon);
});

// function buscarIndexPorPokedexId(id){
//     return equipePokemon.findIndex((Pokemon)=>{
//         return Pokemon.pokedexId=== Number(id);
//     });
// }

// app.get("/equipePokemon/:id", async(req,res)=>{
//     const equipePokemon = await getEquipePokemon();
//     const index = buscarIndexPorPokedexId(req.params.id);
//     res.status(200).json(equipePokemon[index]);
// });
