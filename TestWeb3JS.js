/**
 * Created by tommy on 2017/6/12.
 */
var Web3 = require('web3');

var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://172.104.73.26:8543'));
web3.personal.unlockAccount("0x006cB2ee626a6b17a9936fD9fe75E999eDeFe3dc", "test");


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
// initiate contract for an address
var myContractInstance = MyContract.at(address);
var transactionObject = {
    data: '20',
    gasPrice: web3.eth.gasPrice,
    gas: 500000,
    from: web3.eth.accounts[0],
    to:address
};

//預估需要多少gas
var result=myContractInstance.setX(30);
console.log(result);


var result=myContractInstance.setX(30,transactionObject,function (err,result) {
    console.log(err);
    console.log(result);
});
console.log(result);