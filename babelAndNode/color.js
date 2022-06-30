const RandomColor = require('./classes/RandomColor.js');

const red = Math.floor((Math.random() * 255));
const blue = Math.floor((Math.random() * 255));
const green = Math.floor((Math.random() * 255));

const theColor = new RandomColor(red, blue, green);

console.log("%c This color",`color: rgb(${theColor.red},${theColor.blue},${theColor.green})`);
console.log(`${theColor.red} ${theColor.blue} ${theColor.green}`)