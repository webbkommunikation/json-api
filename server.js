const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const FILE_PATH = './products.json';

app.use(express.json());

function readProducts() {
    const data = fs.readFileSync(FILE_PATH);
    return JSON.parse(data);
}

function writeProducts(products) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(products, null, 2));
}

// GET all products
app.get('/products', (req, res) => {
    const products = readProducts();
    res.json(products);
});

// GET a single product by ID
app.get('/products/:id', (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));
    product ? res.json(product) : res.status(404).send({ message: 'Product not found' });
});

// POST a new product with validation
app.post('/products', (req, res) => {
    const { name, price } = req.body;

    // Validation checks
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).send({ message: 'Product name is required and should be a non-empty string' });
    }
    if (price === undefined || typeof price !== 'number' || price <= 0) {
        return res.status(400).send({ message: 'Product price is required and should be a positive number' });
    }

    const products = readProducts();
    const newProduct = { id: Date.now(), name: name.trim(), price };
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});

// PUT to update an existing product by ID with validation
app.put('/products/:id', (req, res) => {
    const { name, price } = req.body;
    const products = readProducts();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send({ message: 'Product not found' });

    // Validation checks for updating
    if (name && (typeof name !== 'string' || name.trim() === '')) {
        return res.status(400).send({ message: 'Product name should be a non-empty string' });
    }
    if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
        return res.status(400).send({ message: 'Product price should be a positive number' });
    }

    products[index] = { ...products[index], ...req.body };
    writeProducts(products);
    res.json(products[index]);
});

// DELETE a product by ID
app.delete('/products/:id', (req, res) => {
    let products = readProducts();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send({ message: 'Product not found' });

    const deletedProduct = products.splice(index, 1);
    writeProducts(products);
    res.json(deletedProduct[0]);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
