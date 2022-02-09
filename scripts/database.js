const faunadb = require('faunadb');
require('dotenv').config();


async function addToLeaderboard(id, url, name, score) {
  var client = new faunadb.Client({
      secret: process.env.FAUNA_KEY
    })
  
  // //var faunadb = (window as any).faunadb;
  var q = faunadb.query
      const response = await client.query(
          q.Create(q.collection("leaderboard"), {
                data: {
                    tokenId: id,
                    pfp_url: url,
                    name: name,
                    score: score,
                    games_played: 1,
                },
          })
      )
        console.log(response)
  }

async function getLeaderboard() {
  var client = new faunadb.Client({
      secret: process.env.FAUNA_KEY
    })
  
  // //var faunadb = (window as any).faunadb;
  var q = faunadb.query
    const response = await client.query(
        q.Paginate(q.Match(q.Index('leaderboard_by_score')))
    )
    console.log(response)
    return response
  }

const getWitchScore =  async (id) => {
  var client = new faunadb.Client({
      secret: process.env.FAUNA_KEY
    })
  
  // //var faunadb = (window as any).faunadb;
  var q = faunadb.query
    const response = await client.query(
      q.Paginate(
          q.Match(q.Index('witch_by_id'), id)
    )
    )
    score = response.data[0].score
    games_played = response.data[0].games_played
    return [score, games_played]
  }

async function updateLeaderboard(id, newScore) {
  var client = new faunadb.Client({
      secret: process.env.FAUNA_KEY
    })
  
  // //var faunadb = (window as any).faunadb;
  var q = faunadb.query
    const gameDetails = getWitchScore(id)
    const games_played = gameDetails[1]
    const score = gameDetails[0]
    averageScore = ((score * games_played) + newScore) / (games_played + 1)
    const response = client.query(
        q.Update(
            q.Ref(q.collection('leaderboard'), id),
            {
                data: {
                    score: averageScore,
                    games_played: games_played + 1,
                }
            })
    )
  }

function constructTable(data) {
             
  let table = 
  '<table class="fl-table">' +
      '<thead>' +
          '<tr>' +
              '<th>ID</th>' +
              '<th></th>' +
              '<th>Witch</th>' +
              '<th>Score</th>' +
              '<th>Games Played</th>' +
           '</tr>' +
       '</thead>' +
       '<tbody>' +
           '<tr>';
           console.log(data['data'][0][0])
  for(let i = 0; i < data['data'].length; i++) {
      table += '<td>' + data['data'][i][0] + '</td>';
      table += '<td>' + `<img src="${data['data'][i][1]}" alt="Witch" class="leaderboard-image">` + '</td>';
      table += '<td>' + data['data'][i][2] + '</td>';
      table += '<td>' + data['data'][i][3] + '</td>';
      table += '<td>' + data['data'][i][4] + '</td>';
      if(i < data['data'].length - 1) table += '</tr><tr>';
  }
  table += '</tr></tbody></table>';

  console.log(table);
  return table;
}

module.exports = {
  getLeaderboard,
  addToLeaderboard,
  updateLeaderboard,
  constructTable,
}