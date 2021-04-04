// imports
const express = require('express');
const mongoose = require('mongoose');
const Pusher = require('pusher');
const cors = require('cors');

const Messages = require('./dbMessages');

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: '1182484',
  key: 'b302e9fea3541be91c7c',
  secret: 'bf99300372566fa10ff8',
  cluster: 'ap2',
  useTLS: true
});

// middleware
app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   next();
// });
app.use(cors());

// DB Config
const connectionUrl =
  'mongodb://admin:ExbPUz3mY4UNLGXg@cluster0-shard-00-00.zqgms.mongodb.net:27017,cluster0-shard-00-01.zqgms.mongodb.net:27017,cluster0-shard-00-02.zqgms.mongodb.net:27017/whatsappdb?ssl=true&replicaSet=atlas-1wopl5-shard-0&authSource=admin&retryWrites=true&w=majority';
// 'mongodb+srv://admin:ExbPUz3mY4UNLGXg@cluster0.zqgms.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('DB connected');

  const msgCollection = db.collection('messagecontents');
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change) => {
    console.log(change);

    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        recevied: messageDetails.recevied
      });
    } else {
      console.log('Error triggering Pusher');
    }
  });
});

// api routes
app.get('/', (req, res) => res.status(200).send('hello!!! 👍'));

app.get('/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/messages/new', (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
