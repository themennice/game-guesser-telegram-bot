var token = '1044989057:AAGkvVCLjiY3JsJOBjENwm_5tTHy_BBuhxg';

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

// declare variables for five rounds and 10 questions for each round
let round = 1;
let question_num = 0;
var sport_chars;
var sports;
var all_chars;
var rand_selected_sport;
var flag = true;

console.log('*********** bot server started *************');

// start command for the guess game
bot.onText(/^\/wakeup (.+)$/, function (msg, match) {

  // reset counter variables for subsequent games
  round = 1;
  question_num = 0;
  // reset the spliced sports array from below
  sports = ['basketball', 'football', 'gymnastics', 'surfing', 'boxing', 'tennis'];

  // Store user's name
  var name = match[1];
  // Send a welcome message and capitalize the first word of the name only
  bot.sendMessage(msg.chat.id, '\tWelcome to Game Guesser Bot, ' + name.charAt(0).toUpperCase() + name.substring(1).toLowerCase() +'! \nI will think of an Olympic game and you will try to guess it.\n\nSimply type a characteristic as \/ask something\. I will say yes if it belongs to my guessed sport, and no otherwise.\n\nAfter 10 questions simply type the name of the game you think I guessed!').then(function () {
  // Offer the possibility of choosing options
  bot.sendMessage(msg.chat.id, 'You could also type \[show all options\] (without brackets) to see all available sport characteristics.');
  // Start playing the game while also passing the chat id
  play(msg.chat.id);
  });
});


bot.onText(/\/play/, (msg, match) => {
  play(msg.chat.id);
});

// helper function for asking
bot.onText(/^\/ask (.+)$/, function (msg, match) {

  var sport = match[1];
  
  if(sport_chars.includes(sport.toString().toLowerCase())) {
    bot.sendMessage(msg.chat.id, "Yes").then(function () {
      question_num++;
      if(question_num >= 3) {
        bot.sendMessage(msg.chat.id, "Guess the sport by typing it below");
      }
    });
  }

  else {
      bot.sendMessage(msg.chat.id, "No").then(function () {
      question_num++;
      if(question_num >= 3) {
        bot.sendMessage(msg.chat.id, "Guess the sport by typing it below");
      }
    });
  };

});

function play(chatId){

  // intiate and populate Olympic sports lists - basketball
  var basketball = ['court', 'basket', 'team', 'ball', 'timed'];
  var football = ['goal', 'goalkeeper', 'team', 'doubles', 'grass', 'football', 'field', 'stadium', 'halves'];
  var gymnastics = ['gym', 'flexibility', 'score', 'jumping'];
  var surfing = ['surfboard', 'outside', 'water', 'waves', 'singles', 'score'];
  var boxing = ['knockout', 'timed', 'singles', 'punches', 'money', 'concussions', 'danger'];
  var tennis = ['court', 'singles', 'doubles', 'outdoor', 'ball', 'racket', 'net', 'umbrellas', 'helpers', 'rating'];

  all_chars = shuffle(basketball.concat(football, gymnastics, surfing, boxing, tennis));

  if(round <= 5)
  { bot.sendMessage(chatId, ' \n \nLet us start round ' + round + '! I have selected a sport. Make a guess, i.e., \/ask something');
    flag = true;
   
    // select a random sport from the list of sports
    rand_selected_sport = sports[Math.floor(Math.random() * sports.length)];
    // delete the chosen sport from the list so that next time no repeats occur
    const index = sports.indexOf(rand_selected_sport);
    if (index > -1)
      sports.splice(index, 1);

    // assign appropriate arrays of sport characters given by the randomly selected sport
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
    // increment the round for further interations and continuity
    round++;

    // check
    bot.on('message', (msg) => {

      if (rand_selected_sport == msg.text.toString().toLowerCase() && flag && round <= 6) {
        flag = false;
        bot.sendMessage(msg.chat.id, "You are correct! I thought of " + rand_selected_sport + "!").then(function () { finalMessage(msg.chat.id); });
      }
      else if (sports.includes(msg.text.toString().toLowerCase()) && rand_selected_sport != msg.text.toString().toLowerCase() && flag && round <= 6) {
        flag = false;
        bot.sendMessage(msg.chat.id, "Sorry, " + msg.text.toString().toLowerCase() + " is not the sport I guessed. I selected " + rand_selected_sport + ".").then(function () {
        finalMessage(msg.chat.id); });
      }
  });
}
}


// implement "show all options" function within the play function so that it can only be called after the game has started
bot.on('message', (msg) => {
  if (msg.text.toString().toLowerCase().includes("show all options") && round <= 5) {
    bot.sendMessage(msg.chat.id, shuffle(all_chars).toString());
  }
});


function finalMessage(chatId) {
  if(round > 5){ bot.sendMessage(chatId, "\n\nThis is the end of round 5. The game is over. Please type in \'/wakeup Your_Name\' if you would like to restart the game.\n\nYou could also look at this project on github instead:\nhttps://github.com/themennice/game-guesser-telegram-bot");}
  else { bot.sendMessage(chatId, "If you would like to play again in round " + round +  ", simply type /play"); }
  question_num = 0;
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