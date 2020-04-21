% Name: Denys Dziubii
% Student ID: N1904375C

% change the write flag to display all the output options
% when invoking all_options relation below
:- set_prolog_flag(answer_write_options,[max_depth(0)]).

% declare a predicate dynamically to be able to update it later on
:- dynamic(guessed_game/1).

% declare a list of the Olympic sports for a given demonstration
sports([basketball, football, gymnastics, surfing, boxing, tennis]).

% intiate and populate Olympic sports lists - basketball
basketball([court, basket, team, basketball, timed]).
football([goal, goalkeeper, team, doubles, grass, football, field, stadium, halves]).
gymnastics([gym, flexibility, score, jumping]).
surfing([surfboard, outside, water, waves, singles, score]).
boxing([knockout, timed, punches, money, concussions, danger]).
tennis([court, singles, doubles, outdoor, ball, racket, net, umbrellas, helpers, rating]).


% guess the game without telling the user
guessed_game(basketball).
%guessed_game(X) :- random_member(X, [basketball, gymnastics, surfing, boxing]).


% invoking this relation will print all the sports characteristics in the system with no brackets between them
% the list initally was a list of lists with had brackets, so built-in flatten was used to produce human-readable output
all_options(X) :- findall(X, basketball(X); gymnastics(X); surfing(X); boxing(X); tennis(X),  Sports), flatten(Sports, X).


% the command ?- start. is used to launch the game
% the first argument in game() is a counter for the 10 questions and the second one is a counter for 5 rounds of the game
% both counters are incremented recursively at later stages
start() :- game(0, 1).


% start the game; the condition K > 5 checks if you played more than 5 games
% if so, it prints a final message with additional styling and terminates the game
% nl stands for newline and is used interchably/combined with write/writeln/
game(N, K) :- ((K > 5 -> nl, writeln('Done Game'), false); % false allows to teminate the program quickly
% a welcome message whenever N = 0, meaning it is the first step of the new round

% hence a welcome message with instructions
    (N = 0, write('\t\tWelcome to Game Guesser Bot Round '), write(K), writeln('!'), nl,
    % write(K) indicates the round of the game played
    writeln('I will think of an Olympic game and you will try to guess it.'),
    writeln('Simply type a characteristic of the sport and I will say yes if it belongs to my guessed sport, and no otherwise.'), nl,
    writeln('After 10 questions simply type the name of the game you think I guessed!'), nl,
    writeln('\tLet us get started!'), nl,
    write('I have selected a game.'),
    % let the user know how many questions they have left by writing B which is dependent on N, number of steps into the round
    % recursion with M and N as well as J and K is used to increment counters and keep track of the flow of program
    writeln(' Are you ready? You can ask me '), B is 10 - N, write(B), writeln(' questions.'), M is N+1, J is K,
    % after giving the prompt, user can enter their sport characteristic, which will be run through has() before incrementing
    read(Question), has(Question), playmore(M, J))).

% added user interface for readability and ease of use by personalizing the last question
% playmore and has are the two most extensively used rules and queries in this program
% due to their central value of checking user input and responding with appropriate output
playmore(N, K) :- (
   
    % last question when N = 9, recursion and reading as described above
    (N = 9 -> write('You can ask me '), B is 10 - N, write(B), writeln(' last question.'),
        M is N+1, J is K, read(Question), has(Question), playmore(M, J));
   
    % default message for questions 1 to 8
    (N < 9 -> write('You can ask me '), B is 10 - N, write(B), writeln(' more questions.'),
        M is N+1, J is K, read(Question), has(Question), playmore(M, J));
    
    % If counter is more than 10, write ‘Guess the game’ and run the answer through is(Guess) to see if correct
    % Increment K to the next round and set N to zero by subtracting itself from itself, play the game() from start
    (N >= 10 -> writeln('Guess the game'), read(Guess), is(Guess), J is K+1, M is N-N, game(M, J))).


% the first premise checks if the X in question is part of the sport characteristics list L, if so then write Yes
has(X) :- ((member(X, [court, basket, team, basketball, timed]) -> writeln('Yes'));
    
    % second, check if the characteristic is a valid option but not in L, then print No
    % it is implemented using member function which checks the value of X against every value in the given list
    % and identifies whether it is present there or not. it used to give an appropriate response to the user as output
    (member(X, [goal, goalkeeper, team, doubles, grass, football, field, stadium,
        halves, gym, flexibility, score, jumping, surfboard, outside, water, waves,
        singles, score, knockout, timed, punches, money, concussions, danger, court,
        singles, doubles, outdoor, ball, racket, net, umbrellas, helpers, rating]) -> writeln('No'));
    
    % otherwise, assume a mistyped option and write Invalid Option
    % I chose to increment the counter of asked questions because this way an never-ending sequence of
    % queries can be eliminated and it makes sense to give a limitation to the user to the game stable
    (writeln('Invalid option'))).

% finally, after the 10 questions have been answered, check user‘s guess of what computer‘s selected game was
% the first premise, if true, uses implication to write a successfull guess
% the second premise takes care of the otherwise scenario and writes unsuccessfull guess
is(X) :- (guessed_game(X) -> writeln('successfull guess');
    writeln('unsuccessfull guess')).





