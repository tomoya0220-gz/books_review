import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { url } from '../src/const';

describe('User API', () => {
  it('creates a user successfully', async () => {
    const mock = new MockAdapter(axios);
    const userData = {
      name: 'John',
      email: 'john@example.com',
      password: 'pass0123'
    };

    mock.onPost(`${url}/users`).reply(200, {
      message: 'ユーザー作成に成功',
      user: { ...userData, id:1 }
    });

    const response = await axios.post(`${url}/users`, userData);

    expect(response.data).toEqual({
      message: 'ユーザー作成に成功',
      user: expect.objectContaining({
        name: 'John',
        email: 'john@example.com',
        password: 'pass0123'
      })
    });

    expect(response.status).toBe(200);
  });

  it('ユーザー作成に失敗', async() => {
    const mock = new MockAdapter(axios);
    const userData = {
      name: 'John',
      email: 'john@example.com',
      password: 'pass0123'
    };

    mock.onPost(`${url}/user`).networkError();

    await expect(axios.post(`${url}/users`, userData)).rejects.toThrow('エラー');
  });
});