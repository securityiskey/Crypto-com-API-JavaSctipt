# Crypto.com-API-JavaSctipt
Crypto.com API Node.JS


**Step 0:** extract the Crypto.com-API-JavaSctipt from github and save it on your desktop or anywhere you like (Unzip the file if it's zipped).
**Step 1:** Install nodejs and npm if you haven't done that already. You could find documentation online on how to do it for Linux or Windows. I included couple sites below.

https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04
OR
https://phoenixnap.com/kb/install-node-js-npm-on-windows

**Step2:** replace my credentials.json file with your own. I cleared the data inside of it but yours should not be blank. To do that proceed to step 3

**Step3:** Create a service account. You are going to need this. the service account will look like an email that ends with gserviceaccount.com.
You will then "share" your google spreadsheet with this service account that you created. Similar how you share your googlesheet with a friend or colleague.

**Easy summary on how to do it:**
login to: https://console.cloud.google.com/     using your gmail

-Create a new project

-go to the menu and click on IAM & Admin
-go to Service Accounts from the left menu

-Create a service account (option from the top page +CREATE SERVICE ACCOUNT)

-fill in the service account details and hit done

-The new service account will pop up on your Service Account page now. You will notice is has "No Key" under Key ID

-Select your account, click on the menu under "Actions" (last column) and choose Manage Keys

-Click on Add Key then Create New Key

-From the options choose the recommended JSON and click Create

-go to your downloads and rename that file to... you guessed it "credentials.json" and overwrite it with mine in the Crypto.com-API-JavaSctipt project folder (from step 0)

reference: https://developers.google.com/workspace/guides/create-credentials

**Step 4:** create a new workbook in Googlesheets. That is easy and I don't have to cover that

**Step 5:** make note of the URL of that spreadsheet. you will need the unique ID shown in the URL. For example URL: https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/edit#gid=0
you need to copy the jumbled unique id. Mine lookes like this "1hdIYg44ksjgrRjmoUvyFPsf8ZlsUGpc9QOQKfkDwi7c" in this scenario and make a note of it somewhere

**Step 5:** Open index.js in the project folder using your favorite file editor. I use Notepad++

**Step 6:** replace my googlesheet ID with yours. You should be able to find 'xxxxxxxxxxxxxxxxxxxxxxxxxx' in the code under index.js.

**Step 7:** Search for "UPDATE HERE" without the quotes and update the code below to match it with your information.

**Step 8:** open a terminal in that file directory and run index.js by using the following command:   node index.js

**Step 9:** that's it... script should run now and update your googlesheet.

**Step 10 (Optional):** If you found this project helpful and you wish to pay me back with coffee money. I included my CRO address below :)
CRO Address
cro1w2kvwrzp23aq54n3amwav4yy4a9ahq2kz2wtmj
CRO Deposit Memo
3551237380


