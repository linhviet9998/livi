import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducers/userReducer';
import UserProfile from './components/screens/UserProfile';
import SubscribedUserPosts from './components/screens/SubscribesUserPosts';
import Reset from './components/screens/Reset';
import NewPassword from './components/screens/Newpassword';
import Footer from './components/Footer';
export const UserContext = createContext();

const Routing = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: 'USER', payload: user });
        } else {
            if (!history.location.pathname.startsWith('/reset'))
                history.push('/signin');
        }
    }, []);
    return (
        <Switch>
            <Route exact path="/">
                <Navbar />
                <Home />
            </Route>
            <Route path="/signin">
                <SignIn />
                <Footer />
            </Route>
            <Route path="/signup">
                <Signup />
                <Footer />
            </Route>
            <Route exact path="/profile">
                <Navbar />
                <Profile />
            </Route>
            <Route path="/create">
                <Navbar />
                <CreatePost />
            </Route>
            <Route path="/profile/:userid">
                <Navbar />
                <UserProfile />
            </Route>
            <Route path="/myfollowingpost">
                <Navbar />
                <SubscribedUserPosts />
            </Route>
            <Route exact path="/reset">
                <Reset />
            </Route>
            <Route path="/reset/:token">
                <Navbar />
                <NewPassword />
            </Route>
        </Switch>
    );
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            <BrowserRouter>
                <Routing />
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
