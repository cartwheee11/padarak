


let passInput = document.querySelector('.pass-input');
let passButton = document.querySelector('.pass-button');
let giftScreen = document.querySelector('.gift-screen');
let passScreen = document.querySelector('.pass-screen');
let giftText = document.querySelector('.gift-text');



let server = new WebSocket('ws://localhost:5051');
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
      console.log('fail')

    }
  }
}

