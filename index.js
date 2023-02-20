const axios = require('axios')
const cheerio = require('cheerio')
const express = require ('express')
const PORT = 3000
const app = express()

axios.get('https://cdn.adimo.co/clients/Adimo/test/index.html')
    .then(function(response) {
        // HTML is inside response.data
        const data = response.data
        //console.log(html)
        const products =[]
        
        let $ = cheerio.load(data)
        
        $('.item', data).each(function(){
            const name = $(this).find('h1').text()
            const url = $(this).find('img').attr('src')
           const price = $(this).find('.price').text()
           const oldPrice = $(this).find('.oldPrice').text()
            products.push({name, url,price, oldPrice})
           
        })
        console.log(products[0])
        console.log(products.length)
        //console.log(Object.keys(products))
        //console.log(Object.values(products))
        //console.log(products[1].name)
        //console.log(products[8].price)

     let sum = 0;
     let total = 0;
     let str = " "
     let arrOfNum = 0
     let average = 0
  for (let i = 0; i < products.length; i ++) {
    console.log(sum)
    //console.log(products[i].price)
    sum += products[i].price;
    str = sum.split("£")
    
    arrOfNum = str.map(str => {
        return parseFloat(str, 10);
      });

       total = arrOfNum.reduce(function(a, b){
        return a + b;
      });
    
      average = total / products.length
      
      
  }
  console.log(total)
  console.log(average)
  //console.log(str)
  //console.log(arrOfNum)
  
  
  return average;     
    })
    .catch(function(error) {
        //Print error if any occured
        console.error('Error!: ', error.message)
    })

app.listen(PORT, () => {
  
        console.log(`Server is running on port: ${PORT}`);
      })