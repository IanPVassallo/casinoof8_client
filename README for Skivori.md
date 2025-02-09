# casinoof8

### Content List

1. [Specs](#specs)
2. [Web app](#web-app)
3. [Server](#server)
4. [GitHub](#github)
5. [Instructions](#instructions)
6. [AI Assistance](#ai-assistance)

## Specs

| <ins>Infrastructure</ins> | Google Cloud Platform |
| <ins>Database</ins> | Postgresql |
| <ins>Web app</ins> | ReactJs, Bootstrap |
| <ins>Server</ins> | Node.js |
| <ins>Third parties</ins> | images.ctfassets.net; api.exchangerate-api |

## Web app
URL: https://casinoof8client-483704167851.europe-west3.run.app 

Login player options:
* "players" {"username", "pin"} values {"funPlayer", "000007"}
* "players" {"username", "pin"} values {"riskPlayer", "999987"}
* "players" {"username", "pin"} values {"chillPlayer", "123456"}
* "players" {"username", "pin"} values {"pinkPlayer", "101010"}

## Server
URL: https://casinoof8server-483704167851.europe-west3.run.app

## GitHub

Web app source code url: https://github.com/IanPVassallo/casinoof8_client.git

Server source code url: https://github.com/IanPVassallo/casinoof8_server.git

## Instructions

2 General Requirements

- The main authentication used on the web app is the onLogin() function which validates the request body via the REST api '/login' with username and pin. Refer to web app source code file 'Login.js'.
- The app is built with mobile-first approach. If links are accessed via desktop make sure to set the appropriate Responsive Design Mode.

2.1.1. Question 1

https://casinoof8client-483704167851.europe-west3.run.app/dashboard

Refer to Github for source code.

2.1.2. Question 2

https://casinoof8client-483704167851.europe-west3.run.app/dashboard

Refer to Github for source code.

2.1.3. Question 3

https://casinoof8client-483704167851.europe-west3.run.app/FruitParty

I created the slot machine game with the given specs. The game has been linked to one of the json list of games with title 'Fruit Party'. Click 'Play Now' to access the above link.

Result endpoint: '/winnings'
Refer to web app source code file 'FruitParty.js'.
Refer to the server source code for route and controller. 

2.1.4. Question 4
To make the endpoints more robust I am making use of cors, which prevents the use of unauthorized urls.
Refer to server.js source code.

2.1.5. Question 5
To optimize the search endpoint I implemented the debounce method, which limits the number of API calls.
Refer to the web app source code file 'Dashboard.js'.

2.1.6. Question 6
Refer to the web app source code and game 'FruitParty.js' for the balance convert button.

2.1.7. Question 7
Refer to the server source code file '/db/buildref/schema.sql' for the required database schema.
Which schema was implemented on the Google SQL Cloud and integrated into the server.

## AI assistance

**GPT-4o (OpenAI)**
Assistance with ReactJs to enhance code quality

**Claude 3.5 Sonnet (Anthropic)**
Assistance with the web app frontend UI and Bootstrap
Assistance as code comment generator

**Gemini (Google)**
Assistance with GCP for app, server and db deployment
