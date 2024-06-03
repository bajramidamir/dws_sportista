from datetime import datetime
from sqlalchemy import Boolean, Column, DateTime, Integer, String, Enum, ForeignKey, Text
from sqlalchemy.orm import relationship
from typing import List, Optional
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel, Field
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

# Pydantic model za login putem API zahtjeva
class UserLoginRequest(BaseModel):
    username: str
    password: str

# SQLAlchemy model za menadzer zahtjev
class ManagerRequest(Base):
    __tablename__ = 'manager_requests'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    request_date = Column(DateTime, default=datetime.now)
    reason = Column(Text, nullable=False)
    status = Column(String(20), default='Pending')
    admin_notes = Column(Text, nullable=True)
    approval_date = Column(DateTime, nullable=True)

    user = relationship("User")

# Pydantic model za slanje prijave da se postane menadzer
class ManagerApplicationRequest(BaseModel):
    user_id: int
    request_date: datetime = Field(default_factory=datetime.now)
    reason: str
    status: Optional[str] = Field(default='Pending')
    admin_notes: Optional[str] = None
    approval_date: Optional[datetime] = None

    class Config:
        from_attributes = True



# Pydantic model za odgovor sa podacima korisnika
class UserResponse(UserBase):
    id: int
    class Config:
        from_attributes = True

# SQLAlchemy model za termine
class Appointment(Base):
    __tablename__ = 'appointments'
    id = Column(Integer, primary_key=True, index=True)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    court_id = Column(Integer, unique=True, index=True)
    sport_id = Column(Integer, unique=True, index=True)
    available_slots = Column(Integer)
    cancelled = Column(Boolean)

# Pydantic model za termine
class AppointmentBase(BaseModel):
    start_time: datetime
    end_time: datetime
    court_id: int
    sport_id: int
    available_slots: int
    cancelled: bool

# Pydantic model za kreiranje termina
class AppointmentCreateRequest(BaseModel):
    start_time: datetime
    end_time: datetime
    court_id: int
    sport_id: int
    available_slots: int

# SQLAlchemy model za vlasnike igralista
class CourtOwner(Base):
    __tablename__ = 'court_owner'
    id = Column(Integer, primary_key=True, index=True)
    court_id = Column(Integer, unique=True, index=True)
    user_id = Column(Integer, unique=True, index=True)

# Pydantic model za vlasnike igralista
class CourtOwnerBase(BaseModel):
    court_id: int
    user_id: int

# SQLAlchemy model za sport igralista
class CourtSport(Base):
    __tablename__ = 'court_sport'
    id = Column(Integer, primary_key=True, index=True)
    court_id = Column(Integer, unique=True, index=True)
    sport_id = Column(Integer, unique=True, index=True)

# Pydantic model za sport igralista
class CourtSportBase(BaseModel):
    court_id: int
    sport_id: int

# SQLAlchemy model za igralista
class Court(Base):
    __tablename__ = 'courts'
    id = Column(Integer, primary_key=True, index=True)
    court_type = Column(String)
    city = Column(String)
    name = Column(String)
    image_link = Column(String)

# Pydantic model za igralista
class CourtBase(BaseModel):
    court_type: str
    city: str
    name: str
    image_link: str

# Pydantic model za unos novog terena
class CourtCreateRequest(BaseModel):
    court_type: str
    city: str
    name: str
    image_link: str

    class Config:
        orm_mode = True

# Pydantic model da vrati teren i njegove sportove, koristi se u API pozivu
class CourtWithSports(CourtBase):
    id: int
    sports: List[str]  # Change from List[int] to List[str]

    class Config:
        from_attributes = True


# SQLAlchemy model za rezervacije
class Reservation(Base):
    __tablename__ = 'reservations'
    id = Column(Integer, primary_key=True, index=True)
    appointment_id = Column(Integer, unique=True, index=True)
    user_id = Column(Integer, unique=True, index=True)
    number_of_players = Column(Integer)

# Pydantic model za rezervacije
class ReservationBase(BaseModel):
    appointment_id: int
    user_id: int
    number_of_players: int

# SQLAlchemy model za sportove
class Sport(Base):
    __tablename__ = 'sports'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

# Pydantic model za rezervacije
class SportBase(BaseModel):
    name: str