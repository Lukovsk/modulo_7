import pandas as pd
# from pycaret.regression import load_model, predict_model
from pydantic import BaseModel
from fastapi import FastAPI
from app.db import database, User, Task

from app.routes.task import app as task_router
from app.routes.user import app as user_router

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="FastAPI, Docker and Jupiter")

origins = ["*"]

app.add_middleware( 
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# model = load_model("model_api")

class inputModel(BaseModel):
    Age: float
    Annual_Income: float


class outputModel(BaseModel):
    prediction: float

app.include_router(task_router)
app.include_router(user_router)

# @app.post("/predict", response_model=outputModel)
# def predict(data: inputModel):
#     data = pd.DataFrame([data.dict()])
#     predictions = predict_model(model, data=data)
#     return {"prediction": predictions["prediction_label"].iloc[0]}


@app.on_event("startup")
async def startup():
    if not database.is_connected:
        await database.connect()
    # create a dummy entry
    await User.objects.get_or_create(name="test man", email="test@test.com", password="test")
    print(await User.objects.all())
    await Task.objects.get_or_create(title="Test Title", content="Test content", user_id=1)
    print(await Task.objects.all())


@app.on_event("shutdown")
async def shutdown():
    if database.is_connected:
        await database.disconnect()