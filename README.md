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

Build
===
To build for production
```
npm run build
node ./server
```
