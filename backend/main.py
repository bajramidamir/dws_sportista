from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
from jwt import PyJWTError
from typing import Optional
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

# Import funkcija za autentifikaciju putem JWT
from jwt_utils import authenticate_user, create_access_token

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
@app.post("/login")
async def login_for_access_token(username: str, password: str, db: Session = Depends(get_db)):
    user = authenticate_user(db, username, password)
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
