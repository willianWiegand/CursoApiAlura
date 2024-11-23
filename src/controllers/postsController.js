import { getEquipePokemon, incluirPokemonNovo, updatePokemon } from "../models/postsModel.js";
import fs from "fs";

// Função para listar toda a equipe de Pokémon armazenada no banco de dados.
export async function listarEquipePokemon (req, res){
    // Chama a função do modelo para buscar a equipe de Pokémon.
    const equipePokemon = await getEquipePokemon();
    // Retorna a equipe de Pokémon como resposta HTTP com status 200 (sucesso).
    res.status(200).json(equipePokemon);
}

// Função para incluir um novo Pokémon na equipe.
export async function incluirPokemonEquipe(req,res) {
    // Obtém os dados do novo Pokémon do corpo da requisição.
    const novoPokemon = req.body;
    try {
        // Chama a função do modelo para inserir o novo Pokémon no banco de dados.
        const pokemonIncluido = await incluirPokemonNovo(novoPokemon);
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
        const pokemonIncluido = await incluirPokemonNovo(novoPokemon);
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

export async function atualizarNovoPokemonEquipe(req,res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    const pokemon = {
        nome: req.body.nome,
        tipo: req.body.tipo,
        descricao: req.body.descricao,
        urlImagem: urlImagem,
        alt: req.body.alt,
        pokedexId: req.body.pokedexId
    }
    try {
        const pokemonAtualizado = await updatePokemon(id,pokemon);
        res.status(200).json(pokemonAtualizado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha ao atualizar"});
    }
}

// export async function updateImagem(req,res) {
//     const novoPokemon = req.body;
//     try {
//         const pokemonIncluido = await IncluirPokemonNovo(novoPokemon);
//         const imagemAtualizada = `uploads/${pokemonIncluido.insertedId}.png`;
//         fs.renameSync(req.file.path, imagemAtualizada);
//         res.status(200).json(pokemonIncluido);
//     } catch (erro) {
//         console.error(erro.message);
//         res.status(500).json({"Erro":"Falha ao atualizar"});
//     }
// }