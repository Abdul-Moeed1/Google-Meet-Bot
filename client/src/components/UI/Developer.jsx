export  const Developer = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h2 className="text-3xl font-bold text-blue-600">About the Developer</h2>
        <p className="mt-2 text-lg text-gray-700 max-w-2xl">
          MeetVoice was developed by a passionate web developer with expertise in MERN stack development. The goal was to automate and enhance the Google Meet experience by enabling seamless audio playback in meetings.
        </p>
        
        <div className="mt-6">
          <img
            src="/Untitled design.png" 
            alt="Developer"
            className="w-48 h-48 rounded-full border-4 border-blue-500 shadow-lg"
          />
        </div>
        
        <p className="mt-4 text-lg text-gray-700">Feel free to connect and collaborate!</p>
      </div>
    );
  }
  