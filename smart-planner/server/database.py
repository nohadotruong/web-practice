import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# Load biến môi trường từ .env
load_dotenv()

# Lấy URL kết nối từ .env
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Tạo engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# SessionLocal để làm việc với DB
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class cho các model
Base = declarative_base()


# Dependency để inject vào route/controller
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
