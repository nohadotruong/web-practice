from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers.user_controller import *
from database import get_db
from models.user_model import UserCreate, UserRead

router = APIRouter(prefix="/users")


@router.get("/", response_model=list[UserRead])
def get_users(db: Session = Depends(get_db)):
    return get_users_controller(db)


@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, db: Session = Depends(get_db)):
    return get_user_controller(db, user_id)


@router.post("/", response_model=UserRead)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user_controller(db, user.dict())


@router.put("/{user_id}", response_model=UserRead)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    return update_user_controller(db, user_id, user.dict())


@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return delete_user_controller(db, user_id)
