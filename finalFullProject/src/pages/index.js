// ##############################################################################
// The index.js file is used to export all the pages in the application.
// ##############################################################################

import LandingPage from './LandingPage.jsx';

// import user service pages
import Login from './Login.jsx';
import ShowProfile from './ShowProfile.jsx';

// import tenant service pages
import Favorites from './Favorites.jsx';
import History from './History.jsx';

// import agent service pages
import AddProperty from './AddProperty.jsx';
import MyPosts from './MyPosts.jsx';

export {
    AddProperty, Favorites,
    History, LandingPage,
    Login, MyPosts, ShowProfile
};
    