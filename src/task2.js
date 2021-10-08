import { pipeline } from 'stream';
import fs from 'fs';
import csv from 'csvtojson';

pipeline(
    fs.createReadStream('./csv/nodejs-hw1-ex1.csv').pipe(csv()),
    fs.createWriteStream('new.txt', 'utf-8'),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
);