/*Before you get started and start modifying the code below. If you want to use GoogleSheets as the placeholder/final output of all the data being pulled in the API
  Then please read the HELPME File first because you will need to overwrite the credentials.json file with your own.
  Step 0: I repeat, for the googlesheet connection to work you will to overwrite the credentials.json file in the project folder with your own. Read HELPME.txt
  Step 1: Search for "UPDATE HERE" without the quotes and update the code below to match it with your information.
*/
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
    }, 15000)  //UPDATE HERE (Optional) this will run once every 15 seconds. Feel free changing 15,000 to 5000 for example if you want it to run every 5 seconds
}              //PLEASE NOTE: you will need to modify this value again at the very bottom of the code

let f = 0;

setInterval(() => {

logEveryfSeconds(0);

// spreadsheet key is the long id in the sheets URL. You can get this key from the googlesheets URL https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/edit#gid=
const doc = new GoogleSpreadsheet('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'); //UPDATE HERE. Replace XXXXXX... with your Googlesheet ID. You can find it in the URL

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

const apiKey = "xxxxxxxxxxxxxxxxxxxxxxxx"; /* User API Key */         //UPDATE HERE. Get your API Key from https://crypto.com/exchange/user/settings/api-management
const apiSecret = "xxxxxxxxxxxxxxxxxxxxxxxx"; /* User API Secret */   //UPDATE HERE. Get your Secret Key from https://crypto.com/exchange/user/settings/api-management



function myFunc(){
let request = {
  id: 11,
  method: "public/get-ticker", //other methods are available like "private/get-order-detail" and "private/get-account-summary". Checkout Crypto.com API documentation.
  api_key: apiKey,
  params: {},
  nonce: currentTime,
};

const requestBody = JSON.stringify(signRequest(request, apiKey, apiSecret));

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
 data = JSON.parse(cache);
  let length = data.length; //check how many coins are there
 
 async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });


  await doc.loadInfo(); // loads document properties and worksheets
  //console.log(doc.title);

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]    //UPDATE HERE  Index 0 means the first sheet. e.g Change to 1 if you want to reference the second sheet
  

 await sheet.loadCells('A1:D' & length)   //Load cells from A1:DXXX  XXX is number of coins in Crypto.com
 const RA1 = sheet.getCellByA1('A1');  //select cell
 RA1.value = "Symbol";                 //Give the first column a name
 const RB1 = sheet.getCellByA1('B1');  //select cell
 RB1.value = "Price";                  //Give the second column a name.
 const RC1 = sheet.getCellByA1('C1');  //select cell
 RC1.value = "% Change";	       //Give the third column a name.
 const RD1 = sheet.getCellByA1('D1');  //select cell
 RD1.value = "UNIX Timestamp";  ////Give the fourth column a name. This is UNIX Timestamp of the last trade
 const j1 = sheet.getCellByA1('J1');  //select cell
 j1.value = "Last Ran";               //This is the last time your script ran. I used it to check if my script is still running.

for (var t=0; t<length; t++) { 

 const a1 = sheet.getCell(t+1, 0);   //select cells by going through a loop. Capturing all Coins
 const b1 = sheet.getCell(t+1, 1);
 const c1 = sheet.getCell(t+1, 2);
 const t1 = sheet.getCell(t+1, 3);

 const i = JSON.stringify(data[t].i)  //i is the field name of the Symbol in the JSON
const unquoted = i.replace(/"([^"]+)":/g, '$1:');
let length1 = unquoted.length-1;
const coin = unquoted.substr(1, length1-1);
const b = JSON.stringify(data[t].a);  //data[t].a the a at the end is the field name of the last traded value in the JSON
const c = JSON.stringify(data[t].c);  //data[t].c the c at the end is the 24-hour price change, null if there weren't any trades
const cointime = JSON.stringify(data[t].t); //data[t].t the t at the end is Timestamp of the data
	//note: you can have access to other fields like data[t].v -> v for volume or data[t].h -> where h for Price of the 24h highest trade
	// check the request attributes for more under https://exchange-docs.crypto.com/spot/index.html?javascript#public-get-ticker
 a1.value=coin;  //Symbol of the coin
 b1.value=b *1;  //multiplying the coin price by 1 to convert from string to value
 c1.value=Math.round(100*(b-(b-c))/b*100)/100;  //rounding the percent change
 t1.value=cointime;
	  
 const j2 = sheet.getCellByA1('J2');
 j2.value = timestamp;  //passing the value of the scripts last ran. This is the last time your script ran. I used it to check if my script is still running.
}
  await sheet.saveUpdatedCells(); // save all updates in one call
}

accessSpreadsheet();
//console.log(timestamp);
//console.log(currentTime);
}, 15000); //this will run once every 15 seconds. Update this number here and above.
