import React, { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

const GeneratePasscode: React.FC = () => {
  const [name, setName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [customExpiresAt, setCustomExpiresAt] = useState("");

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        "https://passcode-generator-app.onrender.com/api/passcodes/generate"
      );
      const { code, expiresAt } = response.data;
      setPasscode(code);
      setExpiresAt(new Date(expiresAt));
      setCustomExpiresAt("");
    } catch (error) {
      // use toastify
      console.error("Error generating passcode:", error);
    }
  };

  const generateWhatsAppURL = () => {
    const expiryTime = customExpiresAt || expiresAt?.toLocaleTimeString();
    const message = `Hello ${name}. Your one time accesscode is: ${passcode}, and expires at: ${expiryTime}`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  const handleSend = () => {
    if (!name || !passcode || (!expiresAt && !customExpiresAt)) {
      alert("Please make sure name, passcode, and expiry time are all set.");
      return;
    }
    window.open(generateWhatsAppURL(), "_blank");
  };

  const handleClear = () => {
    setPasscode("");
    setExpiresAt(null);
    setCustomExpiresAt("");
    setName("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-white to-gray-100 px-4 py-10 sm:px-10">
      <div className=" max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
     
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Passcode Generator
          </h1>
          <p className="text-gray-600 text-base">
            Generate and share secure passcodes instantly via WhatsApp.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2  ">
          <div className="bg-white p-6 rounded-xl ">
            <button
              onClick={handleGenerate}
              className="w-1/2 md:w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer "
            >
              Generate Passcode
            </button>

            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passcode
                </label>
                <input
                  type="text"
                  readOnly
                  value={passcode}
                  placeholder="Generated Passcode"
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 font-mono text-lg text-center tracking-wider focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Recipient's Name"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Expiry Time
                </label>
                <input
                  type="text"
                  value={customExpiresAt}
                  onChange={(e) => setCustomExpiresAt(e.target.value)}
                  placeholder="e.g. 4:00 PM"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                />
                {expiresAt && !customExpiresAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    Auto Expiry: {expiresAt.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSend}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Send via WhatsApp
              </button>
              <button
                onClick={handleClear}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear
              </button>
            </div>
          </div>

          {name && passcode && (customExpiresAt || expiresAt) && (
            <div className="flex flex-col items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                <p className="text-sm text-gray-600 mb-4 font-medium">
                  Scan QR to send via WhatsApp
                </p>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <QRCode value={generateWhatsAppURL()} size={180} />
                </div>
              </div>
            </div>
          )}
        </div>
        
      </div>
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Need to verify a passcode?{" "}
          <Link
            to="/verify"
            className="text-blue-600 hover:underline font-medium"
          >
            Click here
          </Link>
        </p>
      </footer>   
        
    
        </div>
  );
};

export default GeneratePasscode;


    