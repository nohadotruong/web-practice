# Session của SQLAlchemy dùng để thao tác với database
from sqlalchemy.orm import Session

# Bắt lỗi vi phạm ràng buộc cơ sở dữ liệu (ví dụ UNIQUE)
from sqlalchemy.exc import IntegrityError

# Lỗi cụ thể của PostgreSQL khi vi phạm UNIQUE
from psycopg2.errors import UniqueViolation

# Model UserDB đại diện bảng "users"
from models.user_model import UserDB


def get_all_users(db: Session):
    return db.query(UserDB).all()


def get_user_by_id(db: Session, user_id: int):
    return db.query(UserDB).filter(UserDB.id == user_id).first()


def create_user(db: Session, user_data: dict):
    user = UserDB(**user_data)

    try:
        db.add(user)  # Thêm user vào session tạm thời
        db.commit()  # Ghi dữ liệu vào database thật (INSERT)

        # Cập nhật object Python với các giá trị mới từ DB (ví dụ id tự tăng)
        db.refresh(user)

        return user

    except IntegrityError as e:

        if isinstance(e.orig, UniqueViolation):
            constraint_name = e.orig.diag.constraint_name

            if constraint_name == "users_email_key":
                raise ValueError("Email đã tồn tại")

            elif constraint_name == "users_username_key":
                raise ValueError("Username đã tồn tại")

        else:
            raise e


def update_user(db: Session, user_id: int, user_data: dict):
    user = get_user_by_id(db, user_id)

    if user:
        for key, value in user_data.items():
            setattr(user, key, value)

        try:
            db.commit()
            db.refresh(user)

            return user

        except IntegrityError as e:

            if isinstance(e.orig, UniqueViolation):
                constraint_name = e.orig.diag.constraint_name

                if constraint_name == "users_email_key":
                    raise ValueError("Email đã tồn tại")

                elif constraint_name == "users_username_key":
                    raise ValueError("Username đã tồn tại")

            else:
                raise e

    return None


def delete_user(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)
    if user:
        db.delete(user)
        db.commit()
        return True
    return False
