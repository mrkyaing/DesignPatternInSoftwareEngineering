function getUsers() {
    try {
        const storedUsers = localStorage.getItem('movieReviewUsers');
        return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (error) {
        console.error('Unable to read saved users:', error);
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem('movieReviewUsers', JSON.stringify(users));
}

function register() {
    const userName = document.getElementById('user_name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const messageEl = document.getElementById('register-message');

    if (!userName || !email) {
        if (messageEl) {
            messageEl.textContent = 'Please enter your user name and email.';
            messageEl.style.color = 'red';
        }
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        if (messageEl) {
            messageEl.textContent = 'Please enter a valid email address.';
            messageEl.style.color = 'red';
        }
        return false;
    }

    const users = getUsers();
    const existingUser = users.find(
        (user) => user.user_name?.toLowerCase() === userName.toLowerCase() || user.user_email?.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
        if (messageEl) {
            messageEl.textContent = 'This user name or email is already registered.';
            messageEl.style.color = 'red';
        }
        return false;
    }

    const newUser = {
        id: Date.now(),
        user_name: userName,
        user_email: email,
        password: ''
    };

    users.push(newUser);
    saveUsers(users);

    if (messageEl) {
        messageEl.textContent = 'Registration successful!';
        messageEl.style.color = 'green';
    }

    document.getElementById('register-form')?.reset();
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    if (!registerForm) {
        return;
    }

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        register();
    });
});

window.register = register;
