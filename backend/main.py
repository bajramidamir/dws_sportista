from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
import os
import jwt
from jwt import PyJWTError
from typing import Optional, List
from sqlalchemy import desc, asc
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

# dotenv stvari
from dotenv import load_dotenv
load_dotenv()
JWT_SECRET = os.environ.get("JWT_SECRET")


from jwt_utils import authenticate_user, create_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

# Dodajemo CORS middleware za omogućavanje cross-origin requests
origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Konfiguracija za enkripciju lozinke
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Funkcija za dohvat sesije baze podataka
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Ruta za login
@app.post("/users/login")
async def login_for_access_token(user: models.UserLoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, user.username, user.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = create_access_token({"sub": user.username, "role": user.role, "matches_played": user.matches_played, "id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}


# Ruta za kreiranje novog korisnika
@app.post("/users/create")
async def create_user(user: models.UserCreateRequest, db: Session = Depends(get_db)):
    # Hashiranje lozinke prije čuvanja u bazi podataka
    hashed_password = pwd_context.hash(user.password)
    
    # Zamjena originalne lozinke sa hashiranom verzijom
    user_data = user.model_dump()
    user_data["password"] = hashed_password
    
    # Kreiranje novog korisnika sa hashiranom lozinkom
    db_user = models.User(**user_data)
    
    # Čuvanje korisnika u bazi podataka
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

# main.py route
@app.post("/users/manager-application", response_model=models.ManagerApplicationRequest, status_code=status.HTTP_201_CREATED)
async def create_manager_request(request: models.ManagerApplicationRequest, db: Session = Depends(get_db)):
    # Ensure the user exists
    user = db.query(models.User).filter(models.User.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Create a new manager request entry
    db_request = models.ManagerRequest(
        user_id=request.user_id,
        request_date=request.request_date,
        reason=request.reason,
        status=request.status,
        admin_notes=request.admin_notes,
        approval_date=request.approval_date
    )

    db.add(db_request)
    db.commit()
    db.refresh(db_request)

    return db_request


# Funkcija za vracanje trenutnog korisnika na osnovu pristupnog tokena
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithm="HS256")
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user

# Ruta za validaciju pristupnog tokena
@app.post("/users/me")
async def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

# Ruta za dobavljanje najnovijih terena
@app.get("/courts/latest", response_model=List[models.CourtWithSports])
def get_latest_courts(db: Session = Depends(get_db)):
    try:
        # Query to fetch the three latest courts
        latest_courts = db.query(models.Court).order_by(desc(models.Court.id)).limit(3).all()
        
        # Fetch sports names for each court
        result = []
        for court in latest_courts:
            sports = db.query(models.CourtSport).filter(models.CourtSport.court_id == court.id).all()
            sport_names = [db.query(models.Sport.name).filter(models.Sport.id == sport.sport_id).first()[0] for sport in sports]
            result.append(models.CourtWithSports(
                id=court.id,
                court_type=court.court_type,
                city=court.city,
                name=court.name,
                image_link=court.image_link,
                sports=sport_names  # Corrected field to sport_names
            ))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Ruta za dobavljanje svih terena, od najstarijeg do najnovijeg
@app.get("/courts/all", response_model=List[models.CourtWithSports])
def get_all_courts(db: Session = Depends(get_db)):
    try:
        all_courts = db.query(models.Court).order_by(asc(models.Court.id)).all()
        
        result = []
        for court in all_courts:
            sports = db.query(models.CourtSport).filter(models.CourtSport.court_id == court.id).all()
            sport_names = [db.query(models.Sport.name).filter(models.Sport.id == sport.sport_id).first()[0] for sport in sports]
            result.append(models.CourtWithSports(
                id=court.id,
                court_type=court.court_type,
                city=court.city,
                name=court.name,
                image_link=court.image_link,
                sports=sport_names 
            ))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))