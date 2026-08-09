// Basic client-side validation
        function validateForm() {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username === "" || password === "") {
                alert("Please fill in all fields.");
                return false;
            }
            if (password.length < 6) {
                alert("Password must be at least 6 characters long.");
                return false;
            }
            return true;
        }