import express from "express";
import { IncluirPokemonEquipe, listarEquipePokemon } from "../controllers/postsController.js";

const routes = (app) => {
    app.use(express.json());
    
    app.get("/equipePokemon", listarEquipePokemon);

    app.post("/equipePokemon", IncluirPokemonEquipe)
}

export default routes;