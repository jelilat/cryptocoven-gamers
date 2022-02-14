const Web3 = require('web3');
require('dotenv').config();
const detectEthereumProvider = require("@metamask/detect-provider");
// const Walletconnect = require('walletconnect');
const { providers, ethers } = require('ethers')
const database = require('./database.js')
const { getTokenBalance } = require('./balance.js')
const { witchDetails, setCookie } = require('./witch.js')
const { currentStat } = require('./daily.js')

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_ID));
const contract = "0x5180db8F5c931aaE63c74266b211F580155ecac8";
const abi = [{"inputs":[{"internalType":"address","name":"_openSeaProxyRegistryAddress","type":"address"},{"internalType":"uint256","name":"_maxWitches","type":"uint256"},{"internalType":"uint256","name":"_maxCommunitySaleWitches","type":"uint256"},{"internalType":"uint256","name":"_maxGiftedWitches","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"COMMUNITY_SALE_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_WITCHES_PER_WALLET","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PUBLIC_SALE_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimListMerkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"communityMintCounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"communitySaleMerkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBaseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLastTokenId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"}],"name":"giftWitches","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isCommunitySaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPublicSaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxCommunitySaleWitches","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxGiftedWitches","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWitches","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numberOfTokens","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint8","name":"numberOfTokens","type":"uint8"},{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"}],"name":"mintCommunitySale","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numGiftedWitches","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"numToReserve","type":"uint256"}],"name":"reserveForGifting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"}],"name":"rollOverWitches","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"royaltyAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"merkleRoot","type":"bytes32"}],"name":"setClaimListMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"merkleRoot","type":"bytes32"}],"name":"setCommunityListMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_isCommunitySaleActive","type":"bool"}],"name":"setIsCommunitySaleActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_isOpenSeaProxyActive","type":"bool"}],"name":"setIsOpenSeaProxyActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_isPublicSaleActive","type":"bool"}],"name":"setIsPublicSaleActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_verificationHash","type":"string"}],"name":"setVerificationHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"verificationHash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const covenContract = new web3.eth.Contract(abi, contract);

document.addEventListener("DOMContentLoaded", async () => {
  // await database.getLeaderboard()
  // .then(function(result) {
  //   let table = database.constructTable(result);
  //   document.getElementById("leaderboard").innerHTML = table;
  // })
  // .catch(function(err) {
  //   console.log(err);
  // });

  let playTime = parseInt(localStorage.getItem("time"));
  let currentTime = new Date().getTime();
  
  if (currentTime - playTime < 86400000) {
    currentStat()
    document.getElementById("show-modal").click();
  } 
  else {
    let name;
    let image;
    witch();
      
    // const leaderboard = document.getElementById("join-leaderboard")
    // leaderboard.onclick = saveScore;
    
    // document.getElementById("share").onclick = () => {
    //   console.log("got here")
    //   if (navigator.share) {
    //     let result = localStorage.getItem
    //     navigator.share({
    //       text: result
    //       // title: "I just got a score of " + score + " in Witchcraft!",
    //       // text: "I just got a score of " + score + " in Witchcraft! Can you beat me?",
    //       // url: "https://witchcraft.io",
    //     });
    //   } else {
    //     let data = document.getElementById("share").value
    //     data = data.replace("<br>", "")
    //     navigator.clipboard.writeText(data);
    //   }
    // };
    
    async function connectWallet() {
      const ethereumProvider = await detectEthereumProvider();
      if (ethereumProvider) {
        await detectEthereumProvider(ethereumProvider);
            
        const accounts = await (window).ethereum.request({ method: 'eth_requestAccounts' });
        web3.eth.defaultAccount = accounts[0];
      } else {
         //  Create WalletConnect SDK instance
         const wc = new WalletConnect();

         //  Connect session (triggers QR Code modal)
         const connector = await wc.connect();
 
         //  Get your desired provider
 
         const provider = await wc.getWeb3Provider({
             infuraId: infuraId,
             qrcodeModalOptions: {
                 mobileLinks: [
                 "rainbow",
                 "metamask",
                 "argent",
                 "trust",
                 "imtoken",
                 "pillar",
                 ],
             },
         });
 
         const account = await provider.enable();
         web3.eth.defaultAccount = account[0];
 
         //  Wrap with Web3Provider from ethers.js
         const web3Provider = new providers.Web3Provider(provider);
      }
    }

  //   document.getElementById("join-leaderboard").onclick = 
  async function saveScore() {
      if (web3.eth.defaultAccount == null) {
        await connectWallet()
      }
      const balance = await covenContract.methods.balanceOf(web3.eth.defaultAccount).call();
      if (balance > 0) {

        const tokenDetails = await getTokenBalance(web3.eth.defaultAccount, contract);
        let [pfp_url, witch_name, witchId] = tokenDetails;
        let score = localStorage.getItem('score');

        if (database.getWitchScore(witchId) == null) {
          await database.addToLeaderboard(witchId, pfp_url, witch_name, score);
        } else {
          await database.updateLeaderboard(witchId, score);
        }
      } else {
        leaderboard.innerHTML = "You don't own a witch."
      }
  }

  async function witch() {
    // await database.getLeaderboard()
    // .then(function(result) {
    //   database.constructTable(result);
    // })
    // .catch(function(err) {
    //   console.log(err);
    // });

    const details = await witchDetails();
    name = details[0];
    image = details[1];
    await createSquares(name);
    
  }



  let guessedWords = [[]];
  let availableSpace = 1;

  let guessedWordCount = 0;
  const correctPosition = "🟩";
  const correctLetter = "🟨";
  const incorrectLetter = "⬛";
  let result = "";
  let result2 = "";

  const keys = document.querySelectorAll(".keyboard-row button");


  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < name.length + 1) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));

      availableSpace = availableSpace + 1;
      availableSpaceEl.textContent = letter;
    }
  }

  function getTileColor(letter, index) {
    const isCorrectLetter = name.includes(letter);

    if (!isCorrectLetter) {
      return "rgb(58, 58, 60)";
    }

    const letterInThatPosition = name.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      return "rgb(83, 141, 78)";
    }

    return "rgb(181, 159, 59)";
  }

  function getTileColorText(letter, index) {
    const isCorrectLetter = name.includes(letter);

    if (!isCorrectLetter) {
      return incorrectLetter
    }

    const letterInThatPosition = name.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      return correctPosition;
    }

    return correctLetter;
  }

  async function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length !== name.length) {
      window.alert(`Word must be ${name.length} letters`);
    } else {
        const currentWord = currentWordArr.join("");
        result += " <br>";
        result2 += " ";

        const firstLetterId = guessedWordCount * name.length + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
          setTimeout(() => {
            const tileColor = getTileColor(letter, index);
            const tileColorText = getTileColorText(letter, index);
            result += tileColorText;
            result2 += tileColorText;

            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);
            letterEl.classList.add("animate__flipInX");
            letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;

            const keyboardLetter = document.querySelector(`[data-key="${letter}"]`);
            if (tileColor !== "rgb(181, 159, 59)") {
              keyboardLetter.style = `background-color:${tileColor};border-color:${tileColor}`;
            }
          }, interval * index);
        });

        guessedWordCount += 1;
        guessedWords.push([]);
        
        if (currentWord === name) {
          let preResult = "witchle " + guessedWordCount +"/6 ";
          let preResult2 = "witchle " + guessedWordCount +"/6 ";

          for (let i = 0; i < name.length; i++) {
            final += correctPosition;
          }

          result = preResult + result + final + " ";

          result = preResult + result + final + "<br>";
          result2 = preResult2 + result2 + final + " ";
          localStorage.setItem('result', result2);
          
          document.getElementById("result").innerHTML = result;
          document.getElementById("m-title").value = "You won!";
          localStorage.setItem('status', "You won!");
          localStorage.setItem('score', 1/guessedWordCount);
          let time = new Date().getTime()
          localStorage.setItem('time', time);
          document.getElementById("share").value = result;

          localStorage.setItem('guessed', guessedWords)
          localStorage.setItem("witch", name)

          setCookie('witch', "");
          setCookie('image', "");
          location.reload();
          // saveScore();

        } else if (guessedWords.length === 7) {
          let preResult = "witchle " + guessedWordCount +"/6 <br>";
          let preResult2 = "witchle " + guessedWordCount +"/6 ";

          result = preResult + result + "<br>";
          result2 = preResult2 + result2 + " ";
          localStorage.setItem('result', result2);
          
          document.getElementById("result").innerHTML = result;
          document.getElementById("m-title").value = "Oops! Try again tomorrow";
          localStorage.setItem('status', "Oops! Try again tomorrow");
          let time = new Date().getTime()
          localStorage.setItem('time', time);
         
          document.getElementById("share").value = result;

          localStorage.setItem('guessed', guessedWords)
          localStorage.setItem("witch", name)

          setCookie('witch', "");
          setCookie('image', "");
          location.reload();
          // saveScore();
        }
    }
  }

  function createSquares(name) {
    const gameBoard = document.getElementById("board");
    let cap = +name.length * 6
    
    for (let index = 0; index < cap; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }

  function handleDeleteLetter() {
    const currentWordArr = getCurrentWordArr();
    const removedLetter = currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(String(availableSpace - 1));

    lastLetterEl.textContent = "";
    availableSpace = availableSpace - 1;
  }

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");

      if (letter === "enter") {
        handleSubmitWord();
        return;
      }

      if (letter === "del") {
        handleDeleteLetter();
        return;
      }

      updateGuessedWords(letter);
    };
  }
  }

  
  });