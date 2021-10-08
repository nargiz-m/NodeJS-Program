import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Type in a string to be reversed. Press Ctrl+C to exit: ');
rl.on('line', function(line){
    console.log(line.split("").reverse().join(""));
});