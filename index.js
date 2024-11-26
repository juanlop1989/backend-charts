const express = require('express')
const sequelize= require('./config/database')
const Producto = require('./modelos/Producto')
var cors = require('cors')

const app= express();
app.use(express.json())
app.use(cors())
var port = 5000;


//Llamado para listar todos los productos
app.get('/Productos', async (req,res) =>{

    try {
        
        const productos = await Producto.findAll();

        res.status(200).json(productos);

    } catch (error) {
        res.status(500).json({error: 'Ocurrio un error'});
    }
})



//Obtener el valor total de los productos por productType
app.get('/suma-producto-tipoProducto', async(req,resp) =>{

    try {
        
        const result = await Producto.findAll({
            attributes:[
                'productType',
                [sequelize.fn('SUM', sequelize.col('value')), 'Valor_Total']
            ],
            group: ["productType"]
        });

        resp.json(result)

    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }

});


//Calcular el Valor_Promedio de productos por cada categoryCode
app.get('/valor-promedio-codigoCategoria', async(req,resp) =>{

    try {
        
        const result = await Producto.findAll({
            attributes:[
                'categoryCode',
                [sequelize.fn('AVG', sequelize.col('value')), 'Valor_Promedio']
            ],
            group: ["categoryCode"]
        });

        resp.json(result)

    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }

});


//Calcular el Valor_Promedio y la cantidad de productos por cada lineCode
app.get('/valor-promedio-lineaCodigo', async(req,resp) =>{

    try {
        
        const result = await Producto.findAll({
            attributes:[
                'lineCode',
                [sequelize.fn('AVG', sequelize.col('value')), 'Valor_Promedio'],
                [sequelize.fn('COUNT', sequelize.col('partNumber')), 'Cantidad']
            ],
            group: ["lineCode"]
        });

        resp.json(result)

    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }

});



app.listen(port, ()=>{
    console.log('aplicacion ejecutando en puerto:' , port)
})