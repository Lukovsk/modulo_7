import databases
import ormar
import sqlalchemy

from .config import settings

database = databases.Database(settings.db_url)
# database = databases.Database("sqlite:///games.db")
metadata = sqlalchemy.MetaData()


class BaseMeta(ormar.ModelMeta):
    metadata = metadata
    database = database


class User(ormar.Model):
    class Meta(BaseMeta):
        tablename = "users"

    id: int = ormar.Integer(primary_key=True)
    name: str = ormar.String(max_length=128, unique=True, nullable=False)
    email: str = ormar.String(max_length=128, unique=True, nullable=False)
    password: str = ormar.String(max_length=16, nullable=False)

class Task(ormar.Model):
    class Meta(BaseMeta):
        tablename = "tasks"
        
    id: int = ormar.Integer(primary_key=True)
    title: str = ormar.String(max_length=128, nullable=False)
    content: str = ormar.String(max_length=1024, nullable=False)
    user_id: int = ormar.Integer()

# engine = sqlalchemy.create_engine("sqlite:///games.db")
engine = sqlalchemy.create_engine(settings.db_url)
# metadata.drop_all(engine)
metadata.create_all(engine)
