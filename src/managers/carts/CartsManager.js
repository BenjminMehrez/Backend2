import fs from 'fs';
import ManagerProduct from '../managerProduct.js';


const manager = new ManagerProduct('./src/files/productos.json');

class CartManager {

    constructor(){
        this.cartPath = './src/files/carts.json';
        this.#crear()
    }

    async #crear() {
        if (!fs.existsSync(this.cartPath)){
            await fs.promises.writeFile(this.cartPath, JSON.stringify([], null, '\t'))
        }
    }

    #generateId(data){
        return data.length === 0 ? 1 : data[data.length - 1].id + 1;
    }

    async createCart(){
        if(!fs.existsSync(this.cartPath)) return "[500] DB file does not exists."
        let data = await fs.promises.readFile(this.cartPath, "utf-8")
        let carts = JSON.parse(data)
        const cartToAdd = {id: this.#generateId(carts), products: []}
        carts.push(cartToAdd)
        await fs.promises.writeFile(this.cartPath, JSON.stringify(carts, null, '\t'))
        return cartToAdd
    }

    async getProducts(id){
        if(!fs.existsSync(this.cartPath)) return "[500] DB file does not exists."
        let data = await fs.promises.readFile(this.cartPath, "utf-8")
        let carts = JSON.parse(data)
        let cart = carts.find(item => item.id === id)
        if(!cart) return "[404] not found"
        return cart
    }
    async addProductToCart(cid, pid) {
        if (!fs.existsSync(this.cartPath)) return "[500] DB file does not exists."
        const result = await manager.getProductsById(pid)
        if (typeof result == "string") return `[404] product with ID=${pid} was not found`
        const cart = await this.getProducts(cid)
        if(typeof cart == "string") return `[404] cart with ID=${cid} was not found`
        const productIndex = cart.products.findIndex(item => item.product === pid)
        if (productIndex >= 0) {
            cart.products[productIndex].quantity += 1
        }else{
            cart.products.push({ product: pid, quantity: 1});
        }
        let data = await fs.promises.readFile(this.cartPath, "utf-8")
        let carts = JSON.parse(data)
        carts = carts.map(item => {
            if (item.id === cid) {
                return cart
            } else {
                return item
            }
        })
        await fs.promises.writeFile(this.cartPath, JSON.stringify(carts, null, '\t'))
        return cart
    }
}

export default CartManager;














// class CartManagere34 {
//     constructor() {
//         this.cartPath = './src/files/carrito.json';
//         this.cartModel = {
//             products: []
//         }
//     }

//     addID = async (cart) => {
//         const rawdata = await fs.promises.readFile(this.cartPath, 'utf-8')
//         const data = JSON.parse(rawdata, null, "\n")
//         if (data.length === 0) {
//             cart.id = 0;
//         } else {
//             cart.id = data[data.length - 1].id + 1;
//             return cart;
//         }
//     }

//     newCart = async () => {
//         const cart = this.cartModel;

//         let rawdata = await fs.promises.readFile(this.cartPath, 'utf-8');
//         let data = JSON.parse(rawdata, null, "\n");

//         this.addID(cart);
//         data.push(cart);

//         let newCart = data;

//         await fs.promises.writeFile(this.cartPath, JSON.stringify(newCart, null, '\t'));
//     }

//     getCartById = async (id) => {
//         try {
//             const rawdata = await fs.promises.readFile(this.cartPath, 'utf-8')
//             let data = JSON.parse(rawdata).find(cart => cart.id === id)
//             if (!data) {
//                 throw new Error("No funciona")
//             } else {
//                 return data;
//             }
//         } catch (error) {
//             return error.message;
//         }
//     }

//     addToCart = async (cId, product) => {
//         try {
//             const rawdata = await fs.promises.readFile(this.cartPath, 'utf-8');
//             const data = JSON.parse(rawdata);
//             if (!data) {
//                 throw new Error("No funciona");
//             };

//             data.map((object) => {
//                 if (cId === object.id) {
//                     const index = object.products.findIndex(p => p.id === product.id);

//                     if (index >= 0) {
//                         object.products[index].quantity += 1;
//                     } else {
//                         object.products.push({ id: product.id, quantity: 1 });
//                     }
//                 }
//             });

//             await fs.promises.writeFile(this.cartPath, JSON.stringify(data, null, '\t'));

//         } catch (error) {
//             return error.message;
//         }
//     }
// }
