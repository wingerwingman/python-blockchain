# Python blockchain project

## Activate the virtual environment 

### source blockchain-env/bin/activate 

### pip3 install -r requirements.txt

## Run the tests

### Make sure to activate the virtual environment 

### python3 -m pytest backen/tests 

## Run the application and API 

### Make sure to activate the virtual environment 

### python3 -m backend.app

## Run a peer instance 

### export PEER=True && python3 -m backend.app

### Run the frontend 

## cd into frontend folder and run npm run start

## Seed The backend with data 

### export SEED_DATA=True && python3 -m backend.app