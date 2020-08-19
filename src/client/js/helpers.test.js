//DOM Manipulation Test
test('Check validateForm able add was-validated to form', () => {
  document.body.innerHTML = `
    <form class="enter needs-validation" novalidate>
      <input id="user-url" type="text" value="" placeholder="The URL should start with https:// or http://" pattern="[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)" required>
      <div class="validation-text"></div>
      <button id="evaluate-page" type="button" >Evaluate Page</button>
    </form>
  `;

  const {validateForm} = require('./helpers.js');

  const inputForm = document.querySelector('.needs-validation');
  const userUrlInput = document.getElementById('user-url');
  const analyseButton = document.getElementById('evaluate-page');

  userUrlInput.value = 'test';
  analyseButton.addEventListener('click', (evt)=>{
    validateForm(evt) 
  });
  analyseButton.click();

  expect(inputForm.classList.contains('was-validated')).toBeTruthy();
});

