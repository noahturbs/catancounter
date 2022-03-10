//<body class="vsc-initialized" style="background-color: rgb(50, 141, 192); overflow: hidden;">

//<div class="game_chat_text_div" id="game-log-text"
//<div class="message_post" id="" style="color: rgb(226, 113, 116);"><img src="../dist/images/ic...
let settlementsDone= false
let playerList = []// array of player. example: [["noah", 1 , 2, 3, 0, 0, 0]...]
let playerNamesList = []

class player {
  constructor(name) {
    this.name=name;
    lumber=0;
    brick=0;
    wool=0;
    wheat=0;
    ore=0;
    unknown=0;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100

let targetNode = document.getElementById('game-log-text');
const config = {subtree: true, childList: true, attributeFilter: [ "message_post" ] } //attributeFilter:true An array of specific attribute names to be monitored.
let observer;

const callback = function(mutationsList, observer) {

    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            //console.log('A child node has been added or removed.');

            exploreNodes(mutation.addedNodes);//innerHTML
        }
    }
};

//const targetNode = document.querySelector('vsc-initialized');

const wait_until_element_appear = setInterval(() => {
  targetNode = document.getElementById('game-log-text');
    if ( targetNode != null ) {

        console.log("game has started! now find settlements being placed.");
        gameStart();

        clearInterval(wait_until_element_appear);

    }
}, 5000);

function gameStart() {
  observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
          //do mutation observer with targetNode!
}



function exploreNodes(NodeList){
  //let's travel through the node list!


  //check if string contains the keyword: "rolled:".?


if (!settlementsDone){//then let's populate the playerlist.

  findReceivedStarting(NodeList);

}//if (!settlementsDone)

}//function exploreNodes


function findReceivedStarting(NodeList){
  for (let i = 0; i<NodeList.length; i++){

  console.log(String(NodeList[i].innerHTML)); //innertext
  if(String(NodeList[i].innerHTML).includes("received starting resources:")){

    receivedStarting(NodeList[i]); //finds name, and inserts it into players[]. also finds starting resources in hand.


    //check if string contains the keyword: "rolled:"
    //<img src="../dist/images/icon_player.svg?v127" alt="Guest" height="20" width="20">
    //noa#7878 received starting resources:  <img src="../dist/images/card_ore.svg?v127"
    // alt="ore" height="20" width="14.25" class="lobby-chat-text-icon">
    //<img src="../dist/images/card_grain.svg?v127" alt="grain" height="20" width="14.25"
    //class="lobby-chat-text-icon"><img src="../dist/images/card_ore.svg?v127" alt="ore" height="20" width="14.25"
    // class="lobby-chat-text-icon">

    //<img src="../dist/images/icon_player.svg?v127" alt="Guest" height="20" width="20">noa#7878 received starting resources:  <img src="../dist/images/card_brick.svg?v127" alt="brick" height="20" width="14.25" class="lobby-chat-text-icon"><img src="../dist/images/card_wool.svg?v127" alt="wool" height="20" width="14.25" class="lobby-chat-text-icon"><img src="../dist/images/card_brick.svg?v127" alt="brick" height="20" width="14.25" class="lobby-chat-text-icon">
  }


}//for loop

}//function findReceivedStarting

function receivedStarting(Node){
  let re1=new RegExp(">(.*) received");
  let playernamestring=re1.exec(String(Node.innerHTML));
  console.log(playernamestring[1]);





  let tempplayer = new player(playernamestring[1]);
  //TODO: CHECK W/ REGEX FOR THE STARTING RESOURCES. AND GIVE PLAYERS THOSE RESOURCES.
  //THEN PUSH IT INTO THE ARRAY, AS PART OF AN ARRAY.
  addResources(Node, tempplayer);



  players.push(playernamestring[1]);
  console.log([players]);
  //TODO: CHECK W/ REGEX FOR THE STARTING RESOURCES. AND GIVE PLAYERS THOSE RESOURCES.
  //TODO: check for "rolled:"?

}//function receivedStarting

function addResources(Node, tempplayer){
  (\"lumber\"|\"brick\"|\"wool\"|\"wheat\"|\"ore\")
  //TODO: FINISH THIS!!!!!!!
}

//textContent gives... 'noa#7878 rolled a:'... 'noa#7878 got:'
//textContent doesn't give info about images.
//innerHTML does things well, but maybe a bit too much info.

//No player to steal from     //do nothing. done?

//Baylor#2382 used Year of Plenty card year of plenty
//Baylor#2382 took from bank: ore ore

//noa#7878 used Monopoly card monopoly
//noa#7878 stole 8: grain       //yep. try to gather more info on this.
//(monopoly dosen't seem give rich details for stolen resources.)

//You stole: brick from: noa#7878
//Baylor#2382 stole: grain from you

//You stole: wool from: Li
//this was in red!
//(You's color)

//Li stole: wool from you
//this was in blue
//(Li's color)



//Baylor#2382 gave bank: oreore and took brick  //keywords Player... gave bank .... resources... took resources...
//Baylor#2382 gave bank: woolwoolwoolwool and took ore  //see above
//Baylor#2382 traded: ore for: grain with: noa#7878
//Baylor#2382 traded: lumberfor: brickbrickgraingrain with: noa#7878
//noa#7878 discarded: brickbrickbrickwoolwoolwoolwoolgraingraingraingraingrain

//Baylor#2382 built a road
//Baylor#2382 built a settlement: +1 VP
//noa#7878 built a city: +1 VP
//Baylor#2382 bought development card

//grain: Not enough in bank to distribute

//Baylor#2382 used Road Building card road building
//GuestBaylor#2382 placed a road
//GuestBaylor#2382 placed a road
