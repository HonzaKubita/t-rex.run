import MultiplayerJSClient from 'multiplayerjs-client';

const client = new MultiplayerJSClient();

client.connect("ws://localhost:5432");

export default client;