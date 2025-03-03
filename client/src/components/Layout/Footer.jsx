export const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6 mt-auto">
          <div className="container mx-auto text-center">
            <p className="text-lg font-semibold">MeetVoice &copy; {new Date().getFullYear()}</p>
            <ul className="flex justify-center space-x-6 mt-4">
              {/* <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-300">Support</a></li> */}
            </ul>
          </div>
        </footer>
      );
  }