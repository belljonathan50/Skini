var violon1, violon2, violon3, tick, stopTankViolon, groupePercuON, stopTankPiano, groupeTrompetteON, groupeTrompetteOFF, groupePercuOFF, tankViolon, tankPiano, piano1, piano2, piano3;



  var mr = require("./myReact.min.js");
    mr.createSignal("violon1");
  mr.createSignal("violon2");
  mr.createSignal("violon3");
  mr.createSignal("stopTankViolon");
  mr.createSignal("stopTankPiano");
  mr.createSignal("groupeTrompetteON");
  mr.createSignal("groupeTrompetteOFF");
  mr.createSignal("groupePercuON");
  mr.createSignal("groupePercuOFF");

    // Debut de module
    tankViolon = [

      // Debut de abort
      mr._abort("stopTankViolon",1,
        [
      mr._atom( ()=> {console.log('Attend violon1');} ),
      mr._await("violon1", 1),

      mr._atom( ()=> {console.log('Attend violon2');} ),
      mr._await("violon2", 1),

      mr._atom( ()=> {console.log('Attend violon3');} ),
      mr._await("violon3", 1),
    ]
      ),

    ];

    // Debut de module
    tankPiano = [

      // Debut de abort
      mr._abort("stopTankPiano",1,
        [
      mr._atom( ()=> {console.log('Attend piano1');} ),
      mr._await("piano1", 1),

      mr._atom( ()=> {console.log('Attend piano2');} ),
      mr._await("piano2", 1),

      mr._atom( ()=> {console.log('Attend piano3');} ),
      mr._await("piano3", 1),
    ]
      ),

    ];

  var instructions = [
    // Debut de par
    mr._par(
      [
      // Debut de seq
      mr._seq(
        [
      mr._atom( ()=> {console.log('Début orchestration');} ),

      mr._emit("groupePercuON",0),mr._await("tick", 5),

      mr._atom( ()=> {console.log('Après 5 ticks');} ),

        // Debut de par
        mr._par(
          [
          // Debut de par
          mr._par(
            [
            // Debut de run module
              mr._run(tankViolon),

            // Debut de seq
            mr._seq(
              [  mr._await("tick", 5),

            mr._atom( ()=> {console.log('Après 5 ticks violon');} ),

            mr._emit("stopTankViolon",0),]
            ),
            ]
          ),

          // Debut de par
          mr._par(
            [
            // Debut de run module
              mr._run(tankPiano),

            // Debut de seq
            mr._seq(
              [  mr._await("tick", 5),

            mr._atom( ()=> {console.log('Après 5 ticks piano');} ),

            mr._emit("stopTankPiano",0),]
            ),
            ]
          ),
          ]
        ),

      mr._emit("groupePercuOFF",0),
      mr._emit("groupeTrompetteON",0),mr._await("tick", 5),

      mr._emit("groupeTrompetteOFF",0),
      mr._atom( ()=> {console.log('Fin orchestration');} ),
    ]
      ),

      // Debut de every
      mr._every("tick",1,
        [
      mr._atom( ()=> {console.log('tick');} ),
    ]
      ),
      ]
    ),
    ];

  var prog = mr.createModule(instructions);

 mr.addEventListener("groupePercuON", ()=> {console.log("*** groupePercuON")});
mr.addEventListener("groupeTrompetteON", ()=> {console.log("*** groupeTrompetteON")});

mr.addEventListener("groupePercuOFF", ()=> {console.log("*** groupePercuOFF")});
mr.addEventListener("groupeTrompetteOFF", ()=> {console.log("*** groupeTrompetteOFF")});

mr.addEventListener("stopTankViolon", ()=> {console.log("*** emit stopTankViolon")});
mr.addEventListener("stopTankPiano", ()=> {console.log("*** emit stopTankPiano")});

// Fin du programme -----------------------
console.log(" ** testOrchestration1 **");
var currentTime = Date.now();

console.log(" 1 ----------------");
for(var i=0; i < 5; i++){
  mr.activateSignal("tick", 1);
  mr.runProg(prog);
}
var currentTimeNew = Date.now();
console.log("Durée du prog:", currentTimeNew - currentTime, "ms" );

console.log(" 2 ----------------");
for(var i=0; i < 6; i++){
  mr.activateSignal("tick", 1);
  mr.runProg(prog);
}

  mr.activateSignal("violon1", 1);
  mr.runProg(prog);

  mr.activateSignal("piano1", 1);
  mr.activateSignal("violon2", 1);
  mr.runProg(prog);

  mr.activateSignal("violon3", 1);
  mr.runProg(prog);

console.log(" 3 ----------------");
for(var i=0; i < 6; i++){
  mr.activateSignal("tick", 1);
  mr.runProg(prog);
}