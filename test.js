function chooseWitch() {
    let number = Math.floor(Math.random() * (9757)) + 1;
    return number;
}

function archetypeOfPower(_qualities) {
    let archetype;
    let i = 0;

    while (archetype === undefined) {
        if (qualities["traits"][i] == "Archetype of Power") {
            archetype = qualities["traits"][i]["value"];
        }
        i++;
    }
    return archetype;
}

function Will(_qualities) {
    let will;
    let i = 0;
    
    while (will === undefined) {
        if (qualities["traits"][i] == "Will") {
            will = qualities["traits"][i]["value"];
        }
    }
    return will;
}

function Wisdom(_qualities) {
    let wisdom;
    let i = 0;
    
    while (wisdom === undefined) {
        if (qualities["traits"][i] == "Wisdom") {
            wisdom = qualities["traits"][i]["value"];
        }
        i++
    }
    return wisdom;
}

function Wit(_qualities) {
    let wit;
    let i = 0;
    
    while (wit === undefined) {
        if (qualities["traits"][i] == "Wit") {
            wit = qualities["traits"][i]["value"];
        }
        i++
    }

    return wit;
}

async function description() {
    let witchDescription;
    let witch = await chooseWitch();
    let response = await fetch(`https://api.opensea.io/api/v1/asset/0x5180db8f5c931aae63c74266b211f580155ecac8/${witch}`, 
        {
            method: 'GET',
        })
        // .then(response => console.log(response.json()))
    qualities = await response.json();
    let archetype = await archetypeOfPower(qualities);
    let will = await Will(qualities);
    let wisdom = await Wisdom(qualities);
    let wit = await Wit(qualities);

    name = qualities["name"];
    witchDescription = `The ${archetype}`;
    if (parseInt(will) > 5) {
        witchDescription += ` who is willful`
    }

    if (parseInt(wisdom) > 5) {
        witchDescription += ` and full of wisdom.`
    } else {
        witchDescription += ` but not so wise.`
    }

    switch (wit) {
        case "9":
            witchDescription += `Her wittiness outshines the others'.`
            break;
        case "8":
            witchDescription += `Her wit is a marvel to behold.`
            break;
        case undefined:
            witchDescription += `Unlike many witches, she isn't witty.`
            break;
        default:
            
    }

    console.log(qualities, archetype)
    // console.log(response.json())
    return witchDescription;
}

// description();
document.getElementById("summon").onclick = async () => {
    console.log("got here");
    description();
}

async function summonWitch(_name) {
    tries += 1;
    if (_name !== name) {
        alert(`You summoned the wrong witch. ${3 - tries} tries left.`);
    } else {
        alert(`You just summoned ${name}!`);
    }

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
}