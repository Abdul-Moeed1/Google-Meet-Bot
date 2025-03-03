import { NavLink } from "react-router-dom";

export const Home = () =>{
    return (
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow flex items-center justify-center text-center p-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold text-blue-600">Welcome to MeetVoice</h1>
              <p className="mt-4 text-lg text-gray-700">
                MeetVoice is an automated bot that joins Google Meet meetings and plays pre-recorded audio seamlessly.
              </p>
              <div className="mt-6">
                <NavLink to="/start" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition">
                  Try MeetVoice
                </NavLink>
              </div>
            </div>
          </main>
        </div>
      );
}

