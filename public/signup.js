document.addEventListener('DOMContentLoaded', function () {
    window.signup = function () {
        var usernameInput = document.getElementById('username');
        var passwordInput = document.getElementById('password');

        var username = usernameInput.value;
        var password = passwordInput.value;

        if (username.trim() !== '' && password.trim() !== '') {
            fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password: password }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('User signed up successfully');
                console.log('index.html');
                window.location.href = '/index.html';
            });
        } else {
            alert('Username and password are required');
        }

        usernameInput.value = '';
        passwordInput.value = '';
    };
});
