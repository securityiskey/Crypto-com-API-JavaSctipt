const crypto = require("crypto-js");
const BASE_URL = "https://api.crypto.com/v2/"
const https = require('https')
const requests = require('request')
//Googlesheet requirements
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./credentials.json');
const { promisify } = require('util');
//write to text
const fs = require('fs');


function logEveryfSeconds(f) {
	setTimeout(() => {
//		console.log('Infinite Loop Test n:', i);
        logEveryfSeconds(++f);
    }, 15000)
}

let f = 0;

setInterval(() => {

logEveryfSeconds(0);

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'); //UPDATE HERE


let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();
// prints date & time in YYYY-MM-DD HH:MM:SS format
timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;


const currentTime = (new Date()).getTime();

const signRequest = (request, apiKey, apiSecret) => {
  const { id, method, params, nonce } = request;

  const paramsString =
    params == null
      ? ""
      : Object.keys(params)
          .sort()
          .reduce((a, b) => {
            return a + b + params[b];
          }, "");

  const sigPayload = method + id + apiKey + paramsString + nonce;

  request.sig = crypto
    .HmacSHA256(sigPayload, apiSecret)
    .toString(crypto.enc.Hex);

  return request;
};

const apiKey = "xxxxxxxxxxxxxxxxxxxxxxxx"; /* User API Key */         //UPDATE HERE
const apiSecret = "xxxxxxxxxxxxxxxxxxxxxxxx"; /* User API Secret */   //UPDATE HERE



function myFunc(){
let request = {
  id: 11,
 // method: "private/get-order-detail",
 // method: "private/get-account-summary",
  method: "public/get-ticker",
  api_key: apiKey,
  params: {},
  nonce: currentTime,
};

const requestBody = JSON.stringify(signRequest(request, apiKey, apiSecret));
//fs.writeFileSync('cache2.txt',requestBody);

requests.get({
        url: BASE_URL+"public/get-ticker", 
        headers: {
            'Content-Type': 'application/json'
        },
         json: request
    }, function(error, response, body) {
		var j = JSON.stringify(body)
		 var obj = JSON.parse(j);
		 var pointer = obj.result.data;	
		  pointer.sort(function (a, b) {
    return a.i.localeCompare(b.i);
});
		
 		var test = JSON.stringify(pointer);	
	    fs.writeFileSync('cache.txt',test);	
		 	
    })
//	return requestBody;
}

  const replacer = (key, value) =>
  typeof value === 'undefined' ? timestamp : value;
 console.log(JSON.stringify(myFunc(), replacer));


 let cache = fs.readFileSync('cache.txt','utf8');
//  let cache2 = fs.readFileSync('cache2.txt','utf8');
 //console.log(cache2);
 data = JSON.parse(cache);
  let length = data.length;
 // console.log(length);
 
 async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });


  await doc.loadInfo(); // loads document properties and worksheets
  //console.log(doc.title);

  const sheet = doc.sheetsByIndex[2]; // or use doc.sheetsById[id]    //UPDATE HERE  Index 2 means the third sheet. 0 to reference the first sheet
  

 await sheet.loadCells('A1:D' & length)
 
  for (var t=0; t<length; t++) { 

 
 const a1 = sheet.getCell(t+1, 0);
 const b1 = sheet.getCell(t+1, 1);
 const c1 = sheet.getCell(t+1, 2);
 const t1 = sheet.getCell(t+1, 3);
// console.log(JSON.stringify(data[t]));
 const i = JSON.stringify(data[t].i)
const unquoted = i.replace(/"([^"]+)":/g, '$1:');
let length1 = unquoted.length-1;
const coin = unquoted.substr(1, length1-1);
const b = JSON.stringify(data[t].a);
const c = JSON.stringify(data[t].c);
const cointime = JSON.stringify(data[t].t);
 a1.value=coin;
 b1.value=b *1;
 c1.value=Math.round(100*(b-(b-c))/b*100)/100;
 t1.value=cointime;
}
  await sheet.saveUpdatedCells(); // save all updates in one call
}

accessSpreadsheet();
//console.log(timestamp);
//console.log(currentTime);
}, 15000);