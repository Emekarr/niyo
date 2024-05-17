# Documentation

Deployed URL - https://niyo.onrender.com  
Documentation - https://documenter.getpostman.com/view/25448990/2sA3JRaf7y

This project was build using Clean Architecture principles.  
Tools used are :-

- NodeJS
- ExpressJS
- MongoDB
- Bcrypt
- tsyringe

The `src` folder is divided into 3

- infrastructure
- application
- entities

## Infrastructure Layer

This layer holds the logic of external dependencies. Implementation of the mongoose wrapper, express server implementation, loggers and every other implementation that is not native to the project is located under this folder. The implementation is then injected into the application layer using `tsyringe` Dependency Injection, this is so that the project does not violent the Clean architecture principle. This layer can import code from the application layer and use but the application layer should NOT import from the infrastructure layer.

## Application Layer

This layer holds the business logic of the project. Logic that is unique to the application such as creating a task, deleting a task, login, etc exists here. The separation of external dependency implementation and business logic implementation in their respective layers is to help us acheive loose coupling perfectly. With our current implementation, mongodb wrapper can easily be swapped out for PostgreSQL or MySQL implementation and the application will work the exact same way. This is becasue code unique to mongodb is no where in the application layer. This layer should NOT import from the infrastructure layer but its implementations can be imported in the infrastructure layer.

## Entities Layer

This layer holds type implementations that will be used accross both layers.

## PLEASE NOTE

- Use node `20.11.0 >` to avoid any issues
- If you are experiencing database connection issues upgrade your NodeJS version to `Node 20.11.0`
- The deployed server is on a free tier and will most likely be asleep if you try to interact with it now. Please hit the ping endpoint and wait for a response before you proceed with testing.
- Postman does not allow sharing of folders containing `Socket.io` requests so it is absent on the documentation link provided.

## CREATING A SOCKET CONNECTION
To create a Socket.io connection to the server and stream data that is created and updated you will need to make use of Postman or any other tool that can create and maintain the connection.
To initiate a handshake with the server you will need to make a call to `{{api}}/socket/connect`.  
`/socket/connect` is the namespace created on the server and only requests to that "route" will be accepted and authenticated.  
The following headers are required before a Socket.io connection is created :-
- Authorization
- x-device-id
- x-app-version  
- User-Agent 

If any of these required headers are missing or the data is inconsistent the handshake will fail. All header values used to communicate with the REST API are valid when trying to initate a handshake with the server.

## SOCKET EVENTS 
- CREATED_USER - This event is emitted after a user is created
- LOGIN_USER - This event is emitted after a user logs in
- CREATE_TASK - This event is emitted after a task is created
- DELETE_TASK - This event is emitted after a task is deleted
- UPDATE_TASK - This event is emitted after a task is updated

## SOCKET IMPLEMENTATION
The application layer emits data on the `SocketDotIO` implementation using the built in NodeJS package `node:events`. This package handles emiting and registering of events on NodeJS. This is used to allow communication between the application layer and the Socket connection and this is because the preferred way of communicating with implementations in the infrastructure layer from the application layer is through the user of a dependency injection (tsyringe) but this only creates one instance of that class and that will be accessible from the application layer only, but the Socket.io instance needs to be initialised using the `http.Server` created from opening a server port. Because of this a socket instance needed to be created in the infrastructure layer and the only way to ensure the application layer communicates with it without breaking the Clean Architecture principles was to emit the events from the application layer and react to these events from the infrastructure layer.

## ISSUES

- Dependency tokens are not set if a call to `registerDependencies` is made in the `startServices` method in the `index` file located in the root of the infrastructure folder. This is fixed by calling the `registerDependencies` method at the top of the server implementation file, `ExpressServer` in this case before other services are initialised and called.

## EXTRA NOTES

- `tsyringe` was not used to manage all dependencies within the project. It was used only to acheive the 0 interaction required from the application layer to infrastructure layer.
- `ULID` wa substituted for `UUID` because of its non-monotonically increasing nature. This means `UUID`\`s created just miliseconds apart will not always be sorted by the time they were created but this is a chracteristics with want from the ID because it is cruicial for us to paginate correctly and quickly. `ULID` solves this for us and works perfectly.

## SET UP GUIDE

- Clone the repositry from github using `git clone https://github.com/Emekarr/niyo.git` and cd into the folder

- Use `nvm` to set your node version to `20.11.0` using the command`nvm use 20.11.0`.

- To install the recommended node version use `nvm install 20.11.0` then execute the command above again

- Install all dependencies using `yarn`

- Duplicate the `.env.example` folder, update its name to `.env` and replace the values there with whatever your choice is.

- Run the development server using `yarn run dev` and you should see this printed out on the console  
  `{ level: 'info', msg: 'server running on PORT 1010', meta: [] }`
