module.exports.currentStat = async () => {
    let guessed = localStorage.getItem("guessed");
    let witch = localStorage.getItem("witch");
    let image = localStorage.getItem("image");

    let image_card = document.getElementById("image-card")
    image_card.src = image;
    let result = localStorage.getItem('result');
          
    document.getElementById("result").innerHTML = result;
    let status = localStorage.getItem('status');
    document.getElementById("m-title").value = status;
    createSquares(witch);

    guessed = guessed.split(",");

    const interval = 200;

    await guessed.forEach((letter, index) => {
        setTimeout(() => {
            let _index = index % witch.length
            let tileColor = getTileColor(letter, _index, witch);
            let tileColorText = getTileColorText(letter, _index, witch);
            const letterId = 1 + index;
            const letterEl = document.getElementById(letterId);
            letterEl.classList.add("animate__flipInX");
            letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;

            const keyboardLetter = document.querySelector(`[data-key="${letter}"]`);
            if (tileColor !== "rgb(181, 159, 59)") {
                keyboardLetter.style = `background-color:${tileColor};border-color:${tileColor}`;
            }
        }, interval * index);
    })  

}

function getTileColor(letter, index, name) {
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

  function getTileColorText(letter, index, name) {
    const correctPosition = "🟩";
    const correctLetter = "🟨";
    const incorrectLetter = "⬛";

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

  function createSquares(name) {
    const gameBoard = document.getElementById("board");
    let cap = +name.length * 5
    let board = document.getElementById("board");
    board.style.setProperty('grid-template-columns', 'repeat(' + name.length + ', 1fr)');
    for (let index = 0; index < cap; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }
