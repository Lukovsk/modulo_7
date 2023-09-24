from fastapi import APIRouter, Depends, Body
from app.models import DashSchema, inputModel, outputModel
from app.auth.jwt_bearer import jwtBearer
from app.db import database, Dash
import pandas as pd
from pycaret.regression import load_model, predict_model

app = APIRouter(prefix='/dash', tags=["dash"])

model = load_model("model_api")

@app.post("/predict", response_model=outputModel)
def predict(data: inputModel):
    data = pd.DataFrame([data.dict()])
    predictions = predict_model(model, data=data)
    return {"prediction": predictions["prediction_label"].iloc[0]}


# return all dashs
@app.get("/")
async def read_dashs():
    if not database.is_connected:
        await database.connect()
        
    return await Dash.objects.all()

# retur dash by id
@app.get("/{id}")
async def get_dash_by_id(id: int):
    if not database.is_connected:
        await database.connect()
        
    return await Dash.objects.get(id=id)

# create a data
@app.post("/", dependencies=[Depends(jwtBearer())])
async def create_dash(dash: inputModel = Body(default=None)):
    if not database.is_connected:
        await database.connect()
        
    predicted_score = predict(dash)
    
    print()
        
    await Dash.objects.create(age=dash.age,
                              Annual_Income=dash.Annual_Income,
                              Spending_Score=predicted_score)
    return {"success": "Successfully created"}

@app.put("/", dependencies=[Depends(jwtBearer())])
async def update_dash(new_costumer: DashSchema):
    if not database.is_connected:
        await database.connect()
            
    return await Dash.objects.update_or_create(id=new_costumer.id,
                                     age=new_costumer.age,
                                     Annual_Income=new_costumer.Annual_Income,
                                     Spending_Score=new_costumer.Spending_Score)
    
@app.delete("/{id}", dependencies=[Depends(jwtBearer())])
async def delete_dash(id: int):
    if not database.is_connected:
        await database.connect()
        
    return await Dash.objects.delete(id=id)