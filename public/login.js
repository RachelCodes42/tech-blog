const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const signupForm = document.getElementById('signup-form');
const signupBtn = document.getElementById('signup-btn');

const loginHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      loggedIn = true;
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
      console.log(username, password);
    }
  }
};

const signupHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
}

loginBtn.addEventListener('click', loginHandler);
signupBtn.addEventListener('click', signupHandler);