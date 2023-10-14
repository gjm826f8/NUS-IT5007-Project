import './App.css';

// import routes and route
import { Route, Routes } from 'react-router-dom';

// import pages
import AllPosts from './pages/AllPosts';
import Favorites from './pages/Favorites';
import History from './pages/History';
import Home from './pages/Home';
import Login from './pages/Login';
import New from './pages/New';

// import auth context
import { AuthWrapper } from './auth/authWrapper';


function App() {
  return (
    <AuthWrapper>
      <Routes>
        <Route path='/' element={<Home />}/>
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
