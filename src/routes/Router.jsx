import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { SignUp } from '../pages/Signup';
import { Login } from '../pages/login';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />}  />
        <Route path="/login" element={<Login />}  />
      </Routes>
    </BrowserRouter>
  );
};