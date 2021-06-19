'use strict'

const testFolder = './data/';
const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  let source = file;
  fs.readFile(`${testFolder + source}`, 'utf8', function (err, data) {
    
    console.log(source);

    if (err) throw err;
    let obj = JSON.parse(data);

    for (let i = 0; i < obj.length; i++) {
        const result = obj[i];
        result['external'] = true;    
    }

    let write = JSON.stringify(obj);
    fs.writeFileSync(`data/${source}`, write);
  });
});


