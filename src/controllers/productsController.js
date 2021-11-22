import Product from '../models/Product'

export const createProduct = async (req, res) => {
    
    const { name, category, price, imgURL } = req.body;

    try {
        const newProduct = new Product({ name, category, price, imgURL });

        //Guardamos en la base de datos
        const productSave = await newProduct.save();

        res.status(201).json(productSave);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
};

export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });    //new: true para coger los datos actualizados
    res.status(200).json(updatedProduct);
};

export const deleteProductById = async (req, res) => {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(204).json();
};