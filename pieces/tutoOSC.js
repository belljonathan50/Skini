
// Generated by Skini: Tue Sep 27 2022 12:52:46 GMT+0200 (heure d’été d’Europe centrale)
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

exports.english = false;

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
exports.raspOSCPort = 1010;

// La synchro Midi, Link. Synchro Bitwig OSC par défaut si Midi et Link false.
exports.synchoOnMidiClock = false;
exports.synchroLink = true;
exports.synchroSkini = false;
exports.timer = 500;
exports.gameOSCSignals = true;

exports.sensorOSC = false;
exports.tempoSensorsInit = [0,0,0,0,0,0,0,0];
exports.sensorsSensibilities = [5,5,5,5,5,5,5,5];

const groupesDesSons = [
  [ "groupe0",0, "group",170,100,20,"#CF1919",[],1 ],
  [ "groupe1",1, "group",200,200,20,"#CF1919",[],1 ],
  [ "groupe2",2, "group",300,300,20,"#CF1919",[],1 ],
  ];
exports.groupesDesSons = groupesDesSons;
