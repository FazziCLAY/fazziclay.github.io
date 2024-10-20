var objText = null;

function updatePlayer() {
  fetch("https://fazziclay.com/api/v1/person/status/cuteTextPlayer")
        .then(response => {
            response.text().then(txt => {
              objText.innerHTML = txt
            })
        })
}


function startCutePlayer() {
  objText = document.getElementById("cute-text-player")
  
  updatePlayer();
  
  setInterval(function() {
        updatePlayer()
    }, 1000)
}
