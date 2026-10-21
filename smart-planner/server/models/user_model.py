from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import declarative_base
from pydantic import BaseModel
from database import Base


class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    fullname = Column(String, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class UserCreate(BaseModel):
    email: str
    username: str
    fullname: str
    password: str


class UserRead(BaseModel):
    id: int
    email: str
    username: str
    fullname: str
    password: str
    created_at: str

    class Config:
        orm_mode = True
