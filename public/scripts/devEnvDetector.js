let isDevEnvironment =
  window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1';
console.log(isDevEnvironment);
if (isDevEnvironment == false) {
  window.__log = console.log;
  window.__enable_log = () => {
    console.log = window.__log;
  };
  console.log = () => {};
}
