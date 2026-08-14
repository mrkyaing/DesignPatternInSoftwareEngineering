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
    const password = document.getElementById('password')?.value.trim();
    const confirm_password = document.getElementById('confirm-password')?.value.trim();
    const messageEl = document.getElementById('register-message');

    if (!userName || !email || !password) {
        if (messageEl) {
            messageEl.textContent = 'Please enter your user name, email, and password.';
            messageEl.style.color = 'red';
        }
        return false;
    }
 if (password!==confirm_password) {
        if (messageEl) {
            messageEl.textContent = 'password and confrim password does not match.';
            messageEl.style.color = 'red';
        }
        return false;
    }
    if (password.length < 6) {
        if (messageEl) {
            messageEl.textContent = 'Password must be at least 6 characters long.';
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
        password: password
    };

    users.push(newUser);
    saveUsers(users);

    try {
        const existingFileUsers = JSON.parse(localStorage.getItem('movieReviewUsers') || '[]');
        const mergedUsers = [...existingFileUsers];
        const alreadyExists = mergedUsers.some((user) => user.user_email?.toLowerCase() === email.toLowerCase());
        if (!alreadyExists) {
            mergedUsers.push(newUser);
            localStorage.setItem('movieReviewUsers', JSON.stringify(mergedUsers));
        }
    } catch (error) {
        console.error('Unable to persist newly registered user to app storage:', error);
    }

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
