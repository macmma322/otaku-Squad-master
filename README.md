# otaku-Squad-master

Language set by browser and last prefered language

  <script>
// Retrieve the last language used from local storage, or use the user's browser language preference
var lastLanguage = localStorage.getItem('preferredLanguage') || (navigator.language || navigator.userLanguage);

// Redirect the user to the corresponding index page based on their language preference
switch (lastLanguage) {
  case 'bg':
    window.location.href = './Frontend/website/bg/index-bg.html';
    break;
  case 'en':
    window.location.href = './Frontend/website/en/index-en.html';
    break;
  default:
    // If the user's language is not supported, redirect to the English index page
    window.location.href = './Frontend/website/en/index-en.html';
    break;
}
  </script>
