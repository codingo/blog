'use strict'

const testFolder = './data/';
const fs = require('fs');

let newArray = [];

fs.readdir(testFolder, (err, files)=>{

  files.forEach(file => {
    let source = file;
    fs.readFile(`${testFolder + source}`, 'utf8', function (err, data) {
      console.log(source);
      if (err) throw err;
      let obj = JSON.parse(data);
      newArray = newArray.concat(obj);
      
      let write = JSON.stringify(newArray);
      fs.writeFileSync(`data/concatted.json`, write);
    });
  });
  
  console.log( `loop done `)
  

})

