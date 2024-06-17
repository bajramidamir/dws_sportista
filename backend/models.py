from datetime import datetime
from sqlalchemy import Boolean, CheckConstraint, Column, DateTime, Integer, String, Enum, ForeignKey, Table, Text
from sqlalchemy.orm import relationship
from typing import List, Optional
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel, Field
from enum import Enum as PydanticEnum

Base = declarative_base()

# Define association table for many-to-many relationship between courts and managers
court_owner_association = Table('court_owner_association', Base.metadata,
    Column('court_id', ForeignKey('courts.id'), primary_key=True),
    Column('user_id', ForeignKey('users.id'), primary_key=True)
)

# Define association table for many-to-many relationship between courts and sports
court_sport_association = Table('court_sport_association', Base.metadata,
    Column('court_id', ForeignKey('courts.id'), primary_key=True),
    Column('sport_id', ForeignKey('sports.id'), primary_key=True)
)

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

# SQLAlchemy model for users
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    city = Column(String)
    fitness_level = Column(String)  # Adjust as needed
    matches_played = Column(Integer, default=0)
    role = Column(String)  # Adjust as needed
    preferred_sport = Column(String)  # Adjust as needed
    merit = Column(Integer, default=3)  
    profile_pic = Column(String, default = None)

    # Relationship with courts as owners
    courts_owned = relationship("Court", secondary=court_owner_association, back_populates="managers")

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
    merit: int
    profile_pic: str

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
    merit: int
    profile_pic: Optional[str] = None

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

# Pydantic model za odgovor sa podacima o korisniku
class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    city: str
    fitness_level: Optional[str]
    preferred_sport: Optional[str]
    matches_played: Optional[int]
    merit: int
    profile_pic: Optional[str] = None

    class Config:
        from_attributes = True

# Pydantic model za termin igrališta
class CourtAppointment2(BaseModel):
    id: int
    name: str
    location: str
    sport: str
    court_type: str
    start_time: datetime
    available_slots: int

# Model za dohvacanje podataka o korisnicima (za admin panel)
class UserResponse2(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    merit: int

    class Config:
        orm_mode = True  

#Pydantic model za odg sa podacima o menadzeru
class ManagerResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str

    class Config:
        from_attributes = True

# SQLAlchemy model za termine
class Appointment(Base):
    __tablename__ = 'appointments'
    id = Column(Integer, primary_key=True, index=True)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    court_id = Column(Integer, unique=True, index=True)
    sport_id = Column(Integer, ForeignKey('sports.id'), unique=True, index=True)
    available_slots = Column(Integer)
    cancelled = Column(Boolean)

    sport = relationship("Sport")

# Pydantic model za termine
class AppointmentBase(BaseModel):
    start_time: datetime
    end_time: datetime
    court_id: int
    sport_id: int
    available_slots: int
    cancelled: bool

#Pydantic model za dobijanje termina
class AppointmentResponse(BaseModel):
    id: int
    start_time: datetime
    end_time: datetime
    court_id: int
    sport: str
    available_slots: int
    cancelled: bool

    class Config:
        from_attributes = True

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

# Pydantic model for court owners
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

# SQLAlchemy model for courts
class Court(Base):
    __tablename__ = 'courts'
    id = Column(Integer, primary_key=True, index=True)
    court_type = Column(String)
    city = Column(String)
    name = Column(String)
    image_link = Column(String)

    # Relationship with managers
    managers = relationship("User", secondary=court_owner_association, back_populates="courts_owned")

    # Relationship with sports
    sports = relationship("Sport", secondary=court_sport_association, back_populates="courts")


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
        from_attributes = True

# Pydantic model da vrati teren i njegove sportove, koristi se u API pozivu
class CourtWithSports(CourtBase):
    id: int
    sports: List[str] 

    class Config:
        from_attributes = True

# Pydantic model za kreiranje rezervacije
class ReservationCreateRequest(BaseModel):
    appointment_id: int
    user_id: int
    number_of_players: int

# SQLAlchemy model for sports
class Sport(Base):
    __tablename__ = 'sports'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

    # Relationship with courts
    courts = relationship("Court", secondary=court_sport_association, back_populates="sports")

# Pydantic model for sports
class SportBase(BaseModel):
    name: str
# SQLAlchemy model za rezervacije
class Reservation(Base):
    __tablename__ = 'reservations'
    id = Column(Integer, primary_key=True, index=True)
    appointment_id = Column(Integer, unique=True, index=True)
    user_id = Column(Integer, index=True)
    number_of_players = Column(Integer)

# Pydantic model za rezervacije
class ReservationBase(BaseModel):
    id: int
    appointment_id: int
    user_id: int
    number_of_players: int

    class Config:
        from_attributes = True

# Pydantic model za termin igrališta
class CourtAppointment(BaseModel):
    id: int
    name: str
    location: str
    sport: str
    image_link: str
    court_type: str
    start_time: datetime


# Model za menadžer rezervacije
class ManagerApplicationResponse(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    request_date: datetime
    reason: str

    class Config:
        orm_mode = True

#model za meritupdate
class MeritUpdate(BaseModel):
    merit: int
