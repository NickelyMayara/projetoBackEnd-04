import { Router } from "express";
import { create, getAll, getTarefa, getTarefaStatus, updateStatusTarefa, updateTarefa } from "../controller/tarefaController.js";

const router = Router()

router.get("/", getAll)
router.post("/", create)
router.get("/:id", getTarefa)
router.put("/:id", updateTarefa)
router.patch("/:id/status", updateStatusTarefa)
router.get("/status/:situacao", getTarefaStatus)

export default router
