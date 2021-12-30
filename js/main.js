let passInput = document.querySelector('.pass-input');
let passButton = document.querySelector('.pass-button');
let giftScreen = document.querySelector('.gift-screen');
let passScreen = document.querySelector('.pass-screen');
let giftText = document.querySelector('.gift-text');
let showHintButton = document.querySelector('.show-hint-button');
let hintModal =  document.querySelector('.hint');
let modalBackground =  document.querySelector('.modal-background');
let modalButton = document.querySelector('.modal-button');
let inputPar = document.querySelector('.input-par')


const encrypted = 'U2FsdGVkX1/4iUyDw5Nyf/yp45lndd5zNL4muyK/g8I='

showHintButton.onclick = function(event) {
  hintModal.classList.add('show');
  hintModal.classList.remove('hidden');
  modalBackground.classList.remove('hidden')
}

modalButton.onclick = function() {
  hintModal.classList.remove('show')
  hintModal.classList.add('hide');
  modalBackground.classList.add('hidden');
}

function verifyPass(pass) {
  let decrypted = CryptoJS.AES.decrypt(encrypted, pass).toString(CryptoJS.enc.Utf8);

  if(decrypted) {
    let gift = decrypted;
    console.log('success')

    passScreen.classList.remove('show')
    passScreen.classList.add('hide');

    setTimeout(function() {
      passScreen.classList.add('hidden');
      giftScreen.classList.remove('hidden')
      giftScreen.classList.remove('hide');
      giftScreen.classList.add('show');
    }, 1000);
    

    giftText.innerText = gift;
  } else {
    showHintButton.classList.remove('hidden')
    showHintButton.classList.add('show');
    passInput.value = '';
    inputPar.classList.remove('warn-input')
    setTimeout(function () {
      inputPar.classList.add('warn-input')
    }, 0.05);
  }
}

function onEnterCb() {
  let pass = passInput.value;
  verifyPass(pass);
}

passButton.onclick = onEnterCb;
document.onkeydown = function(event) {
  if(event.key == 'Enter') {
    onEnterCb();
  }
}