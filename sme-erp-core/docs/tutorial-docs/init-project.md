Dưới đây là các bước khởi tạo dự án FastAPI sử dụng SQLAlchemy 2.0 (cú pháp Async/Sync hiện đại) và Pydantic v2 cho Data Validation & Serialization.

---

### Bước 1: Cấu trúc thư mục dự án

```text
my_fastapi_project/
├── app/
│   ├── __init__.py
│   ├── database.py       # Cấu hình kết nối SQLAlchemy Engine & Session
│   ├── models.py         # SQLAlchemy ORM Models (Database Table)
│   ├── schemas.py        # Pydantic Schemas (Validation & Response)
│   ├── crud.py           # Các truy vấn cơ sở dữ liệu
│   └── main.py           # Các API Routes & FastAPI Entry point
├── requirements.txt
└── .env                  # Lưu biến môi trường (Chuỗi kết nối DB)

```

---

### Bước 2: Cài đặt thư viện cần thiết

Tạo tập tin `requirements.txt`:

```text
fastapi
uvicorn[standard]
sqlalchemy>=2.0.0
pydantic>=2.0.0
python-dotenv
# Sử dụng psycopg2 nếu dùng PostgreSQL (hoặc aiomysql/asyncpg nếu dùng async)

```

Cài đặt bằng lệnh:

```bash
pip install -r requirements.txt

```

---

### Bước 3: Cấu hình Cơ sở dữ liệu (`app/database.py`)

Khởi tạo SQLAlchemy 2.0 Engine và `DeclarativeBase`.

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# Ví dụ kết nối SQLite (với PostgreSQL: "postgresql://user:password@localhost/dbname")
SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False} # Chỉ áp dụng cho SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class cho SQLAlchemy 2.0 Models
class Base(DeclarativeBase):
    pass

# Dependency lấy DB session cho FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

```

---

### Bước 4: Định nghĩa SQLAlchemy 2.0 Models (`app/models.py`)

SQLAlchemy 2.0 sử dụng `Mapped` và `mapped_column` để hỗ trợ Type Hinting tốt hơn.

```python
from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)

```

---

### Bước 5: Định nghĩa Pydantic v2 Schemas (`app/schemas.py`)

Dùng `from_attributes = True` trong `model_config` để Pydantic tự động đọc dữ liệu từ SQLAlchemy ORM Models.

```python
from pydantic import BaseModel, EmailStr, ConfigDict

# Base Schema chứa các field chung
class UserBase(BaseModel):
    username: str
    email: EmailStr
    bio: str | None = None

# Schema dùng cho dữ liệu đầu vào khi CREATE
class UserCreate(UserBase):
    pass

# Schema dùng cho dữ liệu trả về (Response)
class UserResponse(UserBase):
    id: int

    # Pydantic v2 config để tương thích với SQLAlchemy ORM
    model_config = ConfigDict(from_attributes=True)

```

---

### Bước 6: Xử lý CRUD Logic (`app/crud.py`)

Viết các hàm tương tác DB sử dụng cú pháp SQLAlchemy 2.0 (`select`).

```python
from sqlalchemy.orm import Session
from sqlalchemy import select
from app import models, schemas

def get_user_by_id(db: Session, user_id: int):
    stmt = select(models.User).where(models.User.id == user_id)
    return db.scalars(stmt).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        username=user.username,
        email=user.email,
        bio=user.bio
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

```

---

### Bước 7: Khởi tạo FastAPI App & API Routes (`app/main.py`)

```python
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import models, schemas, crud
from app.database import engine, get_db

# Tạo bảng trong DB nếu chưa tồn tại
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="FastAPI + SQLAlchemy 2.0 App")

@app.post("/users/", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def create_new_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

@app.get("/users/{user_id}", response_model=schemas.UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

```

---

### Bước 8: Chạy ứng dụng

Chạy lệnh Uvicorn từ thư mục gốc của dự án:

```bash
uvicorn app.main:app --reload

```

Truy cập Swagger UI tại: `[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)` để test các API endpoint.