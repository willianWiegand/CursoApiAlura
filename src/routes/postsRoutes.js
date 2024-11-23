import express from "express";
import multer from "multer";
import { atualizarNovoPokemonEquipe, incluirPokemonEquipe, listarEquipePokemon, uploadImagem } from "../controllers/postsController.js";

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

 
  app.get("/equipePokemon", listarEquipePokemon);
  app.post("/equipePokemon", incluirPokemonEquipe);
  app.post("/upload", upload.single("imagem"), uploadImagem)
  app.put("/upload/:id",upload.single("imagem"), atualizarNovoPokemonEquipe)
}

// Exporta a função routes para uso em outros arquivos.
export default routes;