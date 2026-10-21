from fastapi import HTTPException
from sqlalchemy.orm import Session
from services.user_service import *


def create_user_controller(db: Session, user_data: dict):
    try:
        return create_user_service(db, user_data)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


def get_users_controller(db: Session):
    return get_users_service(db)


def get_user_controller(db: Session, user_id: int):
    user = get_user_service(db, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="Tài khoản không tồn tại!")

    return user


def update_user_controller(db: Session, user_id: int, user_data, dict):
    try:
        user = update_user_service(db, user_id, user_data)

        if not user:
            raise HTTPException(status_code=404, detail="Tài khoản không tồn tại!")

        return user

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


def delete_user_controller(db: Session, user_id: int):
    success = delete_user_service(db, user_id)

    if not success:
        raise HTTPException(status_code=404, detail="Tài khoản không tồn tại!")
    return {"detail": "Xóa tài khoản thành công!"}
