from fastapi import FastAPI
from app.db import database, User, Task

from app.routes.task import app as task_router
from app.routes.user import app as user_router

app = FastAPI(title="FastAPI, Docker and Jupiter")

app.include_router(task_router)
app.include_router(user_router)


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