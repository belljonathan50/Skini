
// Generated by Skini: Fri Oct 28 2022 13:33:36 GMT+0200 (Central European Summer Time)
"use strict"

var midiConfig = require("../serveur/midiConfig.json");

var countBusOUT = 0;
for (var i = 0; i < midiConfig.length; i++) {
  if (midiConfig[i].type === "OUT") {
    if (midiConfig[i].spec === "clipToDAW") {
      exports.busMidiDAW = countBusOUT;
    }
    countBusOUT++;
  }
}

// Piece Bitwig en OSC si la paramètre est false
// Sinon Skini parle MIDI
exports.directMidiON = true;

// Pour charger les fonctions et modules de scenes de type GOLEM
exports.scenesON = false;

exports.english = true;

/***********************************
  Paramètres du simulateur
  Si ces valeurs ne sont pas données c'est celle qui
  sont dans le simulateur qui sont utilisées
************************************/
exports.tempoMax = 500; // En ms
exports.tempoMin = 500; // En ms
exports.limiteDureeAttente = 33; // En pulsations

/********************************************************
AUTOMATE
*********************************************************/
// Pour un automate conforme à un rechargement selon les déclarations de module HipHop
exports.reactOnPlay = false;

/*************************************
CHEMIN DES FICHIERS SONS MP3 pour les clients
Le choix se fait sur le client en fonction d'abletonON donc 
de la pièce choisie dans la contrôleur.
Nom du sous répartoire ./sounds/xxxx
*************************************/
exports.soundFilesPath1 = "";

/***************************************
CHEMIN DES PARTITIONS DES PATTERNS ET CONFIG AVEC MUSICIENS
****************************************/
exports.avecMusicien = false; // Pour mettre en place les spécificités au jeu avec des musiciens.
exports.decalageFIFOavecMusicien = 4; // Décalage de la FIFO vide avant le premier pattern dans une FIFO.
exports.patternScorePath1 ="";

/****************************************
ACTIVATION D'ALGORITHME D'ORGANISATION DES FIFOs
Si 0 ou undefined pas d'algorithme.
Si 1 algorithme de réorganisation Début, Milieu, Fin, Neutre (DFMN)
Dans le csv, D -> 1, M -> 2, F->3, N->4 (c'est fixé dans controleAbleton.js)
Si autre ... à créer...
ATTENTION: NE JAMAIS UTILISER EN SITUATION D'INTERACTION SI L'ALGORITHME
PEUT SUPPRIMER DES PATTERNS DES FIFOs
*****************************************/
exports.algoGestionFifo = 0;
exports.shufflePatterns = false;
/*****************************************************************************

Gestion de la Matrice des possibles
Automate de gestion de la matrice des possibles

******************************************************************************/
exports.nbeDeGroupesClients = 3;

function setnbeDeGroupesClients(num) {
  this.nbeDeGroupesClients = num;
}
exports.setnbeDeGroupesClients = setnbeDeGroupesClients;

exports.simulatorInAseperateGroup = false; // Si true, le dernier groupe client est réservé au simulateur.

// Pour un contrôle des Raspberries
exports.useRaspberries = false;
exports.playBufferMessage = "test";
exports.raspOSCPort = 4000;

// La synchro Midi, Link. Synchro Bitwig OSC par défaut si Midi et Link false.
exports.synchoOnMidiClock = false;
exports.synchroLink = true;
exports.synchroSkini = false;
exports.timer = 500;
exports.gameOSCSignals = false;

exports.sensorOSC = false;
exports.tempoSensorsInit = [0,0,0,0,0,0,0,0];
exports.sensorsSensibilities = [0,0,0,0,0,0,0,0];

const groupesDesSons = [
  [ "voice",1, "group",170,100,20,"#CF1919",[],1 ],
  [ "harp",2, "group",20,540,20,"#008CBA",[],1 ],
  [ "percu",3, "group",170,580,20,"#4CAF50",[],1 ],
  [ "piano",4, "group",350,100,20,"#5F6262",[],1 ],
  [ "flute",5, "group",350,100,20,"#5F6262",[],1 ],
  [ "groupe6",6, "group",20,20,20,"#5F6262",[],1 ],
  [ "groupe7",7, "group",20,20,20,"#5F6262",[], ],
  [ "groupe8",8, "group",220,220,20,"#4F6262",[], ],
  [ "groupe9",9, "group",170,100,20,"#CF1919",[], ],
  [ "groupe10",10, "group",20,540,20,"#008CBA",[], ],
  [ "groupe11",11, "group",170,580,20,"#4CAF50",[], ],
  [ "groupe12",12, "group",350,100,20,"#5F6262",[], ],
  [ "groupe13",13, "group",350,100,20,"#5F6262",[], ],
  [ "groupe14",14, "group",20,20,20,"#5F6262",[], ],
  [ "groupe15",15, "group",20,20,20,"#5F6262",[], ],
  [ "groupe16",16, "group",220,220,20,"#4F6262",[], ],
  [ "groupe17",17, "group",170,100,20,"#CF1919",[], ],
  [ "groupe18",18, "group",20,540,20,"#008CBA",[], ],
  [ "groupe19",19, "group",170,580,20,"#4CAF50",[], ],
  [ "groupe20",20, "group",350,100,20,"#5F6262",[], ],
  [ "groupe21",21, "group",350,100,20,"#5F6262",[], ],
  [ "groupe22",22, "group",20,20,20,"#5F6262",[], ],
  [ "groupe23",23, "group",20,20,20,"#5F6262",[], ],
  [ "groupe24",24, "group",220,220,20,"#4F6262",[], ],
  [ "groupe25",25, "group",170,100,20,"#CF1919",[], ],
  [ "groupe26",26, "group",20,540,20,"#008CBA",[], ],
  [ "groupe27",27, "group",170,580,20,"#4CAF50",[], ],
  [ "groupe28",28, "group",350,100,20,"#5F6262",[], ],
  [ "groupe29",29, "group",350,100,20,"#5F6262",[], ],
  [ "groupe30",30, "group",20,20,20,"#5F6262",[], ],
  [ "groupe31",31, "group",20,20,20,"#5F6262",[], ],
  [ "groupe100",100, "group",20,20,20,"#5F6262",[], ],
  [ "",, "",,,,"",[], ],
  ];
exports.groupesDesSons = groupesDesSons;
