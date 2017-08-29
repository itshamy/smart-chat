import firebase from './firebase.js';
let initial_data_loaded = false;

export function getMessages() {
  return firebase.database().ref('messages').once('value').then(data => {
    const messages = [];
    const values = data.val();
    for (let prop in values) {
      if ({}.hasOwnProperty.call(values, prop)) {
        messages.push(values[prop]);
      }
    }
    initial_data_loaded = true;
    return messages;
  });
}

export function getChannels() {
  return firebase.database().ref('channels').once('value').then(data => {
    const channels = [];
    const values = data.val();
    for (let prop in values) {
      if ({}.hasOwnProperty.call(values, prop)) {
        channels.push(values[prop]);
      }
    }
    return channels;
  });
}

export function saveMessage(message) {
  firebase.database().ref('messages').push(message);
}

export function saveChannel(channel) {
  firebase.database().ref('channels').push(channel);
}

export function onNewChannel(callback, delay = false) {
  firebase.database().ref('channels').on('child_added', (data) => {
    if (!initial_data_loaded) return;
    if (delay) {
      setTimeout(() => callback(data.val()), 3000);
    } else {
      callback(data.val());
    }
  })
}

export function onNewMessage(callback, delay = false) {
  firebase.database().ref('messages').on('child_added', (data) => {
    if (!initial_data_loaded) return;
    if (delay) {
      setTimeout(() => callback(data.val()), 3000);
    } else {
      callback(data.val());
    }
  })
}
