const http = require('http');
const fs = require('fs');
const requests = require('requests')
const newFile = fs.readFileSync("new.html","utf-8");
const replaceVal = (tempVal, orgVal) => {
     let temprature = tempVal.replace("{%tempval%}", orgVal.current.temp_c)
      temprature = temprature.replace("{%Update%}", orgVal.current.last_updated)
      temprature = temprature.replace("{%country%}", orgVal.location.country)
      temprature = temprature.replace("{%state%}", orgVal.location.name)
      return temprature;
}

const server = http.createServer((req,res) =>{
    if (req.url== "/"){
        requests('http://api.weatherapi.com/v1/current.json?key=17fbafc8cb784743851123741211508&q=Gandhinagar&aqi=no')
        
        .on('data', (chunk) =>
        {
            const Objdata = JSON.parse(chunk);
            const arrData = [Objdata];
        // console.log(arrData[0].current.temp_c); 
            const realtimeData = arrData.map((val) =>  replaceVal(newFile, val))
            .join("")
            res.write(realtimeData)
            // console.log(realtimeData);
        })
        .on('end', (err) =>
        {
        if (err) return console.log('connection closed due to errors', err);
        
        res.end();
        });
    }
}); 

server.listen(9000, "127.0.0.1");
