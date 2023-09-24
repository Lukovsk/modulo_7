from pydantic import BaseModel, Field, EmailStr

class outputModel(BaseModel):
    age: float
    Annual_Income: float
    Spending_Score: float

class DashSchema(BaseModel):
    id : int = Field(default=None, gt=0)
    age: float = Field(default=None)
    Annual_Income: float = Field(default=None)
    Spending_Score: float = Field(default=None)
    # Configuração criada para documentação do modelo
    class Config:
        schema_extra = {
            "post_teste" : {
                "age": 0.33,
                "Annual_Income": 0.3123,
                "Spending_Score": 0.390
            }
        }
class inputModel(BaseModel):
    age: float = Field(default=None)
    Annual_Income: float = Field(default=None)
    # Configuração criada para documentação do modelo
    class Config:
        schema_extra = {
            "post_teste" : {
                "age": 0.33,
                "Annual_Income": 0.3123,
            }
        }

# Classe para representar os usuários do sistema
class UserSchema(BaseModel):
    id : int = Field(default=None, gt=0)
    name : str = Field(default=None)
    email : EmailStr = Field(default=None)
    password : str = Field(default=None)
    class Config:
        schema_extra = {
            "schema_user" : {
                "name": "Teste",
                "email": "teste@mail.com",
                "password":"123"
            }
        }
# Classe para o login dos usuários
class LoginUserSchema(BaseModel):
    email : EmailStr = Field(default=None)
    password : str = Field(default=None)
    class Config:
        schema_extra = {
            "user_teste" : {
                "email": "teste@mail.com",
                "password":"123"
            }
        }