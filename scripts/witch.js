function chooseWitch() {
    let number = Math.floor(Math.random() * (9757)) + 1;
    return number;
}

function setCookie(cname, cvalue) {
    let currentTime = new Date().getTime();
    let expirationTime = currentTime + (60 * 60 * 24 * 1000);
    let expirationDate = new Date(expirationTime);
    document.cookie = cname + "=" + cvalue + "; expires=" + expirationDate.toUTCString() + "; path=/";
}

function getCookie(cname) {
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

const witchDetails = async () =>{
    let name;
    let image;

    if (getCookie("witch") === "") {
        let witch = await chooseWitch();
        let response = await fetch(`https://api.opensea.io/api/v1/asset/0x5180db8f5c931aae63c74266b211f580155ecac8/${witch}`, 
            {
                method: 'GET',
            })
        
        let qualities = await response.json();
        
        image = qualities["image_url"];
        localStorage.setItem("image", image);

        let fullname = qualities["name"];
        let nameList = fullname.split(" ");

        if (nameList[0] == "the") {
            name = nameList[1].replace(",", "");
        } else {
            name = nameList[0].replace(",", "")
        }

        setCookie("witch", name);
        setCookie("image", image);
    } else {
        name = getCookie("witch");
        image = getCookie("image");
    }
    
    let image_card = await document.getElementById("image-card")
    image_card.src = image;

    let board = document.getElementById("board");
    board.style.setProperty('grid-template-columns', 'repeat(' + name.length + ', 1fr)');
    
    return [name, image];
}

module.exports = {
    setCookie,
    witchDetails,
}