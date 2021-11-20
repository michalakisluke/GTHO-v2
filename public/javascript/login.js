async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    var userStatus = null;

    git
    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // check response status 
        if (response.ok) {
            userStatus = loggedin;
        } else {
            $("#password").effect("shake");
        }
    }
};

$(".search-button").on("click", function(event) {
    event.preventDefault();
    zip = $("#user-zip").val().trim();
    if (zip.length !== 5) {
        $("#user-zip").effect("shake");
        return;
    } else {
        localTempApiFetch();
        $("#spinner").removeAttr("hidden");
        $("#location").attr("hidden", true);
        $(".down-button").attr("hidden", true);
    }
});