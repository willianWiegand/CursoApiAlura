import { getEquipePokemon } from "../models/postsModels.js";

export async function listarEquipePokemon (req, res)
{
    const equipePokemon =  await getEquipePokemon();
    res.status(200).json(equipePokemon);
}