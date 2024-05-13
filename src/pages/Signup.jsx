import React, { useState } from "react";
import axios from 'axios';
import { url } from '../const';
import './signUp.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./login";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null
  });
  const [, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);

    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.post(`${url}/users`, data);
      console.log('User created:', response.data);
    } catch (error) {
      setError('Login failed.')
      console.error('Error creating user:', error);
    }
  };

  return (
    <>
      < BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange}/>
        </div>
        <div>
          <label>Password</label>
          <input type="text" name="password" value={formData.password} onChange={handleChange}/>
        </div>
        <div>
          <label>Image</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </>
  )
}