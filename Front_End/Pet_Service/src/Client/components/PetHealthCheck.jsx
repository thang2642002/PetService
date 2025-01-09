import React, { useState } from "react";
import { checkHealth } from "../../services/petScoresServices";

const PetHealthCheck = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!symptoms) {
      setError("Hãy nhập triệu chứng!");
      return;
    }

    try {
      const response = await checkHealth(symptoms);
      console.log("response", response.data);
      setResult(response.data);
      setSymptoms("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại!"
      );
    }
  };

  console.log("chek resuld", result);

  return (
    <div className="max-w-md mx-auto p-6 bg-orange-200 shadow-md rounded-lg mt-[100px]">
      <h1 className="text-2xl font-bold text-center mb-4">
        Kiểm Tra Sức Khỏe Thú Cưng
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Nhập Triệu Chứng:
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Ví dụ: Biếng ăn, nôn mửa..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition"
        >
          Kiểm Tra
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Kết Quả:</h2>
          <ul className="space-y-4">
            {result.map((item, index) => (
              <li
                key={index}
                className="p-4 border border-gray-300 rounded-md bg-gray-50"
              >
                <p className="font-medium text-gray-800">
                  <strong>Bệnh:</strong> {item.disease_name}
                </p>
                <p className="text-gray-700">
                  <strong>Gợi ý chăm sóc:</strong> {item.care_suggestions}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PetHealthCheck;
