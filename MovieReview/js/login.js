let allUsers = [];
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
        const userResponse = await fetch('../data/user.json');
        if (!userResponse.ok) {
            throw new Error("Unable to load user.json");
        }
        //verify the process with user's input to user.json
        var isValid = allUsers.filter((f) => f.user_email == useremail && f.password === password)
        if (isValid) {
            window.location.href = "index.html";
        } else {
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error(error);
    }
}