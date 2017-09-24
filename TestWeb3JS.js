/**
 * Created by tommy on 2017/6/12.
 */
var Web3 = require('web3');
var keythereum = require("keythereum");
var Tx = require('ethereumjs-tx');
var _ = require('lodash');
var SolidityFunction = require('web3/lib/web3/function');
var util = require('ethereumjs-util');
var encoding = require("encoding");


var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://172.104.73.26:8543'));


var abi=[
    {
        "constant": false,
        "inputs": [],
        "name": "bid",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "auctionEnd",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "beneficiary",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdraw",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "auctionStart",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "highestBidder",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "biddingTime",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "highestBid",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_biddingTime",
                "type": "uint256"
            },
            {
                "name": "_beneficiary",
                "type": "address"
            }
        ],
        "payable": false,
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "bidder",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "HighestBidIncreased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "winner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "AuctionEnded",
        "type": "event"
    }
];

var abiTest=[
    {
        "constant": true,
        "inputs": [],
        "name": "x",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_x",
                "type": "uint256"
            }
        ],
        "name": "setX",
        "outputs": [],
        "payable": false,
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "type": "constructor"
    }
];

var MyContract = web3.eth.contract(abiTest);

var address="0xdF3b82701c8a5F32A94b496e0f29ea6345b22d6c"
// initiate contract for an addressTwo
var myContractInstance = MyContract.at(address);
var transactionObject = {
    data: '20',
    gasPrice: web3.eth.gasPrice,
    gas: 500000,
    from: web3.eth.accounts[0],
    to:address
};

//預估需要多少gas
var result=myContractInstance.setX;
console.log(result);


/*var result=myContractInstance.setX(30,transactionObject,function (err,result) {
    console.log(err);
    console.log(result);
});
console.log(result);*/


var MyContractTwo = web3.eth.contract(abi);
var addressTwo="0x9796d21ec196767b05bf1503962AE11394FC3299"
// initiate contract for an addressTwo
var myContractInstanceTwo = MyContractTwo.at(addressTwo);
var transactionObjectTwo = {
    data: '20',
    gasPrice: web3.eth.gasPrice,
    gas: 500000,
    from: web3.eth.accounts[0],
    to:addressTwo
};


/*var result=myContractInstanceTwo.withdraw(transactionObject,function (err,result) {
    console.log(err);
    console.log(result);
});
console.log(result);*/


//將parity 的錢包 轉成private key

var wallet={
                    address:"0x00fC42Af85719e6CE855aD5F565F4Ce127f24279",
                    Crypto:{
                                       cipher:"aes-128-ctr",
                                 cipherparams:{
                                                   "iv":"4890b46d779864af016c62a130569018"
                                                },
                                 ciphertext:"280cab64934f141229d98a02e06850f5fc70d399ac1b1b02cbe047d105de5e69",
                                 kdf:"pbkdf2",
                                 mac:"50f4f1b4d23a8ee7959a04b33816ab41faed667050e372ded60edeba1362b736",
                                 kdfparams:{
                                     c:10240,
                                     dklen:32,
                                     prf:"hmac-sha256",
                                     salt:"475fa2c26eb17429057f0fffda22be6a5b56000e3cf6877d55da6a98da2813fb"
                                 }
                     },

                    id:"07e8e16a-014d-c198-aaf0-458e88b2e8ff",
                    version:3
             };

var privateKey = keythereum.recover('test', wallet);

console.log(privateKey.toString('hex'));


//呼叫自己寫的智能合約
var walletContractAddress = '0x9796d21ec196767b05bf1503962AE11394FC3299';
var fromAccount = '0x00fC42Af85719e6CE855aD5F565F4Ce127f24279';
var toAccount ='0x0007CD6B9B0B60A99D2af31a43f661483B92Df04';

//指定abi的function
var solidityFunction = new SolidityFunction(0, _.find(abi, { name: 'withdraw' }),'0x00fC42Af85719e6CE855aD5F565F4Ce127f24279');
console.log('This shows what toPayload expects as an object');
console.log(solidityFunction);
var payloadData = solidityFunction.toPayload([toAccount, 3]).data;
console.log(payloadData);

gasPrice = web3.eth.gasPrice;
gasPriceHex = web3.toHex(gasPrice);
gasLimitHex = web3.toHex(6000000);

console.log('Current gasPrice: ' + gasPrice + ' OR ' + gasPriceHex);

var nonce =  web3.eth.getTransactionCount(fromAccount) ;
var nonceHex = web3.toHex(nonce);
console.log('nonce (transaction count on fromAccount): ' + nonce + '(' + nonceHex + ')');

var rawTx = {
    nonce: nonceHex,
    gasPrice: gasPriceHex,
    gasLimit: gasLimitHex,
    to: walletContractAddress,
    from: fromAccount,
    value: '0x00',
    gas: 5000000,
    data: payloadData,
    //自訂的 chainId 正式       0x01
    //測試的         testnet    0x03
    chainId: '0x2323'
};

// Step 5:
var tx = new Tx(rawTx);
tx.sign(privateKey);
console.log(tx);
console.log(tx.toJSON());
console.log(tx.data.toString('hex'));

var serializedTx = tx.serialize();
console.log(serializedTx.toString('hex'));
if (tx.verifySignature()) {
    console.log('Signature Checks out!');
}

/* 2017-09-24 暫時注解合約
web3.eth.sendRawTransaction("0x"+serializedTx.toString('hex'), function (err, hash) {
    if (err) {
        console.log('Error:');
        console.log(err);
    }
    else {
        console.log('Transaction receipt hash pending');
        console.log(hash);
    }
});*/
/*
var result=myContractInstanceTwo.withdraw(tx.toSource(),function (err,result) {
    console.log(err);
    console.log(result);
});
console.log(result);*/

//產生 pulblickey
var publicKey = util.bufferToHex(util.privateToPublic(privateKey));
console.log(publicKey);



/*   自定義中文評論 , parity 瀏覽器發送的資料不支援中文格式 */

var rawTxTwo = {
    nonce: nonceHex,
    gasPrice: gasPriceHex,
    gasLimit: gasLimitHex,
    to: toAccount,
    from: fromAccount,
    value: '0x15',
    gas: 5000000,
    input:'這個醫生的評價非常好,每次看病都很有精神',
    //自訂的 chainId 正式       0x01
    //測試的         testnet    0x03
    chainId: '0x2323'
};

// Step 5:
var txTwo = new Tx(rawTxTwo);
txTwo.sign(privateKey);
console.log(txTwo);
console.log(txTwo.toJSON());
console.log(txTwo.data.toString('hex'));

var serializedTxTwo = txTwo.serialize();
console.log(serializedTxTwo.toString('hex'));
if (txTwo.verifySignature()) {
    console.log('Signature Checks out!');
}


web3.eth.sendRawTransaction("0x"+serializedTxTwo.toString('hex'), function (err, hash) {
    if (err) {
        console.log('Error:');
        console.log(err);
    }
    else {
        console.log('Transaction receipt hash pending');
        console.log(hash);
        var data=web3.eth.getTransaction(hash);
        console.log(data);
//console.log(encoding.convert(web3.toAscii(data.input), 'UTF-8','ASCII').toString());
        console.log(web3.toUtf8(data.input));var data=web3.eth.getTransaction(hash);
        console.log(data);
//console.log(encoding.convert(web3.toAscii(data.input), 'UTF-8','ASCII').toString());
        console.log(web3.toUtf8(data.input));
    }
});


