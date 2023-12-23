import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
    
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './app.css';
    
import Logo from '../components/template/logo';
import Nav from '../components/template/nav';
import Footer from '../components/template/footer';
import Routes from './routes'
    
export default props => 
  <Router>
    <div className="app">
      <Logo />
      <Nav />
      <Routes />
      <Footer />
    </div>
  </Router>
    

    