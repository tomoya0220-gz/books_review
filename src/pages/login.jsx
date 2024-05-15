import React, { useState } from "react";
import axios from "axios";
import './login.css';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { url } from "../const";
import { signIn } from '../authSlice';

export const Login = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [, setCookie] = useCookies(['token']);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSignIn = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        setCookie('token', res.data.token);
        dispatch(signIn());
        navigate('/');
      })
      .catch((err) => {
        const errorMessage = err.response && err.response.data ? err.response.data.message : 'ログインに失敗しました';
        setErrorMessage(errorMessage);
      });
  };

  if (auth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <main className="signin">
        <h2>ログイン</h2>
        <p>{errorMessage}</p>
        <form onSubmit={onSignIn}>
          <label>メールアドレス</label>
          <br />
          <input 
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <label>パスワード</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button type="submit">
            ログイン
          </button>
        </form>
        <p>
        ユーザー作成画面へ <Link to="/signup">ユーザー作成</Link>
        </p>
      </main>
    </>
  );
};