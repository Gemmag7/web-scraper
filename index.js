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
        
       // console.log(data)
        $('.item', data).each(function(){
            const name = $(this).find('h1').text()
            const description = $(this).find('p').text()
           const price = $(this).find('.price').text()
           const oldPrice = $(this).find('.oldPrice').text()
            products.push({
                name, 
                description,
                price, 
                oldPrice
            })
        })
        console.log(products)
    })
    .catch(function(error) {
        //Print error if any occured
        console.error('Error!: ', error.message)
    })

app.listen(PORT, () => {
  
        console.log(`Server is running on port: ${PORT}`);
      })