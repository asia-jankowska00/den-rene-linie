# Den Rene Linie
## MMD3 Exam Project @ [Multimedia Design, UCN](https://www.ucn.dk/english/programmes-and-courses/multimedia-design).

### How to run
1. `cd` into packages
2. `cd` into one of the client packages (business-client, employee, employer)
3. run `npm install` to install dependencies in that package
4. run `npm run serve` to start the client
5. In another terminal, `cd` into packages
6. `cd` into server
7. run `npm install` to install server dependencies
7. run `npm run develop`

OR

1. Install lerna globally `npm i lerna -g`
2. run `lerna boostrap` to install dependencies across all packages
3. Use `npm run start-bcl` to start the business-client
4. Use `npm run start-eme` to start the employee
5. Use `npm run start-emr` to start the employer
6. Use `npm run start-server` to start the server

Note: the clients will not work properly if the server is not running

### Technologies
* Vue & Vuex
* Bulma & Buefy
* Strapi

### Team
[Joanna Jankowska ](https://github.com/asia-jankowska00)  
[Nikolay Rusev](https://github.com/NikolayR21)  
[Atanas Mitev](https://github.com/vulkov-dev) 

