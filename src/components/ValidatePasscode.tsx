import React, { useState } from "react";
import axios from "axios";

const VerifyPasscode: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<null | { valid: boolean; name?: string; expiresAt?: string; reason?: string }>(null);
  const [loading, setLoading] = useState(false);



  
  const handleVerify = async () => {
    if (!input.trim()) {
      alert("Please enter a passcode.");
      return;
    } 
    setLoading(true);
    try {
      const response = await axios.post(
        "https://passcode-generator-app.onrender.com/api/passcodes/validate",
       
        { code: input.trim() }
      );
      setResult({
        valid: true,
        name: response.data.name,
        expiresAt: response.data.expiresAt,
      });   
    }
    catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setResult({
          valid: false,
          reason: error.response.data.message || "An error occurred while verifying the passcode.",
        });
      } else {
        setResult({
          valid: false,
          reason: "An unexpected error occurred.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">Verify Passcode</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter passcode"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Checking..." : "Verify"}
        </button>

        {result && (
          <div className="mt-4 text-center">
            {result.valid ? (
              <div className="text-green-600 font-semibold">
                ✅ Valid Passcode<br />
                Name: {result.name}<br />
                Expires At: {result.expiresAt ? new Date(result.expiresAt).toLocaleTimeString() : "N/A"}
              </div>
            ) : (
              <div className="text-red-600 font-semibold">
                ❌ Invalid Passcode: {result.reason}
              </div>
            )}
          </div>
        )}
      </div>
      {/* back to home */}
        <div className="mt-6 text-center">
            <a href="/" className="text-blue-500 hover:underline">
            Back to Home
            </a>
            </div>
    </div>
  );
};

export default VerifyPasscode;
