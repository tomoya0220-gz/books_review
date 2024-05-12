describe('Login API Test', () => {
  it('should authenticate the user', () => {
    const loginDetails = {
      email: 'user@example.com',
      password: 'yourPassword'
    }

    cy.request({
      method: 'POST',
      url: 'https://railway.bookreview.techtrain.dev/signin',
      body: loginDetails,
    headers: {
      'Content-Type': 'application/json'
    }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});