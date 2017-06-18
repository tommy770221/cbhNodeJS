/**
 * Created by tommy on 2017/6/12.
 */
var Web3 = require('web3');

var CryptoJS = require('crypto-js');
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
                    address:"006cb2ee626a6b17a9936fd9fe75e999edefe3dc",
                    Crypto:{
                                       cipher:"aes-128-ctr",
                                 cipherparams:{
                                                   "iv":"935abaff7f22833f6ea905b7cb99148c"
                                                },
                                 ciphertext:"3b95c16bd592425741c4147928d4719165c96311b027f427d56cd0cc3b999da4",
                                 kdf:"pbkdf2",
                                 mac:"8633514b6c902beb5ec13527cc6e5cbdbedee3a155d1d31f5f31bf5978035c38",
                                 kdfparams:{
                                     c:10240,
                                     dklen:32,
                                     prf:"hmac-sha256",
                                     salt:"c52703a529447f291b62b54c3d3b49f6a4c191a0ef463bc101a8f97d35de8a24"
                                 }
                     },

                    id:"071c6a91-cdfb-9897-8753-c2f8a045a7db",
                    version:3
             };

var privateKey = keythereum.recover('test', wallet);

console.log(privateKey.toString('hex'));


//呼叫自己寫的智能合約
var walletContractAddress = '0x9796d21ec196767b05bf1503962AE11394FC3299';
var fromAccount = '0x006cb2ee626a6b17a9936fd9fe75e999edefe3dc';
var toAccount ='0x00CA8A3D7fE1F96dA2b0f1257f72Bb7b4a80FFCE';

//指定abi的function
var solidityFunction = new SolidityFunction(0, _.find(abi, { name: 'withdraw' }),'0x006cb2ee626a6b17a9936fd9fe75e999edefe3dc');
console.log('This shows what toPayload expects as an object');
console.log(solidityFunction);
var payloadData = solidityFunction.toPayload([toAccount, 3]).data;
console.log(payloadData);

gasPrice = web3.eth.gasPrice;
gasPriceHex = web3.toHex(gasPrice);
gasLimitHex = web3.toHex(300000);

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
    gas: 500000,
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


web3.eth.sendRawTransaction("0x"+serializedTx.toString('hex'), function (err, hash) {
    if (err) {
        console.log('Error:');
        console.log(err);
    }
    else {
        console.log('Transaction receipt hash pending');
        console.log(hash);
    }
});
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
    gas: 500000,
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


