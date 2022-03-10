//<div class="game_chat_text_div" id="game-log-text"
//<div class="message_post" id="" style="color: rgb(226, 113, 116);"><img src="../dist/images/ic...
let settlementsDone= false
let players = []// array of string of player names.

waitForElm('.game_chat_text_div').then((elm) => {
    console.log('Detected game chat log. Now waiting for settlements to be placed.');
    console.log(elm);
    //call a function here, and it will run after the game chat log has been found.

    settlementsPhase();
});



function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const startObserver = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                console.log("disconnected")
                startObserver.disconnect();
            }
        });

        startObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    });

}// function waitForElm(seclector)


   //let observer = new MutationObserver(callback); //callback is called everytime the DOM is changed!
   var config = {
     childList: true,
     subtree: true
   }



while(true){

  setInterval(tryoberserver, milliseconds);
  continue;


function()
try{


}
catch(error){
  console.error(error)
}









   //"noa#7878 placed a [settlement image]"
   //"noa#7878 placed a  [road image]"
   //
   //"noa#7878 placed a [settlement image]"
   //"noa#7878 placed a  [road image]"
   //"noa#7878 received starting resources: img img img"


   //"noa#7878 rolled: "
   //GAME HAS STARTED!
   //"noa#7878 got: img img etc."


//OKAY, SO SETTLEMENTS ARE BEING PLACED.
//NOTE PLAYER NAMES. IF A PLAYER NAME IS ALREADY RECORDED, THEN BREAK OR SKIP.
//put player names into players [].


//IF THEY KEYWORD 'ROLLED' HAPPENS, THEN WE STOP DATA COLLECTION.
