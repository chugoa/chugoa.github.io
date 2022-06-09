(function () {
    var loginButton = document.getElementById('btn-login');

    function login(callback) {
        var CLIENT_ID = "297e6d3a21e6473a9012c0f4d7923218";
        var REDIRECT_URI = "https://chugoa.github.io";
        function getLoginURL(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
                '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
                '&scope=' + encodeURIComponent(scopes.join(' ')) +
                '&response_type=token';
        }
        var url = getLoginURL(['user-read-email']);

        window.addEventListener("message", function (event) {
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                callback(hash.access_token);
            }
        }, false);

        var w = window.open(url, "_self");

    }

    function getUserData(accessToken) {
        return $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
    }

    loginButton.addEventListener('click', function () {
        login(function(accessToken) {
            getUserData(accessToken)
                .then(function (response) {
                    document.getElementById('result').innerHTML = "AHHHHHHH";
                });
        });
    });
})();

