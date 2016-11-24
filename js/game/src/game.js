import React from 'react';
import GameView from './components/GameView'
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
let game = getParameterByName("game");

if(!game){
  window.location.assign("/games");
  return false;
}
React.render(
  <GameView dsRecord=game />,
  document.getElementById("app")
)
