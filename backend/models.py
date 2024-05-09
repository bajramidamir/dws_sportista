from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from enum import Enum as PydanticEnum

Base = declarative_base()

# Enum za nivo spremnosti
class FitnessLevel(str, PydanticEnum):
    amateur = 'amateur'
    professional = 'professional'

# Enum za uloge
class UserRole(str, PydanticEnum):
    user = 'user'
    admin = 'admin'
    manager = 'manager'

# Enum za sportske aktivnosti
class SportsActivity(str, PydanticEnum):
    football = 'football'
    basketball = 'basketball'
    tennis = 'tennis'
    volleyball = 'volleyball'

# SQLAlchemy model za korisnika
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    city = Column(String)
    fitness_level = Column(Enum(FitnessLevel))
    matches_played = Column(Integer, default=0)
    role = Column(Enum(UserRole))
    preferred_sport = Column(Enum(SportsActivity))

# Pydantic model za korisnika
class UserBase(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: str
    password: str
    city: str
    fitness_level: FitnessLevel
    matches_played: int
    role: UserRole
    preferred_sport: SportsActivity

# Pydantic model za podatke o korisniku koji se šalju putem API zahtjeva
class UserCreateRequest(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: str
    password: str
    city: str
    fitness_level: FitnessLevel
    role: UserRole = UserRole.user
    preferred_sport: SportsActivity

# Pydantic model za odgovor sa podacima korisnika
class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True
