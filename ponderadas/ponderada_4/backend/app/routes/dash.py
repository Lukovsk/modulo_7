from fastapi import APIRouter, Depends, Body
from app.models import DashSchema, inputModel, outputModel
from app.auth.jwt_bearer import jwtBearer
from app.db import database, Dash
import httpx

app = APIRouter(prefix='/dash', tags=["dash"])


@app.post("/predict")
async def predict(data: inputModel):
    async with httpx.AsyncClient() as client:
        response = await client.post("http://localhost:8745/predict", json=data.dict())
    return response.json()


# return all dashs
@app.get("/")
async def read_dashs():
    if not database.is_connected:
        await database.connect()
        
    return await Dash.objects.all()

# return dash by id
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
        
    response = await predict(dash)
    
    predicted_score = response["prediction"]
            
    await Dash.objects.create(Age=dash.Age,
                              Annual_Income=dash.Annual_Income,
                              Spending_Score=predicted_score)
    return {"success": "Successfully created"}

@app.put("/", dependencies=[Depends(jwtBearer())])
async def update_dash(new_costumer: DashSchema):
    if not database.is_connected:
        await database.connect()
            
    return await Dash.objects.update_or_create(id=new_costumer.id,
                                     Age=new_costumer.Age,
                                     Annual_Income=new_costumer.Annual_Income,
                                     Spending_Score=new_costumer.Spending_Score)
    
@app.delete("/{id}", dependencies=[Depends(jwtBearer())])
async def delete_dash(id: int):
    if not database.is_connected:
        await database.connect()
        
    return await Dash.objects.delete(id=id)