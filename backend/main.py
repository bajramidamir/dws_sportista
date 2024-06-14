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

# Ruta za slanje prijave za postanak menadzera
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
    

# Ruta za dobavljanje specificnog terena
@app.get("/courts/{court_id}", response_model=models.CourtWithSports)
def get_court_by_id(court_id: int, db: Session = Depends(get_db)):
    try:
        court = db.query(models.Court).filter(models.Court.id == court_id).first()
        if not court:
            raise HTTPException(status_code=404, detail="Court not found")

        sports = db.query(models.CourtSport).filter(models.CourtSport.court_id == court.id).all()
        sport_names = [db.query(models.Sport.name).filter(models.Sport.id == sport.sport_id).first()[0] for sport in sports]

        return models.CourtWithSports(
            id=court.id,
            court_type=court.court_type,
            city=court.city,
            name=court.name,
            image_link=court.image_link,
            sports=sport_names
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Ruta za dodavanje novog terena
@app.post("/courts/create", status_code=status.HTTP_201_CREATED)
async def create_court(court: models.CourtCreateRequest, db: Session = Depends(get_db)):
    try:
        db_court = models.Court(
            court_type=court.court_type,
            city=court.city,
            name=court.name,
            image_link=court.image_link
        )

        db.add(db_court)
        db.commit()
        db.refresh(db_court)

        return {"message": "Teren uspješno dodan!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# Ruta za brisanje terena
@app.delete("/courts/delete/{court_id}", status_code=status.HTTP_200_OK)
async def delete_court(court_id: int, db: Session = Depends(get_db)):
    try:
        court = db.query(models.Court).filter(models.Court.id == court_id).first()
        if court is None:
            raise HTTPException(status_code=404, detail="Teren nije pronađen")

        db.delete(court)
        db.commit()

        return {"message": "Teren uspješno obrisan"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


# Ruta za dodavanje novog termina
@app.post("/appointments/create", status_code=status.HTTP_201_CREATED)
async def create_appointment(appointment: models.AppointmentCreateRequest, db: Session = Depends(get_db)):
    try:
        db_appointment = models.Appointment(
            start_time=appointment.start_time,
            end_time=appointment.end_time,
            court_id=appointment.court_id,
            sport_id=appointment.sport_id,
            available_slots=appointment.available_slots,
            cancelled=False
        )

        db.add(db_appointment)
        db.commit()
        db.refresh(db_appointment)

        return {"message": "Termin uspješno dodan!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Ruta za brisanje termina
@app.delete("/appointments/delete/{appointment_id}", status_code=status.HTTP_200_OK)
async def delete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    try:
        appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
        if appointment is None:
            raise HTTPException(status_code=404, detail="Termin nije pronađen")

        db.delete(appointment)
        db.commit()

        return {"message": "Termin uspješno obrisan"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Ruta za dohvacanje termina za odredjeni teren
@app.get("/appointments/{court_id}", response_model=List[models.AppointmentResponse])
def fetch_terms(court_id: int, db: Session = Depends(get_db)):
    try:
        appointments = db.query(models.Appointment).join(models.Sport).filter(models.Appointment.court_id == court_id).all()
        if not appointments:
            raise HTTPException(status_code=404, detail="Termini nisu pronađeni")

        appointment_responses = [
            models.AppointmentResponse(
                id=appointment.id,
                start_time=appointment.start_time,
                end_time=appointment.end_time,
                court_id=appointment.court_id,
                sport=appointment.sport.name,
                available_slots=appointment.available_slots,
                cancelled=appointment.cancelled
            )
            for appointment in appointments
        ]
        
        return appointment_responses
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Ruta za dodavanje rezervacija
@app.post("/reservations/create", status_code=status.HTTP_201_CREATED)
def create_reservation(reservation: models.ReservationCreateRequest, db: Session = Depends(get_db)):
    try:
        appointment = db.query(models.Appointment).filter(models.Appointment.id == reservation.appointment_id).first()
        if not appointment:
            raise HTTPException(status_code=404, detail="Appointment not found")
        
        if appointment.available_slots < reservation.number_of_players:
            raise HTTPException(status_code=400, detail="Not enough available slots")
        
        appointment.available_slots -= reservation.number_of_players

        db.add(appointment)
        db.commit()
        db.refresh(appointment)

        new_reservation = models.Reservation(
            appointment_id=reservation.appointment_id,
            user_id=reservation.user_id,
            number_of_players=reservation.number_of_players
        )

        db.add(new_reservation)
        db.commit()
        db.refresh(new_reservation)

        return {"message": "Rezervijacija uspješno dodana!"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Ruta za dobavljanje korisnikovih rezervacija
@app.get("/reservations/user", response_model=List[models.Reservation])
def get_user_reservations(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    try:
        reservations = db.query(models.Reservation).filter(models.Reservation.user_id == current_user.id).all()
        return reservations
    except Exception as e:
        raise HTTPException(status_code=500, detail="Database error: " + str(e))


# Ruta za otkazivanje rezervacija
