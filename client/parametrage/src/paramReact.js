/**
 * @fileOverview Parametrage in React.js
 * To compile JSX to js, launch this in the terminal, in ./client/parametrage
 * npx babel --watch src --out-dir . --presets react-app/prod
 * Do also : browserify paramReact.js -o paramReactbundle.js
 * @author Bertrand Petit-Hédelin <bertrand@hedelin.fr>
 * @version 1.0
 * @copyright (C) 2022 Bertrand Petit-Hédelin
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
 'use strict';

var par;
var ipConfig = require("../../serveur/ipConfig.json");
var debug1 = true;

var index = Math.floor((Math.random() * 10000) + 1); // Pour identifier le client
var ws;

// Variables de parametres en local
// Elles sont nécessaires pour le traitement avant la mise à jour globale
// après validation.
// Le chargement met à jour ces données.

var directMidiON = false;
var english = false;
var reactOnPlay = false;
var shufflePatterns = false;
var nbeDeGroupesClients;

var synchoOnMidiClock = false;
var synchroLink = false;
var synchroSkini = false;
var timer;

var soundFilesPath1;

var simulatorInAseperateGroup = false;
var tempoMax;
var tempoMin;
var limiteDureeAttente;

var useRaspberries = false;
var playBufferMessage;
var raspOSCPort;
var algoGestionFifo;
var gameOSCSignals = false;

var sensorOSC = false;
var tempoSensorsInit = [0, 0, 0, 0, 0, 0, 0, 0];
var sensorsSensibilities = [0, 0, 0, 0, 0, 0, 0, 0];

var msg = { // On met des valeurs pas defaut
  type: "configuration",
  text: "ECRAN_NOIR",
  pseudo: "Anonyme",
  value: 0
}

function updateParameters() {
  // On ne récuppère que les "true" avec le querySelectorAll
  // Donc on met les status locaux à "false" avant mise à jour.
  directMidiON = false;
  english = false;
  reactOnPlay = false;
  shufflePatterns = false;
  simulatorInAseperateGroup = false;
  useRaspberries = false;
  synchoOnMidiClock = false;
  synchroLink = false;
  synchroSkini = false;
  gameOSCSignals = false;
  sensorOSC = false;

  var parameters = document.querySelectorAll('input[name="parameter"]:checked');
  parameters.forEach((checkbox) => {
    switch (checkbox.value) {
      case "directMidi":
        directMidiON = true;
        break;

      case "english":
        english = true;
        break;

      case "reactOnPlay":
        reactOnPlay = true;
        break;

      case "shufflePatterns":
        shufflePatterns = true;
        break;

      case "useRaspberries":
        useRaspberries = true;
        break;

      case "simulatorInAseperateGroup":
        simulatorInAseperateGroup = true;
        break;

      case "gameOSC":
        gameOSCSignals = true;
        break;

      case "sensorOSC":
        sensorOSC = true;
        break;

      case "synchoOnMidiClock":
        synchoOnMidiClock = true;
        break;

      case "synchroLink":
        synchroLink = true;
        break;

      case "synchroSkini":
        synchroSkini = true;
        break;

      default:
    }
  });
}

function initWSSocket(host) {

  window.resizeTo(600, 600);

  ws = new WebSocket("ws://" + host + ":" + ipConfig.websocketServeurPort);
  console.log("configurateur ws://" + host + ":" + ipConfig.websocketServeurPort);

  ws.onopen = function (event) {
    var msg = {
      type: "startSpectateur",
      text: "pieceParameters",
      id: index
    }
    console.log("ID sent to server:", msg.id);
    ws.send(JSON.stringify(msg));
  };

  //Traitement de la Réception sur le client
  ws.onmessage = function (event) {
    var msgRecu = JSON.parse(event.data);
    switch (msgRecu.type) {

      case "message":
        console.log(msgRecu);
        //document.getElementById("MessageDuServeur").innerHTML = msgRecu.value;
        break;

      case "skiniParametres":
        console.log("skiniParametres:", msgRecu.value);
        par = msgRecu.value;
        var options = {
          data: par.groupesDesSons,
          minDimensions: [9, 5],
          columns: [
            { type: 'text', width: 80, title: 'Groupe' },
            { type: 'text', width: 80, title: 'Index' },
            { type: 'text', width: 80, title: 'Type' },
            { type: 'text', width: 80, title: 'X' },
            { type: 'text', width: 80, title: 'Y' },
            { type: 'text', width: 140, title: 'Nb of El. or Tank nb' },
            { type: 'text', width: 80, title: 'Color' },
            { type: 'text', width: 80, title: 'Previous' },
            { type: 'text', width: 80, title: 'Scene' },
          ]
        };
        ReactDOM.render(<Jspreadsheet options={options} />, document.getElementById('spreadsheet'));

        // Initialiser l'affichage en fonction des parametres chargés
        if (debug1) console.log("par.directMidiON:", par.directMidiON);

        directMidiON = par.directMidiON;
        document.getElementById("directMidi").checked = directMidiON;

        english = par.english;
        document.getElementById("english").checked = english;

        reactOnPlay = par.reactOnPlay;
        document.getElementById("reactOnPlay").checked = reactOnPlay;

        shufflePatterns = par.shufflePatterns;
        document.getElementById("shufflePatterns").checked = shufflePatterns;

        simulatorInAseperateGroup = par.simulatorInAseperateGroup;
        document.getElementById("simulatorInAseperateGroup").checked = simulatorInAseperateGroup;

        useRaspberries = par.useRaspberries;
        document.getElementById("useRaspberries").checked = useRaspberries;

        gameOSCSignals = par.gameOSCSignals;
        document.getElementById("gameOSC").checked = gameOSCSignals;

        sensorOSC = par.sensorOSC;
        document.getElementById("sensorOSC").checked = sensorOSC;

        synchoOnMidiClock = par.synchoOnMidiClock;
        document.getElementById("synchoOnMidiClock").checked = synchoOnMidiClock;

        synchroLink = par.synchroLink;
        document.getElementById("synchroLink").checked = synchroLink;

        synchroSkini = par.synchroSkini;
        document.getElementById("synchroSkini").checked = synchroSkini;

        soundFilesPath1 = par.soundFilesPath1;
        document.getElementById("soundFilesPath1").value = soundFilesPath1;

        tempoMax = par.tempoMax;
        document.getElementById("tempoMax").value = tempoMax;

        tempoMin = par.tempoMin;
        document.getElementById("tempoMin").value = tempoMin;

        limiteDureeAttente = par.limiteDureeAttente;
        document.getElementById("limiteDureeAttente").value = limiteDureeAttente;

        playBufferMessage = par.playBufferMessage;
        document.getElementById("playBufferMessage").value = playBufferMessage;

        raspOSCPort = par.raspOSCPort;
        document.getElementById("raspOSCPort").value = raspOSCPort;

        nbeDeGroupesClients = par.nbeDeGroupesClients;
        document.getElementById("nbeDeGroupesClients").value = nbeDeGroupesClients;

        timer = par.timer;
        document.getElementById("timer").value = timer;

        algoGestionFifo = par.algoGestionFifo;
        document.getElementById("algoGestionFifo").value = algoGestionFifo;

        if (par.tempoSensorsInit !== undefined) {
          tempoSensorsInit = par.tempoSensorsInit;
          document.getElementById("sensorInit1").value = tempoSensorsInit[0];
          document.getElementById("sensorInit2").value = tempoSensorsInit[1];
          document.getElementById("sensorInit3").value = tempoSensorsInit[2];
          document.getElementById("sensorInit4").value = tempoSensorsInit[3];
          document.getElementById("sensorInit5").value = tempoSensorsInit[4];
          document.getElementById("sensorInit6").value = tempoSensorsInit[5];
          document.getElementById("sensorInit7").value = tempoSensorsInit[6];
          document.getElementById("sensorInit8").value = tempoSensorsInit[7];
        } else {
          tempoSensorsInit = [0, 0, 0, 0, 0, 0, 0, 0];
        }

        if (par.sensorsSensibilities !== undefined) {
          sensorsSensibilities = par.sensorsSensibilities;
          document.getElementById("sensorSensibily1").value = sensorsSensibilities[0];
          document.getElementById("sensorSensibily2").value = sensorsSensibilities[1];
          document.getElementById("sensorSensibily3").value = sensorsSensibilities[2];
          document.getElementById("sensorSensibily4").value = sensorsSensibilities[3];
          document.getElementById("sensorSensibily5").value = sensorsSensibilities[4];
          document.getElementById("sensorSensibily6").value = sensorsSensibilities[5];
          document.getElementById("sensorSensibily7").value = sensorsSensibilities[6];
          document.getElementById("sensorSensibily8").value = sensorsSensibilities[7];
        } else {
          sensorsSensibilities = [0, 0, 0, 0, 0, 0, 0, 0];
        }
        break;

      default: //console.log("Client reçoit un message inconnu", msgRecu.type);
    }
  };

  ws.onclose = function (event) {
    console.log("Client: websocket closed for :", index);
  }

  window.onbeforeunload = function () {
    msg.type = "closeSpectateur";
    msg.text = "DISCONNECT_SPECTATEUR";
    ws.send(JSON.stringify(msg));
    ws.close();
  }
}
window.initWSSocket = initWSSocket;

// Pour test, inutile sinon
/* class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return par.sessionPath;
    }

    return (
      <button onClick={() => this.setState({ liked: true })}>
        Like
      </button>
    );
  }
}
 */
class Jspreadsheet extends React.Component {
  constructor(props) {
    super(props);
    this.options = props.options;
    this.wrapper = React.createRef();
  }

  hideSomeColumns = function (obj) {
    //obj.hideColumn(2);
    //obj.hideColumn(6);
    //obj.hideColumn(8);
    //obj.hideColumn(11);
    //obj.hideColumn(12);
  }

  componentDidMount = function () {
    this.el = jspreadsheet(this.wrapper.current, this.options);
    this.hideSomeColumns(this.el);
  }

  addRow = function () {
    this.el.insertRow();
  }

  updateAll = function () {
    let param;
    param = this.el.getData();
    console.log(param);

    par.groupesDesSons = param;
    par.directMidiON = directMidiON;
    par.english = english;
    par.reactOnPlay = reactOnPlay;
    par.shufflePatterns = shufflePatterns;
    par.simulatorInAseperateGroup = simulatorInAseperateGroup;
    par.useRaspberries = useRaspberries;
    par.synchoOnMidiClock = synchoOnMidiClock;
    par.synchroLink = synchroLink;
    par.synchroSkini = synchroSkini;
    par.gameOSCSignals = gameOSCSignals;
    par.sensorOSC = sensorOSC;

    par.soundFilesPath1 = document.getElementById("soundFilesPath1").value;
    par.tempoMax = document.getElementById("tempoMax").value;
    par.tempoMin = document.getElementById("tempoMin").value;
    par.limiteDureeAttente = document.getElementById("limiteDureeAttente").value;
    par.playBufferMessage = document.getElementById("playBufferMessage").value;
    par.raspOSCPort = document.getElementById("raspOSCPort").value;
    par.nbeDeGroupesClients = document.getElementById("nbeDeGroupesClients").value;
    par.timer = document.getElementById("timer").value;
    par.algoGestionFifo = document.getElementById("algoGestionFifo").value;

    console.log("****",typeof document.getElementById("sensorInit1").value );

    if (document.getElementById("sensorInit1").value !== '') {
      par.tempoSensorsInit[0] = document.getElementById("sensorInit1").value;
      par.tempoSensorsInit[1] = document.getElementById("sensorInit2").value;
      par.tempoSensorsInit[2] = document.getElementById("sensorInit3").value;
      par.tempoSensorsInit[3] = document.getElementById("sensorInit4").value;
      par.tempoSensorsInit[4] = document.getElementById("sensorInit5").value;
      par.tempoSensorsInit[5] = document.getElementById("sensorInit6").value;
      par.tempoSensorsInit[6] = document.getElementById("sensorInit7").value;
      par.tempoSensorsInit[7] = document.getElementById("sensorInit8").value;
    } else {
      par.tempoSensorsInit = [0,0,0,0,0,0,0,0];
    }

    if (document.getElementById("sensorSensibily1").value !== '') {
      par.sensorsSensibilities[0] = document.getElementById("sensorSensibily1").value;
      par.sensorsSensibilities[1] = document.getElementById("sensorSensibily2").value;
      par.sensorsSensibilities[2] = document.getElementById("sensorSensibily3").value;
      par.sensorsSensibilities[3] = document.getElementById("sensorSensibily4").value;
      par.sensorsSensibilities[4] = document.getElementById("sensorSensibily5").value;
      par.sensorsSensibilities[5] = document.getElementById("sensorSensibily6").value;
      par.sensorsSensibilities[6] = document.getElementById("sensorSensibily7").value;
      par.sensorsSensibilities[7] = document.getElementById("sensorSensibily8").value;
    } else {
      par.sensorsSensibilities = [0,0,0,0,0,0,0,0];
    }

    var msg = {
      type: "updateParameters",
      data: par
    }
    ws.send(JSON.stringify(msg));
  }

  render() {
    return (
      <div>
        <div ref={this.wrapper} />
        <br />
        <input
          className="button"
          type="button"
          value="Add new row"
          onClick={() => this.addRow()}
        />
        <input
          className="button"
          type="button"
          value="Update parameters"
          onClick={
            () => {
              updateParameters();
              this.updateAll();
            }
          }
        />
      </div>
    );
  }
}

/* 
let domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<LikeButton />, domContainer);
 */