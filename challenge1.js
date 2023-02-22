const axios = require('axios')
const cheerio = require('cheerio')
const express = require ('express')
const fs = require('fs')
const readline = require("readline")
const PORT = 3006
const app = express()

const userInput = "beer";
//const input = prompt("Enter search term here")
axios.get('https://www.thewhiskyexchange.com/search?q=cider')
    .then(function(response) {
        // HTML is inside response.data
        const data = response.data
        //console.log(html)
        const products =[]
        
        let $ = cheerio.load(data)
        
        $('.product-grid_item', data).each(function(){
            const name = $(this).find('a').attr('title')
            
            //products.push({name, url,price, oldPrice})
            console.log(name)
        })
        
        console.log(name)
        //console.log(products.length)
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
    
      //Average is calulcated by dividing the total amou by the size of the products array
      average = total / size
      
      
  }

  //Initialising jsonData object to be inserted into data.json file
  //3 components inserted into file: average price of the products array, the number of products in the array and also the products array as well inserted into the JSON file
const jsonData ={
    average: {average}, 
    number_of_products : {size}, 
    '':{products}
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