const express = require('express');
const router = express.Router();

var pageSize = 12;
var data = [
    { id: 1, name: "İphone 7", brand: "IPhone", color: "red", price: 200, isInCart: false, createdDate: "2021-08-20T09:25:17.921Z" },
    { id: 2, name: "Test", brand: "IPhone", color: "yellow", price: 300, isInCart: false, createdDate: "2021-08-12T09:25:17.921Z" },
    { id: 3, name: "Tefal", brand: "IPhone", color: "white", price: 5000, isInCart: false, createdDate: "2021-07-20T09:25:17.921Z" },
    { id: 4, name: "Simbo", brand: "IPhone", color: "blue", price: 4200, isInCart: false ,createdDate: "2021-05-11T09:25:17.921Z"},
    { id: 5, name: "İphone 11", brand: "IPhone", color: "red", price: 300000, isInCart: false ,createdDate: "2015-08-26T09:25:17.921Z"},
    { id: 6, name: "İphone 12", brand: "IPhone", color: "purple", price: 1570, isInCart: false ,createdDate: "2021-08-21T09:25:17.921Z"},
    { id: 7, name: "İphone 7", brand: "IPhone", color: "red", price: 123123, isInCart: false, createdDate: "2021-08-20T09:25:17.921Z" },
    { id: 8, name: "İphone 8", brand: "IPhone", color: "yellow", price: 5000, isInCart: false, createdDate: "2021-08-12T09:25:17.921Z" },
    { id: 9, name: "İphone 9", brand: "IPhone", color: "white", price: 5000, isInCart: false, createdDate: "2021-07-20T09:25:17.921Z" },
    { id: 10, name: "Macbook Pro", brand: "Macbook", color: "blue", price: 5000, isInCart: false ,createdDate: "2021-05-11T09:25:17.921Z"},
    { id: 11, name: "Macbook Air", brand: "Macbook", color: "red", price: 5000, isInCart: false ,createdDate: "2021-08-26T09:25:17.921Z"},
    { id: 12, name: "Versace Erkek Parfüm", brand: "Versace", color: "purple", price: 5000, isInCart: false ,createdDate: "2021-08-21T09:25:17.921Z"},
    { id: 13, name: "Watch&Watch Bayan Saati", brand: "W&W", color: "beyaz", price: 1250, isInCart: false, createdDate: "2021-08-20T09:25:17.921Z" },
    { id: 14, name: "İphone 8", brand: "IPhone", color: "yellow", price: 5000, isInCart: false, createdDate: "2021-08-12T09:25:17.921Z" },
    { id: 15, name: "İphone 9", brand: "IPhone", color: "white", price: 5000, isInCart: false, createdDate: "2021-07-20T09:25:17.921Z" },
    { id: 16, name: "İphone 10", brand: "IPhone", color: "blue", price: 5000, isInCart: false ,createdDate: "2021-05-11T09:25:17.921Z"},
    { id: 17, name: "İphone 11", brand: "IPhone", color: "red", price: 5000, isInCart: false ,createdDate: "2021-08-26T09:25:17.921Z"},
    { id: 18, name: "İphone 12", brand: "IPhone", color: "purple", price: 5000, isInCart: false ,createdDate: "2021-08-21T09:25:17.921Z"},
    { id: 19, name: "İphone 13", brand: "IPhone", color: "red", price: 5000, isInCart: false, createdDate: "2021-08-20T09:25:17.921Z" },
    { id: 20, name: "İphone 14", brand: "IPhone", color: "yellow", price: 5000, isInCart: false, createdDate: "2015-08-12T09:25:17.921Z" },
    { id: 21, name: "İphone 14", brand: "IPhone", color: "white", price: 5000, isInCart: false, createdDate: "2021-07-20T09:25:17.921Z" },
    { id: 22, name: "İphone 16", brand: "IPhone", color: "blue", price: 5000, isInCart: false ,createdDate: "2021-05-11T09:25:17.921Z"},
    { id: 23, name: "İphone 17", brand: "IPhone", color: "red", price: 5000, isInCart: false ,createdDate: "2021-08-26T09:25:17.921Z"},
    { id: 24, name: "İphone 18", brand: "IPhone", color: "purple", price: 5000, isInCart: false ,createdDate: "2021-08-21T09:25:17.921Z"},

]

router.get("/getAllProducts", (req, res) => {
    var model = {
        totalItemCount: data.length,
        productList: data
    }
    res.send(model);
})

router.get("/getPaginatedProduct", (req, res) => {
    var indexNumber = req.query.indexNumber;
    var dataLength = data.length;
     var arr = data.slice(pageSize * (indexNumber - 1), Math.min(indexNumber * pageSize , data.length));
     var model = {
        totalItemCount: dataLength,
        productList: arr
    } 
    res.send(model);
})

router.get("/searchedProduct", (req, res) => {
    var model = {
        totalItemCount: data.length,
        productList: data.filter(item => item.name.toLocaleLowerCase().includes(req.query.searchInput))
    } 
    res.send(model);
})

router.get("/filteredProducts", (req, res) => {
    var filterType = req.query.filterType;
    const groupedCounts = data.reduce((resultObj, item) => {
        let count = (resultObj[item[filterType]] || 0);
        resultObj[item[filterType]] = ++count;
        return resultObj;
      }, {});
    res.send(groupedCounts); 
})

router.get("/filterProductsByType", (req,res) => {
    var filterType = req.query.filterType;
    var filterName = req.query.filterName;
    var filteredProducts = [];
    if(filterType === "color"){
        filteredProducts = data.filter(product => product.color === filterName);
    }
    else if(filterType === "brand") {
        filteredProducts = data.filter(product => product.brand === filterName)
    }
    var model = {
        totalItemCount: filteredProducts.length,
        productList: filteredProducts
    }
    res.send(model);
    
})

module.exports = router;
