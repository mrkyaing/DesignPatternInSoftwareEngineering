// Basic client-side validation
async function validateForm() {
    const useremail = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (useremail === "" || password === "") {
        alert("Please fill in all fields.");
        return false;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }
    await verifyUser(useremail, password);
    return true;
}

async function verifyUser(useremail, password) {
    try {
        const url = "../data/user.json";
        const userResponse = await fetch(url);
        const fileUsers = userResponse.ok ? await userResponse.json() : [];
        const localUsers = JSON.parse(localStorage.getItem('movieReviewUsers') || '[]');
        const allUsers = [...fileUsers, ...localUsers];
        const user = allUsers.find(f => f.user_email?.toLowerCase() === useremail.toLowerCase() && f.password === password);

        if (user) {
            localStorage.setItem('loginUser', JSON.stringify(user));
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password");
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Unable to verify user right now.");
    }
}