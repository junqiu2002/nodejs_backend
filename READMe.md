### this is the backenv nodejs code
```
It calls onebus away webservice to get data

And it serves the data through its API
```

### note: there is a .env file


### steps to set up
```
 mkdir arcgis_react_nodjs_backend
 cd arcgis_react_nodjs_backend/
 ls
 npm init -y
 ls
 more package.json 
 vi package.json 
 npm install express axios cors dotenv
 vi package.json 
 npm install express axios cors dotenv
```


### to start
```
node server.js
or
NODE_ENV=production node --no-lazy server.js

clean up:  killall -9 node

check the backend with:
http://localhost:5000/api/transit/route545

sample data:
{
  "success": true,
  "data": [
    {
      "vehicleId": "40_9661",
      "location": {
        "lat": 47.6445999145508,
        "lon": -122.133781433105
      },
      "status": "in_progress",
      "tripId": "40_560087811",
      "direction": "0"
    },
    {
      "vehicleId": "40_9665",
      "location": {
        "lat": 47.6734657287598,
        "lon": -122.10033416748
      },
      "status": "in_progress",
      "tripId": "40_560089461",
      "direction": "1"
    },
    {
      "vehicleId": "40_9653",
      "location": {
        "lat": 47.6779823303223,
        "lon": -122.125549316406
      },
      "status": "in_progress",
      "tripId": "40_560090171",
      "direction": "0"
    },
    {
      "vehicleId": "40_9660",
      "location": {
        "lat": 47.6081008911133,
        "lon": -122.333213806152
      },
      "status": "in_progress",
      "tripId": "40_560090391",
      "direction": "1"
    },
    {
      "vehicleId": "40_9675",
      "location": {
        "lat": 47.6696166992188,
        "lon": -122.130081176758
      },
      "status": "in_progress",
      "tripId": "40_560087741",
      "direction": "1"
    },
    {
      "vehicleId": "40_9679",
      "location": {
        "lat": 47.6399154663086,
        "lon": -122.252830505371
      },
      "status": "in_progress",
      "tripId": "40_560090581",
      "direction": "1"
    },
    {
      "vehicleId": "40_9662",
      "location": {
        "lat": 47.6154670715332,
        "lon": -122.330680847168
      },
      "status": "in_progress",
      "tripId": "40_560088501",
      "direction": "0"
    }
  ]
}
```

## load into github
```
first create a repo in git hub

then, on command line:
git init

git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:junqiu2002/nodejs_backend.git
git push -u origin main

```
