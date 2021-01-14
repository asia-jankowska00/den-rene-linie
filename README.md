# Den Rene Linie
## MMD3 Exam Project @ [Multimedia Design, UCN](https://www.ucn.dk/english/programmes-and-courses/multimedia-design).

### How to run
1. run `npm install` in the root directory
2. `cd` into server
3. run `npm install` to install server dependencies
4. run `npm run develop`
5. In another terminal, `cd` into packages
6. `cd` into one of the client packages (business-client, employee, employer)
7. run `npm install` to install dependencies in that package
8. run `npm run serve` to start the client

OR

1. Install lerna globally `npm i lerna -g`
2. run `lerna boostrap` to install dependencies across all packages
3. Use `npm run start-bcl` to start the business-client
4. Use `npm run start-eme` to start the employee
5. Use `npm run start-emr` to start the employer
6. Use `npm run start-server` to start the server

Note: the clients will not work properly if the server is not running
Note2: Vue doesn't seem to like environment variables, so it might throw an error "'process' is not defined". Restart the Vue live server to fix this (multiple restarts might be needed).

### Technologies & Tools used
* Vue & Vuex
* Bulma & Buefy
* Strapi
* Dayjs
* Capacitor
* Axios

### Team
[Joanna Jankowska ](https://github.com/asia-jankowska00)  
[Nikolay Rusev](https://github.com/NikolayR21)  
[Atanas Mitev](https://github.com/vulkov-dev) 

