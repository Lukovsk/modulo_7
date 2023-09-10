import pandas as pd
from pycaret.regression import load_model, predict_model
from fastapi import FastAPI
from pydantic import BaseModel

# Create the app
app = FastAPI()

# Load trained Pipeline
model = load_model("model_api")


# Create input/output pydantic models
class inputModel(BaseModel):
    Age: float
    Annual_Income: float


class outputModel(BaseModel):
    prediction: float


# Define predict function
@app.post("/predict", response_model=outputModel)
def predict(data: inputModel):
    data = pd.DataFrame([data.dict()])
    predictions = predict_model(model, data=data)
    return {"prediction": predictions["prediction_label"].iloc[0]}