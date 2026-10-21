from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware  # thêm import này

app = FastAPI()

# Cho phép frontend gọi API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # địa chỉ Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Định nghĩa dữ liệu đầu vào
class InputData(BaseModel):
    text: str


@app.post("/predict")
def predict(data: InputData):
    # AI giả lập: đảo ngược chuỗi
    result = data.text[::-1]
    return {"result": result}
