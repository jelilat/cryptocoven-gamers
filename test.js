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
}