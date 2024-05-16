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

## ISSUES
- Dependency tokens are not set if a call to `registerDependencies` is made in the `startServices` method in the `index` file located in the root of the infrastructure folder. This is fixed by calling the `registerDependencies` method at the top of the server implementation file, `ExpressServer` in this case before other services are initialised and called.

## EXTRA NOTES
- `tsyringe` was not used to manage all dependencies within the project. It was used only to acheive the 0 interaction required from tge application layer to infrastructure layer.

## SET UP GUIDE
- Clone the repositry from github using `git clone https://github.com/Emekarr/niyo.git` and cd into the folder

- Use `nvm` to set your node version to `20.11.0` using the command`nvm use 20.11.0`.

- To install the recommended node version use `nvm install 20.11.0` then execute the command above again

- Install all dependencies using `yarn`

- Duplicate the `.env.example` folder, update its name to `.env` and replace the values there with whatever your choice is.

- Run the development server using `yarn run dev` and you should see this printed out on the console  
`{ level: 'info', msg: 'server running on PORT 1010', meta: [] }`
