Projets Portes ouvertes
===

L'interface devra permettre à l'utilisateur de séléctionner simplement un jeu auquel il veut jour, ou de créer une session vide avec un certain temps limites.

[GAME]       ->     [SESSIONS]                  ->             [USERS]
id                    id                                        id
game_content          time_limit                                nom
                      current_time                              prenom
                      status (STARTED,etc...)

We should defnitly use a database, but for now, we just keep our data in json files, and in memory....

Installation
===
Install the project

```
npm install
npm install -g gulp
```

Usage
===

To start the project server
```
npm run start
```
Then
```
gulp watch
```
To build all assets

You will be able to connect to the server at ```localhost:8000```

Structure
===
*eval.py* used to evaluate script data from a game
*server.js* used in production only
*index-prod.html* __needs an update__ but may be used for production
*server.js* shorthand to integrate app/index.js. Used in production only
*app/* contains all server files
*app/index.js* server runnable file
*js/* contains all script assets
*sass/* contains all sass files
*css/* contains all css. Sass compiles files into this directory

Build
===
To build for production
```
npm run build
node ./server
```
