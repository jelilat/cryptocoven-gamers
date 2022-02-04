document.addEventListener("DOMContentLoaded", () => {

    let qualities;
    let tries;
    let name;
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
    document.getElementById("summon").onclick = shuffle

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

      /*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


function shuffle(myCard) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return myCard;
}
/* Register the .deck to the click event */
// Note: the second parameter .card
$('.deck').on('click', '.card', handler)

/* The handler "knows" that any .card is e.target and this */
// toggleClass the .open and .show classes
function handler(event) {
  $(this).toggleClass('open show');
};

/*$(document).ready(function() {
    $("li").click(function(event) {
      $target = $(event.target);
      $target.toggleClass("card");
    });
  });



/*
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

createSquares();
//   getNewWord();

  let guessedWords = [[]];
  let availableSpace = 1;

  let word = "tamarind";
  let guessedWordCount = 0;

  const keys = document.querySelectorAll(".keyboard-row button");

  function getNewWord() {
    fetch(
      `https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=5&lettersMax=5`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key": "<YOUR_KEY_GOES_HERE>",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        word = res.word;
      })
      .catch((err) => {
        console.error(err);
      });
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
    if (currentWordArr.length !== 8) {
      window.alert("Word must be 8 letters");
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

        const firstLetterId = guessedWordCount * 8 + 1;
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

  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 40; index++) {
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