from fastapi import APIRouter, Depends
from app.models import TaskSchema
from app.auth.jwt_bearer import jwtBearer
from app.db import database, User, Task


app = APIRouter(prefix='/task', tags=["task"])

# return all tasks
@app.get("/")
async def read_tasks():
    if not database.is_connected:
        await database.connect()
        
    return await Task.objects.all()

# retur task by id
@app.get("/id:{id}", tags=["task"])
async def get_task_by_id(id: int):
    if not database.is_connected:
        await database.connect()
        
    return await Task.objects.get(id=id)

# return all tasks by a user id
@app.get("/user_id:{user_id}", tags=["task"])
async def get_task_by_id(user_id: int):
    if not database.is_connected:
        await database.connect()
        
    return await Task.objects.all(user_id=user_id)


# return all tasks by a user name
@app.get("/user_name:{name}", tags=["task"])
async def get_task_by_user_name(name: str):
    if not database.is_connected:
        await database.connect()
        
    user_id = (await User.objects.get(name=name)).id
    return await Task.objects.all(user_id=user_id)

# create a task
@app.post("/create", dependencies=[Depends(jwtBearer())], tags=["task"])
async def create_task(task: TaskSchema):
    if not database.is_connected:
        await database.connect()
        
    await Task.objects.create(title=task.title,
                              content=task.content,
                              user_id=task.user_id)
    return {"data": task.dict()}

@app.put("/update", dependencies=[Depends(jwtBearer())])
async def update_task(new_task: TaskSchema):
    if not database.is_connected:
        await database.connect()
            
    return await Task.objects.update_or_create(id=new_task.id,
                                     title=new_task.title,
                                     content=new_task.content,
                                     user_id=new_task.user_id)
    
    