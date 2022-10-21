import app from './app';

const serverPort = 4000;

app.listen(serverPort, () => {
  console.log('Server running on port %d', serverPort);
});
