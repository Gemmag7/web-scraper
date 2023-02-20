const axios = require('axios')
const cheerio = require('cheerio')
const express = require ('express')
const fs = require('fs')
const promptSync = require('prompt-sync')
const PORT = 3000
const app = express()

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.input('Enter a search term', input => {
  console.log(`${input}`);
  readline.close();
});
//const input = prompt("Enter search term here")
axios.get(`https://www.thewhiskyexchange.com/search?q=${input}`)
    .then(function(response) {
        // HTML is inside response.data
        const data = response.data
        //console.log(html)
        const products =[]
        
        let $ = cheerio.load(data)
        
        $('.product-grid_item', data).each(function(){
            const name = $(this).find('a').attr('title')
            const url = $(this).find('img').attr('src')
           const price = $(this).find('.price').text()
           const oldPrice = $(this).find('.oldPrice').text()
            products.push({name, url,price, oldPrice})
           
        })
        
        console.log(JSON.stringify(products))
        console.log(products.length)
     let sum = 0;
     let total = 0;
     let str = " "
     let arrOfNum = 0
     let average = 0
      const size = products.length
  for (let i = 0; i < size; i ++) {
    sum += products[i].price;
    str = sum.split("£")
    
    arrOfNum = str.map(str => {
        return parseFloat(str, 10);
      });

       total = arrOfNum.reduce(function(a, b){
        return a + b;
      });
    
      average = total / size
      
      
  }
const jsonData ={
    average: {average}, 
    number_of_products : {size}, 
    ' ' : {products}
}
  const myJSON = JSON.stringify(jsonData, null, 2)
        console.log(myJSON);
  fs.writeFile("./challenge1Data.json", myJSON, err =>{
    if(err){
        console.log("Error writing file", err)
    }
    else{
        console.log('JSON data written to file successfully')
    }
  })
  return average;   
     
    })
    .catch(function(error) {
        //Print error if any occured
        console.error('Error!: ', error.message)
    })

app.listen(PORT, () => {
  
        console.log(`Server is running on port: ${PORT}`);
      })