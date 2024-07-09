$(document).ready(function() {
    function getUsersFromLocalStorage() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    function saveUsersToLocalStorage(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    $("#signupForm").on("submit", function(event) {
        event.preventDefault();
        const email = $("#signupEmail").val();
        const username = $("#signupUsername").val();
        const password = $("#signupPassword").val();
        const confirmPassword = $("#confirmPassword").val();
        const users = getUsersFromLocalStorage();

        if (password !== confirmPassword) {
            $("#signupError").text("Passwords do not match.");
            return;
        }

        if (users.find(u => u.username === username)) {
            $("#signupError").text("Username already exists.");
        } else {
            users.push({ email, username, password });
            saveUsersToLocalStorage(users);
            $("#signupError").text("Signup successful!");
        }
    });

    $("#loginForm").on("submit", function(event) {
        event.preventDefault();
        const username = $("#loginUsername").val();
        const password = $("#loginPassword").val();
        const users = getUsersFromLocalStorage();
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            $("#loginError").text("Invalid username or password.");
        }
    });
});
