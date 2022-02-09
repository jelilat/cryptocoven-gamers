require('dotenv').config();

module.exports.getTokenBalance = async (useraddress, contractaddress) => {
    const witchesDetails = await fetch(`https://deep-index.moralis.io/api/v2/${useraddress}/nft/${contractaddress}?chain=eth&format=decimal`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.MORALIS_KEY,
        },
    })

    const witches = await witchesDetails.json();
    const witchId = witches.result[0]["token_id"];
    console.log(witchId)

    let response = await fetch(`https://api.opensea.io/api/v1/asset/0x5180db8f5c931aae63c74266b211f580155ecac8/${witchId}`, 
        {
            method: 'GET',
        })
        
    const qualities = await response.json();
    const image = qualities["image_url"];
    const name = qualities["name"];

    return [image, name, witchId]
}