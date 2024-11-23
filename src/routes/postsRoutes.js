import express from "express";
import { listarEquipePokemon } from "../controllers/postsController.js";

const routes = (app) => {
    app.use(express.json());
    
    app.get("/equipePokemon", listarEquipePokemon);
}

export default routes;