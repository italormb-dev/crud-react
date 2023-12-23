import  React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../components/home/home'
import UserCrud from '../components/user/userCrud'

export default _props => 
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserCrud />} />
    </Routes>
