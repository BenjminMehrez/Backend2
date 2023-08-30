import fs from 'fs';

// export const path = './src/files/productos.json'

export default class ManagerProduct {
    #path

    constructor(path) {
        this.#path = path;
        this.#crear();
    }

    async #crear() {
        if (!fs.existsSync(this.#path)) {
            await fs.promises.writeFile(this.#path, JSON.stringify([], null, '\t'));
        }
    }

    #generateId(products) {
        return products.length === 0 ? 1 : products[products.length - 1].id + 1;
    }

    async addProduct(product) {
        if (!product.titulo || 
            !product.descripcion || 
            !product.precio || 
            !product.imagen || 
            !product.categoria || 
            !product.estado ||
            !product.codigo ||
            !product.existencias) 
            {
            return "[400] Error producto incompleto";
        }
        
        if (!fs.existsSync(this.path)) {
            return '[500]  Error el archivo no existe';
        }

        let data = await fs.promises.readFile(this.#path, 'utf-8');
        let products = JSON.parse(data);
        const found = products.find(item => item.code === product.code);

        if (found) {
            return '[400] Error, mismo code';
        }

        const productToAdd = { id: this.#generateId(products), ...product };
        products.push(productToAdd);
        await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'));
        return productToAdd;
    }


    async consultarProductos(){
        if(!fs.existsSync(this.#path)) return '[500] Error el archivo no existe'
        let data = await fs.promises.readFile(this.#path, 'utf-8')
        let products = JSON.parse(data)
        return products
    }

    async getProductsById (id) {
        if(!fs.existsSync(this.#path)) return '[500] Error el archivo no existe'
        let data = await fs.promises.readFile(this.#path, 'utf-8')
        let products = JSON.parse(data)
        let product = products.find( item => item.id === id)
        if (!product) return 'Error'
        return product
    }

    async updateProduct (id, updatedProduct) {
        if(!fs.existsSync(this.#path)) return '[500] Error el archivo no existe'
        let isFound = false
        let data = await fs.promises.readFile(this.#path, 'utf-8')
        let products = JSON.parse(data)
        let newProduct = products.map(item => {
            if ( item.id === id) {
                isFound = true
                return {
                    ...item,
                    ...updatedProduct
                }
            }else{
                return item
            }
        })
        if (!isFound) return '[500] Error producto no existe'
        await fs.promises.writeFile(this.#path, JSON.stringify(newProduct, null, '\t'))
        return newProduct.find(item => item.id === id)
    }

    async deleteProduct(id) {
        if (!fs.existsSync(this.#path)) return '[500] Error el archivo no existe';
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        let products = JSON.parse(data);
        let newProducts = products.filter(item => item.id !== id);
        
        let isFound = false; 
        
        if (products.length !== newProducts.length) {
            isFound = true;
        }
    
        if (!isFound) return '[500] Error el producto no existe';
        
        await fs.promises.writeFile(this.#path, JSON.stringify(newProducts, null, '\t'));
        return newProducts;
    }
    
}








































// class ManagerProduct {
//     constructor(path) {
//         this.path = path
//     }
//     consultarProductos = async () => {
//         if (fs.existsSync(path)) {
//             const data = await fs.promises.readFile(path, 'utf-8');
//             const product = JSON.parse(data);
//             return product;
//         } else {
//             console.log('Archivo no existe');
//             return []
//         }
//     };
//     getProductsById = async (id) => {
//         const productos = await this.consultarProductos()
//         const producto = productos.find(p => p.id === id)
//         if (producto) {
//             return producto
//         } else {
//             return 'Producto no existe'
//         }
//     };
//     addProduct = async (product) => {
//         try {
//             const productos = await this.consultarProductos();
//             const {
//                 titulo,
//                 descripcion,
//                 precio,
//                 imagen = [],
//                 categoria,
//                 estado = true,
//                 codigo,
//                 existencias,
//             } = product;

//             const codigoRepetido = productos.find((p) => p.codigo === product.codigo);

//             if (
//                 !product.titulo ||
//                 !product.descripcion ||
//                 !product.precio ||
//                 !product.imagen ||
//                 !product.categoria ||
//                 !product.estado ||
//                 !product.codigo ||
//                 !product.existencias
//             ) {
//                 return "Complete todos los campos";
//             }
//             if (codigoRepetido) {
//                 return "El codigo insertado ya existe";
//             }
//             let id;
//             if (productos.length === 0) {
//                 id = 1;
//             } else {
//                 id = productos[productos.length - 1].id + 1;
//             }

//             productos.push({ ...product, id });

//             await fs.promises.writeFile(
//                 this.path,
//                 JSON.stringify(productos, null, "\t")
//             );
//             return product;
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     deleteProducts = async () => {
//         if (fs.existsSync(path)) {
//             await fs.promises.unlink(path)
//             return 'Productos ELIMINADOS'
//         } else {
//             return 'Archivo no encontrado'
//         }
//     };
//     deleteProductsById = async (id) => {
//         const productos = await this.consultarProductos()
//         const arrayProductsNew = productos.filter((p) => p.id !== id)
//         await fs.promises.writeFile(path, JSON.stringify(arrayProductsNew))
//     };
//     updateProduct = async (id, obj) => {
//         const productos = await this.consultarProductos()
//         const indexProduct = productos.findIndex(p => p.id === id)
//         if (indexProduct === -1) {
//             return 'Producto no encontrado'
//         }
//         const productUpdate = { ...productos[indexProduct], ...obj }
//         productos.splice(indexProduct, 1, productUpdate)
//         await fs.promises.writeFile(path, JSON.stringify(productos))
//     };
//     #addId = (productos) => {
//         let id
//         if (productos.length === 0) {
//             id = 1
//         } else {
//             id = productos[productos.length - 1].id + 1
//         }
//         return id
//     };
// }
