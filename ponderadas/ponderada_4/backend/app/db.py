import databases
import ormar
import sqlalchemy

# from .config import settings

# database = databases.Database(settings.db_url)
database = databases.Database("sqlite:///costumers.db")
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

class Dash(ormar.Model):
    class Meta(BaseMeta):
        tablename = "dash"
        
    id: int = ormar.Integer(primary_key=True)
    age: int = ormar.Float()
    Annual_Income: float = ormar.Float()
    Spending_Score: float = ormar.Float()

engine = sqlalchemy.create_engine("sqlite:///costumers.db")
# engine = sqlalchemy.create_engine(settings.db_url)
metadata.drop_all(engine)
metadata.create_all(engine)
