# Guess My Game Bot

A simple Telegram bot written in Node.js that allows users to play five rounds of a game where the bot thinks of an Olympic sport and the user has to guess it in 10 questions. 

## Getting Started

Head over to https://web.telegram.org/, search for @game_guesser_bot, then type /start and follow the on-screen instructions to play the game.

### Prerequisites and Installing to build your own bot

You need to have Node.js installed, first. The most current version can be found here: https://nodejs.org/en/download/.
You will also need to install node-telegram-bot-api using npm.

Next, create a free account at heroku.com where the server for the bot will be hosted.
You will then need to create a new bot by searching for @botfather on Telegram and follow the on-screen instructions.

Once the bot is set up and you have used my approach outlined in bot.js, you will want your bot to be available 24/7.
Heroku servers go to sleep (idle) after 30 minutes of inactivity. To keep the server running, I used New Relic to ping it every few minutes.
The best description of how it works and how to install it can be found here: https://stackoverflow.com/questions/5480337/easy-way-to-prevent-heroku-idling.

If you have followed these steps, your bot is set to go!

## Deployment

To link your git to heroku follow the steps from https://devcenter.heroku.com/articles/git#creating-a-heroku-remote
For a new app simply add your heroku app name instead of the one below.
```
$ heroku git:remote -a thawing-inlet-61413
set git remote heroku to https://git.heroku.com/thawing-inlet-61413.git

```
## Built With

* [Node.js](https://nodejs.org/en/about/) - The web framework used
* [Heroku](https://www.heroku.com/) - Cloud application platform
* [Telegram API](https://github.com/yagop/node-telegram-bot-api) - Used to interact with Telegram and the user
* [New Relic](https://elements.heroku.com/addons/newrelic) - Add-on to keep the heroku server running with no idling

## Authors

* **Denys Dziubii** - *Initial work* - [themennice](https://github.com/themennice)

See also the list of [contributors](https://github.com/themennice/game-guesser-telegram-bot/contributors) who participated in this project.
