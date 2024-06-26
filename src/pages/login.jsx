import React, { useState } from "react";
import axios from "axios";
import './login.css';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { url } from "../const";
import { signIn } from '../authSlice';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import  * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("有効なメールアドレスを入力してください").required("メールアドレスは必須です"),
  password: yup.string().min(6, "パスワードは６文字以上でなければなりません").required("パスワードは必須です"),
});

export const Login = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [, setCookie] = useCookies(['token']);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSignIn = (data) => {
    data.preventDefault();
    axios
      .post(`${url}/signin`, data)
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
        <form onSubmit={handleSubmit(onSignIn)}>
          <label>メールアドレス</label>
          <br />
          <input 
            type="email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <br />
          <label>パスワード</label>
          <br />
          <input
            type="password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
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