import { Router } from "express";
import ManagerProduct, { path } from "../managers/managerProduct.js";
import __dirname from "../utils.js";


const manager = new ManagerProduct(__dirname + path)
const router = Router();

router.get('/:pid', async (req, res) => {
    let id = Number(req.params.pid);
    const productos = await manager.getProductsById(id);
    res.send({ productos })
});

router.delete('/:pid', async (req, res) => {
    let id = Number(req.params.pid);
    const product = await manager.deleteProducts(id);
    res.send({ status: "success" })
});

router.put('/:pid', async (req, res) => {
    let id = Number(req.params.pid);
    const { titulo, descripcion, precio, imagen, categoria, estado, codigo, existencias } = req.body
    await manager.updateProduct(id, { titulo, descripcion, precio, imagen, categoria, estado, codigo, existencias });
    res.send({ status: "success" })
})

router.post('/', async (req, res) => {
    const { titulo, descripcion, precio, imagen, categoria, estado, codigo, existencias } = req.body;
    await manager.addProduct(
        titulo, 
        descripcion, 
        precio, 
        imagen, 
        categoria, 
        estado, 
        codigo, 
        existencias
    );
    res.send({ status: "success" });
});

router.get('/', async (req, res) => {
    const products = await manager.consultarProductos();
    const limit = Number(req.query.limit);

    if (!limit) {
        res.send({ products });
    } else {
        const limitedProducts = products.slice(0, limit);
        res.send({ limitedProducts });
    };
});

export default router; 
























































// router.get('/', async (req, res) => {
//     const {limit} = req.query;
//     const productos = await manager.consultarProductos();
//     if (limit) {
//         const limited = productos.slice(0, limit);
//         res.status(200).json(limited)
//     }else {
//         res.status(200).json(productos)
//     }
// })

// router.get("/:pid", async (req, res) => {
//     const id = parseInt(req.params.pid);
//     const producto = await manager.getProductsById(id);
//     if (producto) {
//         res.status(200).json(producto);
//     } else {
//         res.status(400).json({ message: "Producto no encontrado" });
//     }
// });

// router.post('/', async (req, res) => {

//     try {
//         const producto = await manager.addProduct(req.body);
//         if (producto === "El codigo ingresado ya existe") {
//             res.status(400).json({ message: "Error al crear el producto", producto });
//         } else if (producto === "Complete todos los campos") {
//             res.status(400).json({ message: "Error al crear el producto", producto });
//         } else {
//             res.status(201).json({ message: "Producto creado", producto });
//         }
//     } catch (error) {
//         throw new error("Error al crear el producto", error);
//     }
// });

// router.put('/:pid', async (req, res) => {
//     const id = parseInt(req.params.pid);
//     const producto = await manager.updateProduct(id, req.body);
//     if (producto) {
//         res.status(200).json({ message: "Producto actualizado", producto });
//     }else {
//         res.status(400).json({ message: "Error no se pudo actualizar", producto });
//     }
// })


// export default router; 