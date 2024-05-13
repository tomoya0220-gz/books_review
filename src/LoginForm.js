import React from 'react';

function LoginForm() {
  return (
    <>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginForm;