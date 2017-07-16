# cbhNodeJS
ETH Blockchain Oracle  <br>
環境介紹 :   <br>
[nodeJs v6.10.0](https://nodejs.org/en/download/) <br>
[npm   3.10.10](https://nodejs.org/en/download/)   <br>
mysql 5.16      <br>
[mongodb 3.0](https://www.mongodb.org/dl/win32/x86_64-2008plus-ssl?_ga=2.255581000.1193620782.1496321487-1434952109.1496242421) <br>
[robomongo 1.0](https://robomongo.org/download) <br>
版型使用  </br>
http://eliteadmin.themedesigner.in/demos/eliteadmin-hospital/index.html
需要 license (請自行購買) </br>
npm install --global windows-build-tools <br>
先把npm_module init  :   
執行: npm install <br>
執行: npm run start

訪問 http://localhost:3000/cbhJs/users <br>
訪問 http://localhost:3000/cbhJs/disease <br>
訪問 http://localhost:3000/cbhJs/ <br>

demo 網站  <br>
https://tommy770221.com/cbhJs/users   <br>
https://tommy770221.com/cbhJs/disease <br>
https://tommy770221.com/cbhJs/ <br>
可以監看 自製節點  172.104.73.26:8541上面的合約狀態  <br>
[節點建立方法](https://medium.com/taipei-ethereum-meetup/%E4%BD%BF%E7%94%A8parity%E5%BB%BA%E7%AB%8Bproof-of-authority-poa-ethereum-chain-c5c1cdd0f21a) <br>


用ETH 的pub 跟 private 作加解密
https://github.com/bitchan/eccrypto/tree/v1.0.3 
https://github.com/cryptocoinjs/secp256k1-node/tree/15e14632eabfa54248af97f3ff7a9dcf96f67271#windows

'''

'''



將普通json array資料倒進mongoDb <br>
mongoimport --db chatterbot-database --collection hospitalProfile --file I:\醫療相關資料\crawlerGeoData\list.txt --jsonArray

db.getCollection('hospitalProfile').createIndex( { "location.coordinates" : "2d"});
    
db.runCommand( { geoNear: "hospitalProfile",
                 near: [ 121.48, 24.99 ],
                 spherical: true
               }  )
               
db.hospitalProfile.find( { "location": { $geoWithin: { $centerSphere: [ [ -74, 40.74 ] ,
                                                     100 / 3963.2 ] } } } )
                                                     
                                                     
下指令 可以得到合約呼叫  transaction評價data 用法                                                    
node TestWeb3JS.js                    

以下為測試的Line 好友 QRcode

http://qr-official.line.me/L/QC85t_n-_U.png
