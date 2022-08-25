import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ContentDetails from './components/ContentDetails';
import NavBar from "./components/NavBar";
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home'
import LogIn from './pages/LogIn';
import SignUp from './pages/SingUp';

function App() {
  return (
    <div>
      <AuthContextProvider>

      <NavBar />

      <Routes> 
        <Route  path='/' element={<Home />} />
        <Route  path='/movie/:id' element={<ContentDetails />} />
        <Route  path='/login' element={<LogIn />} />
        <Route  path='/signup' element={<SignUp />} />
        <Route  path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
      </Routes>

      </AuthContextProvider>
    </div>
  );
}

export default App;
