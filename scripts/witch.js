function chooseWitch() {
    let number = Math.floor(Math.random() * (9757)) + 1;
    return number;
}

module.exports.witchDetails = async () =>{
    let name;
    let image;

    if (sessionStorage.getItem("witch") === null) {
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

        sessionStorage.setItem("witch", name);
        sessionStorage.setItem("image", image);
    } else {
        name = sessionStorage.getItem("witch");
        image = sessionStorage.getItem("image");
    }
    
    let image_card = await document.getElementById("image-card")
    image_card.src = image;

    let board = document.getElementById("board");
    board.style.setProperty('grid-template-columns', 'repeat(' + name.length + ', 1fr)');
    
    return [name, image];
}