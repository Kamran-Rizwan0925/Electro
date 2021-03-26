const express = require('express')
const router  = express.Router();
const {database} = require('../config/helpers');

// Get All Products 
router.get('/', function(req,res){
    let page = (req.query.page !== undefined && req.query.page !==0) ? req.query.page:1 ; //set current page
    const limit = (req.query.limit !== undefined && req.query.page !==0) ? req.query.limit:10 ; //set items per page

    let startValue;
    let endValue;

    if(page>0){
        startValue = (page*limit) - limit;//0,10,20,
        endValue = page*limit; 
    }
    else{
        startValue = 0;
        endValue = 10;
    }

    database.table('products as p').join([{
        table: 'categories as c',
        on: "c.id = p.cat_id"
    }])
    .withFields(['c.title as category', 'p.title as name','p.price','p.quantity', 'p.image', 'p.id' ])
    .slice(startValue,endValue)
    .sort({ id: .1})
    .getAll()
    .then(prods =>{
        if(prods.length > 0){
            res.status(200).json({
                count: prods.length,
                products: prods
            })
        }
        else{
            res.json({
                message: 'No products found!'
            })
        
        }
    }).catch(err => console.log(err));


});


// Get Single Product 
router.get('/:prodId',(req,res)=>{

    let productId  = req.params.prodId;
    database.table('products as p').join([{
        table: 'categories as c',
        on: "c.id = p.cat_id"
    }])
    .withFields(['c.title as category', 'p.title as name','p.price','p.quantity', 'p.image','p.images', 'p.id' ])
    .filter({'p.id': productId})
    .get()
    .then(prod =>{
        if(prod){
            res.status(200).json({
                count: prod.length,
                products: prod
            })
        }
        else{
            res.json({
                message: `No product found with product id ${productId}!`
            })
        
        }
    }).catch(err => console.log(err));

});

// Get All Products From One Particular Category
router.get('/category/:catName', (req,res)=>{
    let cat_title = req.params.catName;
    let page = (req.query.page !== undefined && req.query.page !==0) ? req.query.page:1 ; //set current page
    const limit = (req.query.limit !== undefined && req.query.page !==0) ? req.query.limit:10 ; //set items per page

    let startValue;
    let endValue;

    if(page>0){
        startValue = (page*limit) - limit;//0,10,20,
        endValue = page*limit; 
    }
    else{
        startValue = 0;
        endValue = 10;
    }


    database.table('products as p').join([{
        table: 'categories as c',
        on: `c.id = p.cat_id WHERE c.title LIKE '%${cat_title}%'`
    }])
    .withFields(['c.title as category', 'p.title as name','p.price','p.quantity', 'p.image', 'p.id' ])
    .slice(startValue,endValue)
    .sort({ id: .1})
    .getAll()
    .then(prods =>{
        if(prods.length > 0){
            res.status(200).json({
                count: prods.length,
                products: prods
            })
        }
        else{
            res.json({
                message: `No products found from ${cat_title} category!`
            })
        
        }
    }).catch(err => console.log(err));

})
module.exports  = router;