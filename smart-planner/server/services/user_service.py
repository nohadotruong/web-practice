from utils.hash import hash_password, verify_password
from repositories import user_repo
from sqlalchemy.orm import Session


def create_user_service(db: Session, user_data: dict):
    user_data["password"] = hash_password(user_data["password"])
    return user_repo.create_user(db, user_data)


def get_users_service(db: Session):
    return user_repo.get_all_users(db)


def get_user_service(db: Session, user_id: int):
    return user_repo.get_user_by_id(db, user_id)


def update_user_service(db: Session, user_id: int, user_data: dict):
    return user_repo.update_user(db, user_id, user_data)


def delete_user_service(db: Session, user_id: int):
    return user_repo.delete_user(db, user_id)
