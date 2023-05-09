# Technical-Take-Home Assigment

A repo containing the client side of the project.

### Drew Bozarth

### dbozarth@chapman.edu

## Source Files:

### App.css

### App.js

### Chat.js

### index.js

### reportWebVitals

### Users.js

## Known Errors:

### The online user list will not appear when a user first joins a chat room. Once another user leaves or joins that room, then the list for the original user will update.

## References:

### PedroTech - https://www.youtube.com/watch?v=NU-HfZY3ATQ - video on Socket.io tutorials with ReactJS and NodeJS.

### Web Dev Journey - https://github.com/webdevjourneyWDJ/Chat-App - used Users.js class to implement showing online users

### Web Dev Journey - https://www.youtube.com/watch?v=f0jht1G1_ro&t=625s - video on displaying online users in a chat room

## Instructions:

### I began by setting up a react app in the client folder:

```
npx create-react-app
```

### I removed most of the boiler plate code included in the react app that was formed

### Then I installed dependencies for the client side:

```
npm install socket.io-client
npm install react-scroll-to-bottom
```

### Then, once the server is running, run the react app in the client folder with:

```
npm start
```

### This will open up a browser tab to http://localhost:3000 where the react app will be running
