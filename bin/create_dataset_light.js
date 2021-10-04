const fs = require('fs');
const path = require('path');
const config = require("../config.js");

let all = [];


let filename = path.join(config.data.tenderapi, 'import', 'KE-dataset.json');
let content = fs.readFileSync(filename);
let array = JSON.parse(content);
console.log('array.length', array.length);
// array = array.slice(0, 5000);
array.forEach((item, index) => {
    if (index > 15000 && index <= 20000) {
        item.buyers[0].test = 1; //Add custom field to  buyer
        if (item.lots[0].bids) {
            item.lots[0].bids[0].bidders[0].test = 1; //Add custom field to  supplier
        }
        all.push(JSON.stringify(item, null, 2));
    }
});

if (all) {
    fs.writeFileSync(path.join(config.data.tenderapi, 'import', 'KE-dataset-light.json'), '[' + all + ']');
    console.log('done');
} else {
    console.log('nothing to write found');
}
