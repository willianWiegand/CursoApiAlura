import { getEquipePokemon, IncluirPokemonNovo } from "../models/postsModel.js";
import fs from "fs";

// Função para listar toda a equipe de Pokémon armazenada no banco de dados.
export async function listarEquipePokemon (req, res){
    // Chama a função do modelo para buscar a equipe de Pokémon.
    const equipePokemon = await getEquipePokemon();
    // Retorna a equipe de Pokémon como resposta HTTP com status 200 (sucesso).
    res.status(200).json(equipePokemon);
}

// Função para incluir um novo Pokémon na equipe.
export async function IncluirPokemonEquipe(req,res) {
    // Obtém os dados do novo Pokémon do corpo da requisição.
    const novoPokemon = req.body;
    try {
        // Chama a função do modelo para inserir o novo Pokémon no banco de dados.
        const pokemonIncluido = await IncluirPokemonNovo(novoPokemon);
        // Retorna o Pokémon recém-inserido como resposta HTTP com status 200 (sucesso).
        res.status(200).json(pokemonIncluido);
    } catch (erro) {
        // Caso ocorra algum erro durante a inserção, loga o erro no console e retorna uma mensagem de erro ao usuário.
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha ao enviar"});
    }
}

// Função para fazer upload da imagem de um Pokémon.
export async function uploadImagem(req,res) {
    // Obtém os dados do novo Pokémon do corpo da requisição.
    const novoPokemon = req.body;
    try {
        // Insere o novo Pokémon no banco de dados.
        const pokemonIncluido = await IncluirPokemonNovo(novoPokemon);
        // Cria o nome do arquivo da imagem com base no ID inserido.
        const imagemAtualizada = `uploads/${pokemonIncluido.insertedId}.png`;
        // Move o arquivo da imagem temporária para o destino final.
        fs.renameSync(req.file.path, imagemAtualizada);
        // Retorna o Pokémon recém-inserido como resposta HTTP com status 200 (sucesso).
        res.status(200).json(pokemonIncluido);
    } catch (erro) {
        // Caso ocorra algum erro durante o upload, loga o erro no console e retorna uma mensagem de erro ao usuário.
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha ao enviar"});
    }
}