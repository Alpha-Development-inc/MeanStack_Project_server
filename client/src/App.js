import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import CreatePostForm from './components/posts/CreatePostForm';
import Posts from './components/posts/Posts';
import Login from './components/authorization/Login/Login';
import Signup from './components/authorization/Signup/Signup';
import Categories from './components/categories/Categories';
import ContactForm from './components/ContactForm';
import ReactNotifications from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import Trending from './components/Trending';
import CreateCategory from './components/categories/CreateCategory';
import { useCallback, useEffect, useState } from 'react';
import AuthContext from './contexts/AuthContext';
import UserPosts from './components/posts/UserPosts';
import Countries from './components/SearchPage';
import CountryDetail from './components/browse/countrydetail';
import DimensionContext from './contexts/DimensionContext';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [width, setWidth] = useState(0);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  }

  const login = useCallback(() => {
    setIsLoggedIn(true);
    const authData = getAuthData();
    setCurrentUser({
      userId: authData.userId,
      username: authData.username
    })
  }, []);
  const logout = useCallback(() => {
    clearAuthData();
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    const authData = getAuthData();
    if (!authData){
      return;
    }
    const now = new Date();
    const expiresIn = authData.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0){
      login();
    }
    else{
      clearAuthData();
    }
  },[]);

  const getAuthData = () => {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    if (!token || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      username: username
    };
  }

  const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  return (

    <DimensionContext.Provider value={width}>
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        currentUser: currentUser,
        login: login,
        logout: logout }}
    >
      <BrowserRouter>
      <ReactNotifications />
        <Header/>
        <div className="content">
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/posts" component={Posts}/>
            <Route path="/createPost/:postID?" component={CreatePostForm}/>
            <Route path="/categories" component={Categories}/>
            <Route path="/home" component={Home}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/contactUs" component={ContactForm}/>
            <Route path="/trending" component={Trending}/>
            <Route path="/browse" component={Countries}/>
            <Route path="/country/:alpha2Code" component={CountryDetail} />
            <Route path="/createCategory" component={CreateCategory}/>
            <Route path="/user/:userId" component={UserPosts}/>
          </Switch>

        </div>
        <Footer/>
      </BrowserRouter>
    </AuthContext.Provider>
    </DimensionContext.Provider>
  );
}

export default App;
