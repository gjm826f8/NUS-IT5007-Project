import './App.css';

// import routes and route
import { Route, Routes } from 'react-router-dom';

// import pages
import AllPosts from './pages/AllPosts';
import Favorites from './pages/Favorites';
import History from './pages/History';
import Login from './pages/Login';
import New from './pages/New';
import LandingPage from './pages/landing_page';

// import auth context
import { AuthWrapper } from './auth/authWrapper';


function App() {
  return (
    <AuthWrapper>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/favorites' element={<Favorites />}/>
        <Route path='/history' element={<History />}/>
        <Route path='/new' element={<New />}/>
        <Route path='/allposts' element={<AllPosts />}/>
      </Routes>
    </AuthWrapper>
  );
}

export default App;
