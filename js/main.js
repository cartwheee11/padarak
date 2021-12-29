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

showHintButton.onclick = function(event) {
  hintModal.classList.add('show');
  hintModal.classList.remove('hidden');
  modalBackground.classList.remove('hidden')
  // modalBackground.classList.add('hidden')
}

modalButton.onclick = function() {
  hintModal.classList.remove('show')
  hintModal.classList.add('hide');
  modalBackground.classList.add('hidden');
}


let server = new WebSocket('ws://46.173.218.176:5051');
server.onopen = function() {

  function onEnterCb() {
    let pass = passInput.value;


    let query = { type: 'pass', data: passInput.value.toLowerCase()}
    server.send(JSON.stringify(query));
  }

  // alert('соединяние состоялосб');
  passButton.onclick = onEnterCb
  document.onkeydown = function(event) {
    if(event.key == 'Enter') {
      onEnterCb();
    }
  }
  
  // server.send('hello');
}




server.onmessage = function(message) {
  let body = JSON.parse(message.data);
  if(body.type == 'verify') {
    if(body.data.result == 'success') {
      console.log('success')
      let gift = body.data.gift;

      

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
      }, 0.05)
    }
  }
}

