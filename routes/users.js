var express = require('express');
var router = express.Router();
var Web3 = require('web3');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var web3 = new Web3();

  web3.setProvider(new web3.providers.HttpProvider('http://172.104.73.26:8541'));

  var coinbase = web3.eth.coinbase;
  console.log(coinbase);

  var balance = web3.eth.getBalance(coinbase);
  console.log(balance.toString(10));
  res.render('layout/blog');
});

/* GET users listing. */
router.get('/eth', function(req, res, next) {
  var web3 = new Web3();

  web3.setProvider(new web3.providers.HttpProvider('http://172.104.73.26:8541'));

  console.log(web3.isConnected());

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
  var watchAddr="0x9796d21ec196767b05bf1503962AE11394FC3299";
  var MyContract = web3.eth.contract(abi);
  var myContractInstance = MyContract.at(watchAddr);
  //var event = myContractInstance.AuctionEnded({valueA: 23});
  var state = web3.eth.getStorageAt("0x9796d21ec196767b05bf1503962AE11394FC3299", 0);
  console.log(state);

  var myEvent = myContractInstance.HighestBidIncreased({}, {fromBlock: 0, toBlock: 'latest'});
  myEvent.watch(function(error, result){
      console.log(result);
      console.log("error"+ error);
  });

  var events = myContractInstance.allEvents(watchAddr);




// watch for changes
  events.watch(function (error, event) {
    if (!error){
      console.log("event start : ");
      console.log(event);
    }
    console.log("err : "+ error);

  });

// Or pass a callback to start watching immediately
  var events = myContractInstance.allEvents(watchAddr, function (error, log) {
    if (!error){
      console.log("log start : ");
      console.log(log);
    }
    console.log("err : "+ error);
  });



// would stop and uninstall the filter
  //myEvent.stopWatching();
  res.send('respond with a resource');
});

module.exports = router;
