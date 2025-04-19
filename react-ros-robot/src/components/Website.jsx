// Images locations
import Logo from "./website/imgs/logo.png"
import Male from "./website/imgs/male.jpg"
import About from "./website/imgs/wheelchair.jpeg"
import Video from "./website/imgs/wheelchairVideo.mp4"
import Video2 from "./website/imgs/wheelchairVideo2.mp4"

// import About from "./website/imgs/pexels-marcus-aurelius-4064335.jpg"

// Css files
import './website/css/style.css'; // Import your CSS file
import './website/css/normalize.css'; // Import your CSS file'

import Webapp from "./Webapp";

import {  Nav } from "react-bootstrap";
import { useState, useEffect } from "react";

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

// Create a custom context for navigation
const NavigationContext = React.createContext();

// Custom hook to use navigate function
export const useNavigate = () => {
  const history = useHistory();
  const navigate = (to) => {
    history.push(to);
  };
  return navigate;
};

// Provider component to provide navigate function to the entire app
export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  return (
    <NavigationContext.Provider value={navigate}>
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook to access navigate function from anywhere in the app
export const useNavigation = () => {
  const navigate = useContext(NavigationContext);
  if (!navigate) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return navigate;
};





function Website(){
    const navigate = useNavigate();
    const [user, setUser] = useState("");       // save the user
    const [pass, setPass] = useState("");       // save the password
    const [error, setError] = useState("");     // for error
    const [msg, setMsg] = useState("");         // for success

    useEffect(() => {
        setTimeout(function(){
            setMsg("");
        },5000)
    },[msg])

    const handleInputChange = (e,type) => {
        switch(type){
            // If the username left blank
            case "user":
                setError("");
                setUser(e.target.value);
                if(e.target.value === ""){
                    setError("Username has left blank")
                }
                break;
                // If the password left blank
                case "pass":
                    setError("");
                    setPass(e.target.value);
                    if(e.target.value === ""){
                        setError("Password has left blank")
                    }
                    break;                
                default:
        }
    }

    function loginSubmit(){

        if(user !== "" && pass != ""){
           // var url = "http://wheelchair.dev/index.php"
            var url = "http://localhost/index.php"
            fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  user: user,
                  pass: pass
                })
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                // console.log(data);
                if (data.success) {
                    // If login is successful, redirect to "/webapp"
                    console.log('Login Successfull redirecting...', data.message);
                    setMsg("Logged in successfully! Redirecting...");

                    setTimeout(()=> {
                    window.location.href = '/webapp'; 
                    },3000)
                  } else {
                    // If login is unsuccessful, display an error message or handle it accordingly
                    setError(data.message);
                    console.error('Login failed:', data.message);
                  }
            })
              .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
              });
        }
        else{
            setError("All filed are required")
        }
    }



    return(
    <div className="/">
        <div className="body">
            {/* <!-- Start Header --> */}
                <div className="header">
                    <div className="container">
                        <div className="logo_and_text">
                            <a href="#">
                                <img className="logo" src={Logo} alt="Logo" />
                            </a>
                            <a href="#">
                                <h6>ApexDrive Innovators</h6>
                            </a>
                        </div>
                        
                        <div className="links">
                            <span className="icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#services">Services</a></li>
                                <li><a href="#team">Team</a></li>
                                <li><a href="#login">Login</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            {/* <!-- End Header --> */}
                
                {/* <!-- Start Landing Section --> */}
                <div className="landing" id="home">
                    <div className="overlay">
                        <div className="video-container">
                            <video autoPlay muted loop id="myVideo">
                                <source src={Video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <video autoPlay muted loop id="myVideo2">
                                <source src={Video2} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <div className="intro-text">
                        <h1>Hello There</h1>
                        <p>Greetings from ApexDrive Innovators! We hope our website provides you with a helpful introduction to our autonomous wheelchairs.</p>
                    </div>
                </div>
                {/* <!-- End Landing Section --> */}
        
            {/* <!-- Start features --> */}
            <div className="features" id="features">
                <div className="container">
                <h2 className="special-heading">Features</h2>
                <p>ApexDrive Innovators  </p>
                <div className="features-content">
                    {/* <!-- Start Column 1 --> */}
                    <div className="col">
                        {/* <!-- Start Feature 1 --> */}
                    <div className="srv">
                        <i className="fa fa-3x fa-location-arrow"></i>
                        <div className="text">
                        <h3>Autonomous Navigation</h3>
                        <p>
                            The wheelchair uses advanced algorithms and sensors to navigate independently, safely detecting obstacles and adjusting its course, making it ideal for navigating in crowded environments.
                        </p>
                        </div>
                    </div>
                        {/* <!-- End Feature 1 --> */}
        
                        {/* <!-- Start Feature 2 --> */}
                    <div className="srv">
                        <i className="fa fa-3x fa-joystick"></i>
                        <div className="text">
                        <h3>Remote Control</h3>
                        <p>
                            Emphasize the convenience of remotely controlling the wheelchair from a web interface or mobile app.
                            Highlight features such as real-time monitoring and control from any location with internet access.
                        </p>
                        </div>
                    </div>
                    {/* <!-- End Feature 2 --> */}
                    </div>
                    {/* <!-- End Column 1 --> */}
        
                    {/* <!-- Start Column 2 --> */}
                    <div className="col">
                        {/* <!-- Start feature 3 --> */}
                        <div className="srv">
                        <i className="fa fa-3x fa-shield-check"></i>
                        <div className="text">
                            <h3>Safety Features</h3>
                            <p>
                                Highlight the safety features built into the wheelchair, such as emergency stop functionality and collision avoidance.
                                Explain how the wheelchair prioritizes user safety while navigating autonomously.                </p>
                        </div>
                        </div>
                        {/* <!-- End Feature 3 --> */}
                        {/* <!-- Start Feature 4 --> */}
                        <div className="srv">
                        <i className="fa fa-3x fa-user" ></i>
                        <div className="text">
                            <h3>User Friendly Interface</h3>
                            <p>
                                Describe the intuitive design of the wheelchair, making it easy for users of all abilities to operate.
                                Highlight features such as simple controls, clear feedback indicators, and ergonomic design.             </p>
                        </div>
                        </div>
                        {/* <!-- End Feature 4 --> */}
                    </div>
                    {/* <!-- End Column 2 --> */}
                </div>
                </div>
            </div>
            {/* <!-- End features --> */}
        
        
            {/* <!-- Start About --> */}
                <div className="about" id="about">
                    <div className="container">
                        <h2 className="special-heading">About Us</h2>
                        <p>ApexDrive Innovators</p>
                        <div className="about-content">
                            <div className="row g-5">
                                <div className="col-lg-6 wow fadeInUp styled_div_about" data-wow-delay="0.1s">
                                    <div className="position-relative h-100">
                                        {/* <img className="img-fluid position-absolute w-100 h-100 styled_img_about"  src={About} alt="" /> */}
                                        <img className="img-fluid w-100 h-100 styled_img_about"  src={About} alt="" />

                                    </div>
                                </div>
                                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                                    <h4 className="">Welcome to <span>ApexDrive Innovators</span></h4>
                                    <p className="">where we are revolutionizing mobility through innovation and technology. Our mission is to develop cutting-edge solutions in robotics and assistive technology to empower individuals with mobility challenges. Founded 
                                    <strong> 2024</strong>, our team of passionate engineers are dedicated to creating a future where everyone has access to safe, reliable, and autonomous transportation solutions.
                
                                        With a focus on making the wheelchair navigate autonomously to the goal that send by the user, we are pushing the boundaries of what's possible in the field of robotics. Our self-driving wheelchair project is the culmination of years of research, development, and collaboration, and we are proud to introduce a technology that has the potential to transform lives.
                                        
                                        At ApexDrive Innovators, we believe in the power of innovation to make a positive impact on society. Through our work, we aim to improve mobility, enhance independence, and promote inclusivity for individuals with disabilities. Join us on this journey as we continue to push the boundaries of technology and shape the future of mobility.</p>
                                    <div className="row gy-2 gx-4 mb-4">
                                        <div className="col-sm-6">
                                            <p className="mb-0"><i className="fa fa-arrow-right"></i>Technical Support</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="mb-0"><i className="fa fa-arrow-right"></i>Online Sessions</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="mb-0"><i className="fa fa-arrow-right"></i>SW Maintenance</p>
                                        </div>
                                    </div>
                                    {/* style="color: white;" */}
                                <a className="btn btn-primary py-3 px-5 mt-2" href="#services" >Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* <!-- End About --> */}
        
        
        
                {/* <!-- Start Services --> */}
                    <div className="services" id="services">
                        <div className="container">
                            <h2 className="special-heading">Services</h2>
                            <p>ApexDrive Innovators</p>
                            <div className="services-contents">
                                        <div className="feat">
                                            <i className="fa fa-3x fa-screen-users"></i>
                                            <h3>Training Programs</h3>
                                            <p>Participate in our live online sessions to remotely control our self-driving wheelchair. Explore autonomous navigation firsthand and contribute to innovative research in robotics and assistive technology.</p>
                                        </div>
                                        <div className="feat">
                                            <i className="fa fa-3x fa-wrench"></i>
                                            <h3>Technical Support</h3>
                                            <p>Our technical support team is here to ensure your self-driving wheelchair experience is seamless. Reach out via phone, email, or online chat for prompt assistance. Explore our online resources for quick solutions, guaranteeing uninterrupted mobility.</p>
                                        </div>
                                        <div className="feat">
                                            <i className="fa fa-3x fa-arrows-rotate"></i>
                                            <h3>SW Maintenance</h3>
                                            <p>Offer regular software updates to improve performance, add new features, and address security vulnerabilities.
                                                Provide maintenance services to ensure the wheelchair's software and hardware components are functioning optimally.</p>                       
                                        </div>
                            </div>
                        </div>
                    </div>
                {/* <!-- End Services --> */}
        
        
            {/* <!-- Start Team Members --> */}
            <div className="team" id="team">
                <div className="container">
                    <h2 className="special-heading">Team Members</h2>
                    <p>ApexDrive Innovators</p>
                    <div className="team-content">
                        {/* <!-- Ahmed Shaher --> */}
                        <div className="member" >
                            <div className="img-box">
                                <img src={Male} alt="Ahmed Shaher" className="image"/>
                                <div className="icons">
                                    <ul>
                                         <li><a href="https://www.facebook.com/sha.her.3517"><i class="fa-brands fa-facebook fa-2xl"></i></a></li>
                                        <li><a href="https://www.linkedin.com/in/ahmed-shaher-994225267?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
                                            <i class="fa-brands fa-linkedin fa-2xl"></i>
                                            </a>
                                        </li>
                                        <li><a href=""><i class="fa-brands fa-github fa-2xl"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <h6>Ahmed Shaher</h6>
                            <p className="ahmed">Hardware</p>
                        </div>
        
                        {/* <!-- Marwan Ahmed --> */}
                        <div className="member">
                        <div className="img-box">
                            <img src={Male} alt="Marwan Ahmed" className="image"/>
                            <div className="icons">
                                <ul>
                                    <li><a href="https://www.facebook.com/marwan.ahmed.56211497?mibextid=ZbWKwL"><i class="fa-brands fa-facebook fa-2xl"></i></a></li>
                                    <li>
                                        <a href="https://www.linkedin.com/in/marwan-ahmed-7b7823258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                                            <i class="fa-brands fa-linkedin fa-2xl"></i>
                                        </a>
                                    </li>
                                    <li><a href=""><i class="fa-brands fa-github fa-2xl"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <h6>Marwan Ahmed</h6>
                        <p className="marwan">Hardware</p>
                        </div>
        
                        {/* <!-- Mostafa Ahmed Abd-Elsalam --> */}
                        <div className="member">
                            <div className="img-box">
                                <img src={Male} alt="Mostafa Ahmed Abdelsalam" className="image"/>
                                <div className="icons">
                                    <ul>
                                        <li><a href="https://www.facebook.com/mostafa.tomi.5"><i class="fa-brands fa-facebook fa-2xl"></i></a></li>
                                        <li><a href="https://www.linkedin.com/in/mostafa-ahmed-434710247/"><i class="fa-brands fa-linkedin fa-2xl"></i></a></li>
                                        <li><a href=""><i class="fa-brands fa-github fa-2xl"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <h6>Mostafa Ahmed Abd-Elsalam</h6>
                            <p className="abd-elsalam">Hardware</p>
                        </div>
        
                        {/* <!-- Mostafa Ahmed Ramadan --> */}
                        <div className="member">
                        <div className="img-box">
                            <img src={Male} alt="Mostafa Ahmed Ramadan" className="image"/>
                            <div className="icons">
                                <ul>
                                <li><a href="https://www.facebook.com/ana.wadmoshkla.54390876?mibextid=ZbWKwL"><i class="fa-brands fa-facebook fa-2xl"></i></a></li>
                                <li><a href="https://www.linkedin.com/in/mostafa-ahmed-382574246/"><i class="fa-brands fa-linkedin fa-2xl"></i></a></li>
                                <li><a href=""><i class="fa-brands fa-github fa-2xl"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <h6>Mostafa Ahmed Ramadan</h6>
                        <p className="ramadan">Software</p>
                        </div>
        
                        {/* <!-- Yousif Adel --> */}
                        <div className="member">
                            <div className="img-box">
                                <img src={Male} alt="Yousif Adel" className="image"/>
                                <div className="icons">
                                    <ul>
                                    <li><a href="https://www.facebook.com/yosif.adel.1/"><i class="fa-brands fa-facebook fa-2xl"></i></a></li>
                                    <li><a href="https://www.linkedin.com/in/yousif-adel-a601641b1/"><i class="fa-brands fa-linkedin fa-2xl"></i></a></li>
                                    <li><a href="https://github.com/YosifAdel"><i class="fa-brands fa-github fa-2xl"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <h6>Yousif Adel</h6>
                            <p className="yousif">Software</p>
                        </div>
        
        
                    
                    </div>
                </div>
            </div>
            {/* <!-- End Team Members --> */}
        
            {/* <!-- Start Login Form  --> */}
            <div className="login" id="login">
                <div className="container">
                    <h2 className="special-heading">Login Form</h2>
                    <p>ApexDrive Innovators</p>
                    <div className="form-content" id="login">
                        <form action="" className="form">
                            <h2>Log In to Your Account</h2>
                            <p>
                                {
                                    error !== ""?
                                    <span className="error">{error}</span> :           
                                    <span className="success">{msg}</span>

                                }
                            </p>
                            <div className="box">
                                <input className="input" type="text" placeholder="Username" required name="user"
                                value={user}
                                onChange={(e) => handleInputChange(e,"user")}
                                />
                            </div>
                            <div className="box">
                                <input className="input" type="password" placeholder="Password" required name="pass"
                                value={pass}       
                                onChange={(e) => handleInputChange(e,"pass")}
                                />
                            </div>
                            <div className="submit">
                            <input type="button" value="Login" className="button" onClick={loginSubmit}/>                                
                            </div>
                        </form>            
                    </div>
                </div>
            </div>
            {/* <!-- End Login Form --> */}
        
                {/* <!-- Start Footer--> */}
                <footer>
                    &copy; 2024 <span>ApexDrive Innovators</span> All Right Reserved
                </footer>
                {/* <!-- End Footer--> */}
            </div>
        </div>
    );
}
export default Website;
