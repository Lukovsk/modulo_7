from fastapi import FastAPI
from app.db import database, User, Dash

import json

from app.routes.dash import app as dash_router
from app.routes.user import app as user_router

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Júpiter FullMegaStack")

origins = ["*"]

app.add_middleware( 
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dash_router)
app.include_router(user_router)


@app.on_event("startup")
async def startup():
    if not database.is_connected:
        await database.connect()
    # create a dummy entry
    await User.objects.get_or_create(name="teste", email="test@test.com", password="teste")
    print(await User.objects.all())
    
    with open('app/dados.json', 'r') as json_file:
        data = json.load(json_file)

    for entry in data:
        await Dash.objects.get_or_create(
            Age=entry["Age"],
            Annual_Income=entry["Annual_Income"],
            Spending_Score=entry["Spending_Score"])
        
    print(await Dash.objects.all())


@app.on_event("shutdown")
async def shutdown():
    if database.is_connected:
        await database.disconnect()