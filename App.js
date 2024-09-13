import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import { ethers } from "ethers";

import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";

import { loadMoonPay } from '@moonpay/moonpay-js';
import { get } from 'https-browserify';

function App() {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //      "MOONPAY"                                                                                                                                        ///
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async function initialize()
  {
    const moonPay = await loadMoonPay();

    const widget = moonPay?.({
      flow: "buy",
      environment: "sandbox",
      params: 
      {
        apiKey: "pk_test_42vnOKwdNlJP8PM12D1EFPKAS0AViAv",
        defaultCurrencyCode: "ETH_ARBITRUM",
      },
      variant: "overlay",
      handlers: 
      {
        async onTransactionCompleted(props) 
        {
          console.log("onTransactionCompleted", props);
        },
      },
    });
    
    widget?.show();
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //      "web3Auth"                                                                                                                                       ///
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////
  //      "web3AuthScSetUp"                                  ///
  //////////////////////////////////////////////////////////////

  let smartContractAddressOne = "0x21bc5a08Cf417DDeE742bb7F55Ba9129d2d4121C";
  let smartContractAbiOne = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allowance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientAllowance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSpender",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "etherBalance",
          "type": "uint256"
        }
      ],
      "name": "calculate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  let smartContractAddressTwo = "0x5C185Be81a733Ddd09273d9c2Da3514b82152458";
  let smartContractAbiTwo = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burnFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  let smartContractAddressThree = "0x11Ccf08EE86D49d8E00953508A164773C99AbB6d";
  let smartContractAbiThree = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_baseToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_stakingToken",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "caller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "caller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "TransferStakingTokenOwnership",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_depositFee",
          "type": "uint256"
        }
      ],
      "name": "UpdateDepositFee",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "caller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "FEE_DENOMINATOR",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MAX_DEPOSIT_FEE",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "baseToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "depositFee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "previewDeposit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "stakingToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferStakingTokenOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newFee",
          "type": "uint256"
        }
      ],
      "name": "updateDepositFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  let provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/22c1492f1a084264b738747af929a126");

  let smartContractInstanceOne = new ethers.Contract(smartContractAddressOne, smartContractAbiOne, provider);
  let smartContractInstanceTwo = new ethers.Contract(smartContractAddressTwo, smartContractAbiTwo, provider);
  let smartContractInstanceThree = new ethers.Contract(smartContractAddressThree, smartContractAbiThree, provider);

  //////////////////////////////////////////////////////////////
  //      "STATE"                                            ///
  //////////////////////////////////////////////////////////////

  const [address, setAddress] = useState(null);
  const [signer, setSigner] = useState(null);

  const [web3AuthProvider, setWeb3AuthProvider] = useState(null);
  const [web3AuthUserSigner, setWeb3AuthUserSigner] = useState(null);
  const [web3AuthUserAddress, setWeb3AuthUserAddress] = useState(null);

  const [web3AuthScInstanceOne, setWeb3AuthScInstanceOne] = useState(null);
  const [web3AuthScInstanceTwo, setWeb3AuthScInstanceTwo] = useState(null);
  const [web3AuthScInstanceThree, setWeb3AuthScInstanceThree] = useState(null);
  
  const [userAddressToValidate, setUserAddressToValidate] = useState(null);
  const [sig, setSig] = useState(null);
  const [userNfts, setUserNfts] = useState(0);
  const [actualSupply, setActualSupply] = useState(0);

  const [balance, setBalance] = useState(null);

  const [userConnected, setUserConnected] = useState(false);
  const [web3AuthUserConnected, setWeb3AuthUserConnected] = useState(false);

  //////////////////////////////////////////////////////////////
  //      "scDataState"                                      ///
  //////////////////////////////////////////////////////////////
  const [metisTokensBalance, setMetisTokensBalance] = useState(null);
  const [liquidTokensBalance, setLiquidTokensBalance] = useState(null);


  async function requestAccount() 
  {
    if(window.ethereum)
    {
      let accounts = await window.ethereum.request({ method: "eth_requestAccounts", });

      const _signer = await provider.getSigner();
      const _address = accounts[0];

      setAddress(_address);
      setSigner(_signer);
      setUserConnected(true);

      console.log("signer");
      console.log(_signer);
      console.log("address:");
      console.log(_address);
    }
    else
    {
      console.log("Metamask isnt installed.");
    }

    console.log("userObject:");
    console.log(signer);
  }

  async function signHash()
  {
    let hash = "0xad575911bdaa235cf1c2b044eea29a79bd269fe83652f53c386d53b62aba7cc5";
    // let hash = await smartContractInstance.getHashToSignForUser(address);
    // console.log("User hashes:");
    // console.log(hash);
    let signature = await signer.signMessage(ethers.utils.arrayify(hash));
    console.log("signature");
    console.log(signature);

    setSig(signature);
  }


  //////////////////////////////////////////////////////////////
  //      "web3AuthConfig"                                   ///
  //////////////////////////////////////////////////////////////

  const web3auth = new Web3Auth({
    clientId: "BPKgwBAB8zE8AGOgQ8_VFfoQYnWvjGKgluUo_VafSXQRI12pNWj5Aa-55v4RKavn08rtdCszzlmIgsbb72deXwg", // Get your Client ID from the Web3Auth Dashboard
    web3AuthNetwork: "sapphire_mainnet", // Web3Auth Network
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0xaa36a7", // Please use 0x1 for Mainnet
      rpcTarget: "https://sepolia.infura.io/v3/22c1492f1a084264b738747af929a126",
      displayName: "Ethereum Sepolia",
      blockExplorerUrl: "https://sepolia.etherscan.io",
      ticker: "ETH",
      tickerName: "Ethereum",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
  });

  async function initWeb3Auth()
  {
    await web3auth.initModal();


    // console.log("WEB3 AUTH OBJECT:");
    // console.log(web3auth);

    // if(web3auth.provider)
    // {
    //   console.log("THERES WEB3AUTH PROVIDER:");
    //   console.log(web3auth.provider);
    // }
    // else
    // {
    //   console.log("THERES NO WEB3AUTH PROVIDER:");
    // }
  }

  async function connectToWeb3Auth()
  {
    await web3auth.connect();
    setUserConnected(true);
    setWeb3AuthUserConnected(true);

    const user = await web3auth.getUserInfo();
    console.log("USER FROM getUserInfo method:")
    console.log(user);


    const web3authEthersProvider =  new ethers.providers.Web3Provider(web3auth.provider);
    const web3AuthSigner = await web3authEthersProvider.getSigner();
    const web3AuthAddress = await web3AuthSigner.getAddress();

    setWeb3AuthProvider(web3authEthersProvider);
    setWeb3AuthUserSigner(web3AuthProvider);
    setWeb3AuthUserAddress(web3AuthAddress);

    console.log("DATA FROM WEB3AUTH PROVIDER:");
    console.log("SIGNER:");
    console.log(web3AuthSigner);
    console.log("ADDRESS");
    console.log(web3AuthAddress);

    let web3AuthContractOne = new ethers.Contract(smartContractAddressOne, JSON.parse(JSON.stringify(smartContractAbiOne)), web3AuthSigner);
    setWeb3AuthScInstanceOne(web3AuthContractOne);
    let web3AuthContractTwo = new ethers.Contract(smartContractAddressTwo, JSON.parse(JSON.stringify(smartContractAbiTwo)), web3AuthSigner);
    setWeb3AuthScInstanceTwo(web3AuthContractTwo);
    let web3AuthContractThree = new ethers.Contract(smartContractAddressThree, JSON.parse(JSON.stringify(smartContractAbiThree)), web3AuthSigner);
    setWeb3AuthScInstanceThree(web3AuthContractThree);

    let balance = await provider.getBalance(web3AuthAddress);
    console.log("BALANCE");
    console.log(balance);
    let balanceString = balance.toString();
    console.log(balanceString);
    setBalance(balanceString);

    await getData();
  }

  async function logoutWeb3Auth()
  {
    await web3auth.logout();
    setUserConnected(false);
    setWeb3AuthUserConnected(false);
  }

  //////////////////////////////////////////////////////////////
  //      "web3AuthScInteraction"                            ///
  //////////////////////////////////////////////////////////////

  async function getData()
  {
    let metisTokens = await web3AuthScInstanceOne.balanceOf(web3AuthUserAddress);
    let metisTokensStr = metisTokens.toString();
    setMetisTokensBalance(metisTokensStr);
    console.log("metisTokens")
    console.log(metisTokensStr);

    let liquidTokens = await web3AuthScInstanceTwo.balanceOf(web3AuthUserAddress);
    let liquidTokensStr = liquidTokens.toString();
    setLiquidTokensBalance(liquidTokensStr);
    console.log("liquidTokens")
    console.log(liquidTokensStr);
  }

  async function mintTokens()
  {
    const tx = web3AuthScInstanceOne.mint(web3AuthUserAddress, {value: 1});

    const txReceipt = await tx;
    console.log("SE MINTEO.");
    console.log(txReceipt);

    await getData();
  }

  async function setupYield()
  {
    const intMetisTokensBalance = parseInt(metisTokensBalance, 10);
    const tx = web3AuthScInstanceOne.approve(smartContractAddressThree, intMetisTokensBalance);

    const txReceipt = await tx;
    console.log("SE MINÓ TX 1.");
    console.log(txReceipt);
  }

  async function makeYield()
  {
    const intMetisTokensBalance = parseInt(metisTokensBalance, 10);
    const tx2 = web3AuthScInstanceThree.deposit(intMetisTokensBalance, web3AuthUserAddress);

    const txReceipt2 = await tx2;
    console.log("SE MINÓ TX 2.");
    console.log(txReceipt2);

    await getData();
  }





  initWeb3Auth();
  // getData();


  return (
    <div className="App">
      {/* <header className="App-header">
        <button onClick={initialize}>init</button>
      </header>

      <body style={{paddingTop: '1.5rem'}}>
        {
        userConnected ?
          <div>
            <div>
              <h2>connectedWeb3AuthUser: {web3AuthUserAddress}</h2>
            </div>

            <div>
              <h2> userBalance: {balance}</h2>
            </div>

            <div>
              <h2> userTokens: {metisTokensBalance}</h2>
              <h2> userLiquidTokens: {liquidTokensBalance}</h2>              
            </div>

            <div>
              <button onClick={mintTokens}>Get tokens</button>
            </div>

            <div>
              <button onClick={setupYield}>setUpYield</button>
            </div>

            <div>
              <button onClick={makeYield}>makeYield</button>
            </div>

            <div>
              <button onClick={getData}>getData</button>
            </div>

            <div style={{paddingTop: '3rem'}}>
              <div>
                <h2>Discconect Web2Wallet:</h2>
                <button onClick={logoutWeb3Auth}>Discconect</button>
              </div>
            </div>
          </div>
        :
          <div>
            <div style={{paddingTop: '2rem'}}>
              <h2>connect using Web2Wallet</h2>
              <button onClick={connectToWeb3Auth}>connectWeb3Auth</button>
            </div>
          </div>
        }
      </body> */}

      {
        userConnected ?
        <div>
          <header>
            <div>
              <h2>connectedWeb3AuthUser: {web3AuthUserAddress}</h2>
            </div>
          </header>


          <body>
            <div  style={{paddingTop: '2rem'}}>
              <h2> User point balance: {balance}</h2>
            </div>

            <div>
              <button onClick={initialize}>Buy with card more points</button>  
            </div>

            <div style={{paddingTop: '2rem'}}>
              <div style={{paddingTop: '2rem'}}>
                <h2> userCoins: {metisTokensBalance}</h2>
                <button onClick={mintTokens}>Buy coins</button>
              </div>
              
              <div style={{paddingTop: '2rem'}}>
                <h2> userInvestedCoins: {liquidTokensBalance}</h2>  
                <button onClick={setupYield}>SetUp investment</button>     
                <button onClick={makeYield}>Invest</button>       
              </div>
            </div>

            <div style={{paddingTop: '3.5rem'}}>
              <button onClick={getData}>getData</button>
            </div>

            <div style={{paddingTop: '3rem'}}>
              <div>
                <h2>Discconect Web2Wallet:</h2>
                <button onClick={logoutWeb3Auth}>Discconect</button>
              </div>
            </div>
          </body>
      </div>

      :

      <div>
        <header>
            <h2>connect using Web2Wallet</h2>
            <button onClick={connectToWeb3Auth}>connectWeb3Auth</button>
        </header>
      </div>
      }
    </div>
  );
}

export default App;
