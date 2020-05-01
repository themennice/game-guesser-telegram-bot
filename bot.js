var token = '1044989057:AAGkvVCLjiY3JsJOBjENwm_5tTHy_BBuhxg';

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

console.log('bot server started...');

// hello command
bot.onText(/^\/say_hello (.+)$/, function (msg, match) {
  var name = match[1];
  bot.sendMessage(msg.chat.id, 'Hello ' + name + '!').then(function () {
    // reply sent!
  });
});

// sum command
bot.onText(/^\/sum((\s+\d+)+)$/, function (msg, match) {
  var result = 0;
  match[1].trim().split(/\s+/).forEach(function (i) {
    result += (+i || 0);
  })
  bot.sendMessage(msg.chat.id, result).then(function () {
    // reply sent!
  });
});

// start command
bot.onText(/^\/wakeup (.+)$/, function (msg, match) {
  var name = match[1];
  bot.sendMessage(msg.chat.id, '\tWelcome to Game Guesser Bot, ' + name + '! \nI will think of an Olympic game and you will try to guess it. \n \n Simply type a characteristic of the sport and I will say yes if it belongs to my guessed sport, and no otherwise.\n \n After 10 questions simply type the name of the game you think I guessed! \n \nLet us get started! I have selected a game. Make a guess.').then(function () {
    // reply sent!
  });
});

// sum command
bot.onText(/^\/multiply((\s+\d+)+)$/, function (msg, match) {
  var result = 1;
  match[1].trim().split(/\s+/).forEach(function (i) {
    result = result * (i || 1);
  })
  bot.sendMessage(msg.chat.id, result).then(function () {
    // reply sent!
  });
});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message: ' + chatId);
});