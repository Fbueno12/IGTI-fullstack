import express from "express";
import gradesController from "../controllers/gradesController.js";

const routes = express.Router();

routes.get("/averages", gradesController.average);

routes.get("/top3", gradesController.topThree);

routes.get("/", gradesController.index);

routes.get("/:id", gradesController.find);

routes.post("/", gradesController.store);

routes.put("/:id", gradesController.update);

routes.delete("/:id", gradesController.delete);

export default routes;
