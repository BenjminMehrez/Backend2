import { Router } from "express";
import ManagerProduct from "../managers/managerProduct.js";


const manager = new ManagerProduct('./src/files/productos.json')
const router = Router();


router.get("/", async (req, res) => {
    const result = await manager.consultarProductos()
    const limit = req.query.limit
    if (typeof result === "string"){
        const error = result.split(" ")
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6)})

    }
    res.status(200).json({status: "success", payload: result.slice(0, limit)})

})

router.get("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const result = await manager.getProductsById(id)
    if(typeof result === "string") {
        const error = result.split(" ")
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6)})

    }
    res.status(200).json({status: "success", payload: result})
})

router.post("/", async (req, res) => {
    const product = req.body
    const result = await manager.addProduct(product)
    if(typeof result === "string") {
        const error = result.split(" ")
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6)})

    }
    res.status(201).json({ status: "success", payload: result})
})

router.put("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const data = req.body
    const result = await manager.updateProduct(id, data)
    if(typeof result === "string") {
        const error = result.split( " ")
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6)})

    }
    res.status(200).json({ status: "success", payload: result})
})

router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const data = req.body
    const result = await manager.deleteProduct(id, data)
    if(typeof result === "string") {
        const error = result.split( " ")
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6)})

    }
    res.status(201).json({ status: "success", payload: result})
})

export default router;

