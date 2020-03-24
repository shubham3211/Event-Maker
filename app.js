const express = require('express');
const app = express();
let bodyParser = require('body-parser');
let port = process.env.PORT || 5000;
var cors = require('cors')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors())

let events = {};

app.get('/events', (req, res) => {
  console.log('events :', events);
  res.send({
    events
  });
})

app.put('/events/:id', (req, res) => {
  if(!events[req.params.id]){
    res.send({
      status: false,
      message: 'Event doesnot exist'
    })
  }else{
    if(req.body.name){
      events[req.params.id].name = req.body.name;
    }
    if(req.body.imageUrl){
      events[req.params.id].imageUrl = req.body.imageUrl;
    }
    if(req.body.location){
      events[req.params.id].location = req.body.location;
    }
    res.send({
      status: true,
      message: "event updated"
    })
  }
})

app.post('/add-event', (req, res) => {
  let id = Object.keys(events).length+1;
  events[id] = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    location: req.body.location
  }
  res.send({
    status: true,
    message: "event added"
  })
})

app.put('/delete-event/:id', (req, res) => {
  if(events[req.params.id]){
    delete events[req.params.id];
    res.send({
      status: true,
      message: "Event deleted"
    })
  }else{
    res.send({
      status: false,
      message: "Please send right parameter"
    })
  }
})

app.listen(5000, () => console.log('listening on port 5000'));  