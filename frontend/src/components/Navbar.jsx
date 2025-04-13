import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
// const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {

  const user = (localStorage.getItem('userName')); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      await axios.post(`${BASE_URL}/api/users/logout`, {}, {
        withCredentials: true
      });      
      navigate('/login');
    }
    catch(error){
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="bg-blue-600 py-4 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <span className="text-2xl font-bold text-white ">SALESBLINK</span>
      </Link>
              
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="py-2 text-white">Hi {user}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-white font-bold bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;