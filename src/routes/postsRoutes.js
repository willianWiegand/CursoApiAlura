// Importa o framework Express para criar a aplicação web.
import express from "express";

// Importa o middleware multer para tratar uploads de arquivos.
import multer from "multer";

// Importa as funções controladoras do arquivo postsController.js
import { IncluirPokemonEquipe, listarEquipePokemon, uploadImagem } from "../controllers/postsController.js";

// Configura o armazenamento de arquivos para o multer.
// - Define a pasta 'uploads/' como destino para os arquivos.
// - Utiliza o nome original do arquivo como nome final.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

// Cria uma instância do multer utilizando o storage configurado.
// - Define a pasta temporária para armazenamento inicial dos arquivos.
const upload = multer({ dest: "./uploads", storage })

// Define as rotas da aplicação.
const routes = (app) => {
  // Habilita o middleware express.json() para interpretar requisições JSON.
  app.use(express.json());

  // Rota GET para listar a equipe Pokemon.
  // - Chama a função listarEquipePokemon do controlador.
  app.get("/equipePokemon", listarEquipePokemon);

  // Rota POST para incluir um novo Pokémon na equipe.
  // - Chama a função IncluirPokemonEquipe do controlador.
  // - Recebe dados do novo Pokémon no corpo da requisição.
  app.post("/equipePokemon", IncluirPokemonEquipe);

  // Rota POST para fazer upload da imagem de um Pokémon.
  // - Utiliza o middleware upload.single("imagem") para tratar o upload da imagem.
  // - Chama a função uploadImagem do controlador após o upload da imagem.
  app.post("/upload", upload.single("imagem"), uploadImagem)
}

// Exporta a função routes para uso em outros arquivos.
export default routes;