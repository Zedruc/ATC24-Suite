var url_string = window.location.href;
var url = new URL(url_string);
/* var username = url.searchParams.get('username');
var key = url.searchParams.get('key'); */

let redirectURI = 'https://api.zedruc.net/atc24-suite/discord_auth';
/* if (username && key) {
  redirectURI = `https://api.zedruc.net/atc24-suite/discord_auth?username=${username}&key=${key}`;
} */
if (window.location.hostname == 'localhost')
  redirectURI = 'http://127.0.0.1:80/atc24-suite/discord_auth';
if (window.location.hostname == '127.0.0.1')
  redirectURI = 'http://127.0.0.1:80/atc24-suite/discord_auth';

window.DISCORD_OAUTH2_URI = `https://discord.com/oauth2/authorize?client_id=1209189388429561858&response_type=code&redirect_uri=${encodeURIComponent(
  redirectURI
)}&scope=identify`;
