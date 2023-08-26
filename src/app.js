import express from "express";
import productosRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'


const app = express();
const PORT = 8080; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', productosRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => {
    console.log('Servidor arriva')
})

