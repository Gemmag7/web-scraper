//importing all necessary modules
const axios = require('axios')
const cheerio = require('cheerio')
const express = require ('express')
const fs = require('fs')
//chosen port for the application
const PORT = 3000
const app = express()
const url = 'https://cdn.adimo.co/clients/Adimo/test/index.html'

//GET request will get the data from the url and if successful, will provide a response that will then be used to scrape data 
axios.get(url)
    .then(function(response) {
        //Assigning the response data to a data variable that will be passed into cheerio 
        const data = response.data
        //Initialising an empty array called products that will hold the data of the web scraped objects
        const products =[]
        
        let $ = cheerio.load(data)
        
        $('.item', data).each(function(){
            const name = $(this).find('h1').text()
            const url = $(this).find('img').attr('src')
           const price = $(this).find('.price').text()
           const oldPrice = $(this).find('.oldPrice').text()

           //.push is used to insert the scraped data into the products array
            products.push({name, url,price, oldPrice})
           
        })
        
        //console.log(JSON.stringify(products))
        //console.log(products.length)

     //Initialising variables 

     //products_price is initialised as an empty string
     let products_price = 0;
     //total is initialised to 0
     let total = 0;
     //price_str is initialised as an empty string
     let price_str = " "
     let parsed_prices = 0
     //average is set to 0
     let average = 0
     //size is set to the length of the products array (10)
     const size = products.length

     //FOR loop used to loop through the products array 
     //loop will end when it reaches the length of the array
  for (let i = 0; i < size; i ++) {

    //Ininital array saved with each products price added to an array
    //Each price is saved as a string with £ symbol
    products_price += products[i].price;
    //price saved as a string without pounds sign
    //.split method used to remove £ sign 
    price_str = products_price.split("£")

    //parsed_prices array is set to a new array that will contain the parsed price_str string array. 
    //All prices in that array will be parsed into float numbers since float is the most suitable for the price of each products
    parsed_prices = price_str.map(price_str => {
        return parseFloat(price_str, 10);
      });

      //Total is set to the total amount of each product price added up from the parsed_prices float array
       total = parsed_prices.reduce(function(a, b){
        return a + b;
      });
    
      //Average is calulcated by dividing the total amou by the size of the products array
      average = total / size
      console.log(products_price)
      console.log(price_str)
      console.log(parsed_prices)
      console.log(total)
      console.log(average)
  }

  //Initialising jsonData object to be inserted into data.json file
  //3 components inserted into file: average price of the products array, the number of products in the array and also the products array as well inserted into the JSON file
const jsonData ={
    average: {average}, 
    number_of_products : {size}, 
    ' ' : {products}
}
  //Creating a new JSON object that will contain the jsonData to be included
  const myJSON = JSON.stringify(jsonData, null, 2)
        //console.log(myJSON);
  //New file called data.json will be created if successful, if not then an error message will display to user      
  fs.writeFile("./data.json", myJSON, err =>{
    if(err){
        console.log("Error writing file", err)
    }
    else{
        console.log('JSON data written to file successfully')
    }
  })

  //jsonData is returned after the file has been created
  return jsonData;   
     
    })
    //if the request is n ot successful, then an error message will display for user
    .catch(function(error) {
        //Print error if any occured
        console.error('Error!: ', error.message)
    })

//running the application on PORT 3000
app.listen(PORT, () => {
  
        //If application runs as expected on server, then a message will display to user telling them that application is running, along with telling the user which port the server is running on
        console.log(`Server is running on port: ${PORT}`);
      })