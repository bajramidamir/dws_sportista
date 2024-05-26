from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
import os
import jwt
from jwt import PyJWTError
from typing import Optional
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

# Ruta za prijavu (login)
@app.post("/users/login")
async def login_for_access_token(user: models.UserLoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, user.username, user.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = create_access_token({"sub": user.username})
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
@app.post("users/me")
async def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user