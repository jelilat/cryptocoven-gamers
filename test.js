const faunadb = require('faunadb');

var client = new faunadb.Client({
    secret: "",
  })

var q = faunadb.query
    
async function add() {
    const response = client.query(
        q.Create(q.Collection("test"), {
              data: {
                  witch: "tests",
              },
        })
    )
      console.log(response)
}
add()