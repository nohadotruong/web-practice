import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState(""); // Lưu giá trị nhập
  const [result, setResult] = useState(""); // Lưu kết quả trả về từ backend

  const handleSubmit = async () => {
    try {
      // Gửi POST request lên backend FastAPI
      const res = await axios.post(
        "http://127.0.0.1:8000/predict",
        { text: input }
      );
      setResult(res.data.result); // Lưu kết quả trả về
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Demo React + FastAPI + Tailwind
      </h1>
      <input
        type="text"
        className="border p-2 rounded mb-2 w-64"
        placeholder="Nhập chuỗi..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleSubmit}
      >
        Gửi
      </button>
      <p className="text-lg font-medium">
        Kết quả AI: {result}
      </p>
    </div>
  );
}

export default App;
