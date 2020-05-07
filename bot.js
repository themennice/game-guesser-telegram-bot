var token = '1044989057:AAGkvVCLjiY3JsJOBjENwm_5tTHy_BBuhxg';

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

// declare variables for five rounds and 10 questions for each round
let round = 1;
let question_num = 0;
var sport_chars;

console.log('bot server started...');

// start command for the guess game
bot.onText(/^\/wakeup (.+)$/, function (msg, match) {

  // Store user's name
  var name = match[1];

  // Send a welcome message and capitalize the first word of the name only
  bot.sendMessage(msg.chat.id, '\tWelcome to Game Guesser Bot, ' + name.charAt(0).toUpperCase() + name.substring(1).toLowerCase() +'! \nI will think of an Olympic game and you will try to guess it.\n\nSimply type a characteristic as \/ask something\. I will say yes if it belongs to my guessed sport, and no otherwise.\n\nAfter 10 questions simply type the name of the game you think I guessed!').then(function () {
  // 
  bot.sendMessage(msg.chat.id, 'You could also type \[show all options\] (without brackets) to see all available sport characteristics.');
  play(msg.chat.id);
  });

});


// helper function for asking
bot.onText(/^\/ask (.+)$/, function (msg, match) {

  var sport = match[1];
  
  if(sport_chars.includes(sport.toString().toLowerCase())) {
    bot.sendMessage(msg.chat.id, "Yes").then(function () {
      question_num++;
      if(question_num == 3) {
        bot.sendMessage(msg.chat.id, "Guess the game by typing it below");
      }
    });
  }

  else {
      bot.sendMessage(msg.chat.id, "No").then(function () {
      question_num++;
      if(question_num == 3) {
        bot.sendMessage(msg.chat.id, "Guess the game by typing it below");
      }
    });
  };

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

function play(chatId){

  // declare a list of the Olympic sports for a given demonstration
  var sports = ['basketball', 'football', 'gymnastics', 'surfing', 'boxing', 'tennis'];

  // intiate and populate Olympic sports lists - basketball
  var basketball = ['court', 'basket', 'team', 'basketball', 'timed'];
  var football = ['goal', 'goalkeeper', 'team', 'doubles', 'grass', 'football', 'field', 'stadium', 'halves'];
  var gymnastics = ['gym', 'flexibility', 'score', 'jumping'];
  var surfing = ['surfboard', 'outside', 'water', 'waves', 'singles', 'score'];
  var boxing = ['knockout', 'timed', 'singles', 'punches', 'money', 'concussions', 'danger'];
  var tennis = ['court', 'singles', 'doubles', 'outdoor', 'ball', 'racket', 'net', 'umbrellas', 'helpers', 'rating'];

  var all_chars = shuffle(basketball.concat(football, gymnastics, surfing, boxing, tennis));


  // start of looped 5 rounds
  // for
  var flag = true;

  //while (true) {
  //while(round <= 5 && flag == true)
  //{
    flag = false;

    //bot.sendMessage(msg.chat.id, ' \n \nLet us start round ' + round + ' out of 5! I have selected a game. Make a guess, i.e., \/ask something');
    bot.sendMessage(chatId, ' \n \nLet us start round ' + round + '! I have selected a game. Make a guess, i.e., \/ask something');
   
    // select a random sport from the list of sports
    var rand_selected_sport = sports[Math.floor(Math.random() * sports.length)];
    // delete the chosen sport from the list so that next time no repeats occur
    const index = sports.indexOf(rand_selected_sport);
    if (index > -1) {
      sports.splice(index, 1);
    }
    console.log(sports);
    console.log(sports);

    switch(rand_selected_sport) {
      case 'basketball':
        sport_chars = basketball;
        break;
      case 'football':
        sport_chars = football;
        break;
      case 'gymnastics':
        sport_chars = gymnastics;
        break;
      case 'surfing':
        sport_chars = surfing;
        break;
      case 'boxing':
        sport_chars = boxing;
        break;
      case 'tennis':
        sport_chars = tennis;
        break;
      default:
      console.log("Sport not found.");
    }
    round++;
  //}
//}

    bot.on('message', (msg) => {
      if (msg.text.toString().toLowerCase().includes("show all options")) {
        bot.sendMessage(msg.chat.id, shuffle(all_chars).toString());
      }
    });


    bot.on('message', (msg) => {
      if (msg.text.toString().toLowerCase().includes(rand_selected_sport)) {
        bot.sendMessage(msg.chat.id, "You are correct! I thought of " + rand_selected_sport + "!");
        flag = true;
      }
      else if (sports.includes(msg.text.toString().toLowerCase()) && rand_selected_sport != msg.text.toString().toLowerCase()) {
        bot.sendMessage(msg.chat.id, "Sorry, " + msg.text.toString().toLowerCase() + " is not the sport I guessed. I selected " + rand_selected_sport + ".");
        flag = true;
      }
  });
  //}


}



/**
 * Fisher-Yates Shuffle
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}