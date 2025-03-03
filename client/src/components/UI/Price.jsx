export const Price = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h2 className="text-3xl font-bold text-blue-600">Pricing</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          MeetVoice is completely <span className="font-bold text-green-600">FREE</span> to use! No hidden charges, no subscriptions—just seamless integration to enhance your Google Meet experience.
        </p>
        
        <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold">$0 - Enjoy all features for free!</p>
        </div>
      </div>
    );
  }