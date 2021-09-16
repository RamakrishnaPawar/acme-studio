# acme-studio
acme-studio is a simple api for cost explorers
## Before
* application uses postgresql database and make sure database is present with data.
* add database config in db.ts and BaseRepository.spec.ts
## Build
use the below command to build the application
```
npm install && tsc
```
## Test
create schema for repository test.
use the below command to run the tests
```
npm run test
```
## Run
use the below command to run the application
```
npm run start
```
### Note
* Application is not fully functional
* Only these end points are function "/explorer" "/explorer?client_id=1&client_id=2"
