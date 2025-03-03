import { useState } from "react";
import { startMeeting } from "../../Services/service";

export const Start = () => {
  const [meetLink, setMeetLink] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleStart = async (e) => {
    setIsProcessing(true);
    try {
      e.preventDefault();
      setServerError(false);
      setUrlError(false);
      setIsSuccess(false);
      const res = await startMeeting({ url : meetLink });
      if (res.status == 200) {
        setIsSuccess(true);
        setIsProcessing(false);
      }

    } catch (error) {
      if (error.status == 400) {
        setUrlError(true);
        setIsProcessing(false);
      } else if (error.status == 500) {
        setServerError(true);
        setIsProcessing(false);
      }
      else{
        setServerError(true);
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h2 className="text-3xl font-bold text-blue-600">Get Started with MeetVoice</h2>
      <p className="mt-2 text-lg text-gray-700">Enter your Google Meet link to start the process.</p>

      <div className="mt-6 w-full max-w-md">
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Google Meet link..."
          value={meetLink}
          onChange={(e) => setMeetLink(e.target.value)}
        />
        {urlError && <p className="text-red-500 text-sm mt-1">Invalid Google Meet link. Please enter a valid link.</p>}
        {serverError && <p className="text-red-500 text-sm mt-1">Server error. Please try again later.</p>}
        {isSuccess && <p className="text-green-600 text-sm mt-1">Successfully completed the meeting!</p>}
        <button
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          onClick={handleStart}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Start"}
        </button>
      </div>
    </div>
  );
}
