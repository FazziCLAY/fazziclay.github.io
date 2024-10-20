const objText = null;

function updatePlayer() {
  fetch("https://fazziclay.com/api/v1/person/status/cuteTextPlayer")
        .then(response => {
            objText.innerHTML = response;
        })
}


function startCutePlayer() {
  objText = document.getElementById("cute-text-player")
  
  updatePlayer();
  
  setInterval(function() {
        updatePlayer()
    }, 1000)
}
