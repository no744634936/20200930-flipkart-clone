import React, {useState,useEffect} from 'react';
import './Header.style.css'
import logo from '../../images/logo/logo.png';
import goldenStar from '../../images/logo/golden-star.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from '../ui/material/material.js';
import {useDispatch,useSelector,} from "react-redux"
import { loginAction, signoutAction } from '../../redux/auth/authAction';


/**
* @author
* @function Header
**/

const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const loginData = useSelector(state => state.loginData)


  const userLogin = () => {
    dispatch(loginAction({ email,password}))
  }

  useEffect(() => {
      //isAuthenticated变成true就关闭登录modal
    if (loginData.isAuthenticated) {
        setLoginModal(false)
    }
  }, [loginData.isAuthenticated])
  
  const logout=()=>{
      dispatch(signoutAction())
  }

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
          menu={
          <a>{loginData.user.firstName}</a>
          }
          menus={[
            { label: 'My Profile', href: '', icon: null },
            { label: 'superCoin Zone', href: '', icon: null },
            { label: 'Flipkart Plus Zone', href: '', icon: null },
            { label: 'Orders', href: '', icon: null },
            { label: 'Wishlist', href: '', icon: null },
            { label: 'my chats', href: '', icon: null },
            { label: 'Coupons', href: '', icon: null },
            { label: 'Rewards', href: '', icon: null },
            { label: 'Notifications', href: '', icon: null },
            { label: 'Gift Cards', href: '', icon: null },
            { label: 'Logout', href: '', icon: null,onClick:logout},
          ]}
      />
    )
    
  }
  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
          menu={
            <a className="loginButton" onClick={() => setLoginModal(true)}>
              Login
            </a>
          }
          menus={[
            { label: 'My Profile', href: '', icon: null },
            { label: 'Flipkart Plus Zone', href: '', icon: null },
            { label: 'Orders', href: '', icon: null },
            { label: 'Wishlist', href: '', icon: null },
            { label: 'Rewards', href: '', icon: null },
            { label: 'Gift Cards', href: '', icon: null },
          ]}
          firstMenu={
            <div className="firstmenu">
              <span>New Customer?</span>
              <a style={{ color: '#2874f0' }}>Sign Up</a>
            </div>
          }
      />
    )

  }
  return (
    <div className="header">
      <Modal 
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      >
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">

                <MaterialInput
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MaterialInput
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton 
                  title="Login"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  onClick={userLogin}
                />

                <p>OR</p>
                <MaterialButton 
                  title="Request OTP"
                  bgColor="#ffffff"
                  textColor="#fb641b"
                />

            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        {/* Logo  */}
        <div className="logo">
          <a href="">
            <img src={logo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: '-10px' }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        
        {/* logo ends here */}

        {/* search component */}
        <div style={{
          padding: '0 10px'
        }}>
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'search for products, brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color: '#2874f0'
              }} />
            </div>

          </div>
        </div>
        {/* search component ends here */}

        {/* right side menu */}
        <div className="rightMenu">
          {loginData.isAuthenticated ? renderLoggedInMenu():renderNonLoggedInMenu()}
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: 'Notification Preference', href: '', icon: null },
              { label: 'Sell on flipkart', href: '', icon: null },
              { label: '24x7 Customer Care', href: '', icon: null },
              { label: 'Advertise', href: '', icon: null },
              { label: 'Download App', href: '', icon: null }
            ]}
          />
          <div>
            <a className="cart">
              <IoIosCart />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </a>
          </div>
        </div>
        {/* right side menu ends here */}
      </div>
    </div>
  )

}

export default Header