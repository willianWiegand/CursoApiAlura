import { getEquipePokemon, IncluirPokemonNovo } from "../models/postsModel.js";

export async function listarEquipePokemon (req, res){
    const equipePokemon =  await getEquipePokemon()
    res.status(200).json(equipePokemon);
}

export async function IncluirPokemonEquipe(req,res) {
    const novoPokemon = req.body;
    try{
        const pokemonIncluido = await IncluirPokemonNovo(novoPokemon);
        res.status(200).json(pokemonIncluido);  
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha ao enviar"});
    }    
}