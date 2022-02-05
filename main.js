document.addEventListener("DOMContentLoaded", () => {

    let qualities;
    let tries;
    let name;
    let image;
    const serverUrl = "https://svrc1oyzr9kk.usemoralis.com:2053/server";
    const appId = "rcOxkXrAg18ef8kakZKx7fwXtrUPJhjtDdVoP0s0";
    Moralis.start({ serverUrl, appId });

    async function login() {
        let user = Moralis.User.current();
        if (!user) {
          user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
            .then(function (user) {
              console.log("logged in user:", user);
              console.log(user.get("ethAddress"));
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
      
    async function logOut() {
        await Moralis.User.logOut();
        console.log("logged out");
      }
      
    document.getElementById("connect-wallet").onclick = login;
    //   document.getElementById("btn-logout").onclick = logOut;
    // document.getElementById("summon").onclick = witchDetails;

    $('.stack').click(function() {
  
        $(".card").each(function(e) {
      
          setTimeout(function() {
            $(".card").eq(e).attr("class", "card");
          }, e * 150)
          
        });
        
      });
      
      $('.spread').click(function() {
        
        $(".card").each(function(e) {
      
          setTimeout(function() {
            $(".card").eq(e).attr("class", "card ani" + e);
          }, e * 150)
          
        });
        
      });

    function chooseWitch() {
    let number = Math.floor(Math.random() * (9757)) + 1;
    return number;
    }

  async function witchDetails() {
    let witch = await chooseWitch();
    let response = await fetch(`https://api.opensea.io/api/v1/asset/0x5180db8f5c931aae63c74266b211f580155ecac8/${witch}`, 
        {
            method: 'GET',
        })
        // .then(response => console.log(response.json()))
    qualities = await response.json();
    
    image = qualities["image_url"];

    let image_card = await document.getElementById("image-card")
    image_card.src = image;
    let fullname = qualities["name"];
    let nameList = fullname.split(" ");
    if (nameList[0] == "the") {
        name = nameList[1].replace(",", "");
    } else {
        name = nameList[0].replace(",", "")
    }
    
    let board = document.getElementById("board");
    board.style.setProperty('grid-template-columns', 'repeat(' + name.length + ', 1fr)');
    createSquares(name);
    return name;
  }
witchDetails();

//   getNewWord();

  let guessedWords = [[]];
  let availableSpace = 1;

  let word;
  let guessedWordCount = 0;

  const keys = document.querySelectorAll(".keyboard-row button");

  function getNewWord() {
    word = witchDetails();
  }

  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 8) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));

      availableSpace = availableSpace + 1;
      availableSpaceEl.textContent = letter;
    }
  }

  function getTileColor(letter, index) {
    const isCorrectLetter = word.includes(letter);

    if (!isCorrectLetter) {
      return "rgb(58, 58, 60)";
    }

    const letterInThatPosition = word.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      return "rgb(83, 141, 78)";
    }

    return "rgb(181, 159, 59)";
  }

  function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length !== word.length) {
      window.alert(`Word must be ${word.length} letters`);
    }

    const currentWord = currentWordArr.join("");

    // fetch(`https://wordsapiv1.p.rapidapi.com/words/${currentWord}`, {
    //   method: "GET",
    //   headers: {
    //     "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
    //     "x-rapidapi-key": "61c5e3986dmsh20c1bee95c2230dp18d1efjsn4668bbcfc1b3",
    //   },
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw Error();
    //     }

        const firstLetterId = guessedWordCount * word.length + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
          setTimeout(() => {
            const tileColor = getTileColor(letter, index);

            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);
            letterEl.classList.add("animate__flipInX");
            letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
          }, interval * index);
        });

        guessedWordCount += 1;

        if (currentWord === word) {
          window.alert("Congratulations!");
        }

        if (guessedWords.length === 5) {
          window.alert(`Sorry, you failed to bring her home. Try again!`);
        }

        guessedWords.push([]);
    //   })
    //   .catch(() => {
    //     window.alert("Word is not recognised!");
    //   });
  }

  function createSquares(name) {
    const gameBoard = document.getElementById("board");
    let cap = +name.length * 5
    console.log(cap)
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
  });