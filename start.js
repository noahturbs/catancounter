let settlementsDone= false
let playerList = []// array of player. example: [["noah", 1 , 2, 3, 0, 0, 0]...]

class player {
  constructor(name,color) {

    this.name=name;
    this.color=color;
    this.lumber=0;
    this.brick=0;
    this.wool=0;
    this.grain=0;
    this.ore=0;
    this.unknown=0;
    this.totalsize=0;
  }
}

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
}, 2000);

function gameStart() {
  observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
          //do mutation observer with targetNode!
}

function exploreNodes(NodeList) {
  //this gets called whenever the observerlist changes. it's basically whenever an event occurs.
  //let's travel through the node list!

  //check if string contains the keyword: "rolled:".?
  processNodes(NodeList);


}//function exploreNodes


function processNodes(NodeList){

  for (let i = 0; i<NodeList.length; i++){

    switch(true){


      case (String(NodeList[i].innerHTML).includes("rolled:") && !settlementsDone):
        //now add UI to window!
        playerList.reverse(); //preps the the player list to be ordered correcetly
        reorderList();
        //reorder list here
        createTable();
        settlementsDone=true;
        return;

      case (String(NodeList[i].innerHTML).includes("received starting resources:")):
        receivedStarting(NodeList,i); //finds name, and inserts it into players[]. also finds starting resources in hand
        return;

      case (String(NodeList[i].innerHTML).includes(" got: ")):
        processGot(NodeList[i]); //process keyword " got: " and adds it to the player's hand.
        deleteTable();
        createTable();
        return;

      case (String(NodeList[i].innerHTML).includes(" took from bank: ")):
        processGot(NodeList[i]); // happens when year of plenty occurs, adds resources to the player's hand.
        deleteTable();
        createTable();
        return;

      case (String(NodeList[i].innerHTML).includes(" built a ")):
        processBuilt(NodeList[i]); //process keyword " built a " this can be road, settlement, city. subtracts mats from hand
        deleteTable();
        resetIfHandsEmpty();
        createTable();
        return;

      case (String(NodeList[i].innerHTML).includes(" bought ")):
        processBought(NodeList[i]); //process keyword " bought " [dev card]. subtracts mats from hand
        deleteTable();
        resetIfHandsEmpty();
        createTable();
        return;

      case (String(NodeList[i].innerHTML).includes(" stole") && String(NodeList[i].innerHTML).includes(" from")):
        processStole(NodeList[i]); //process keyword " stole " [dev card]. has to process 'you' within the method as well.
        deleteTable();
        resetIfHandsEmpty();
        createTable();
        return;

      case (String(NodeList[i].innerHTML).includes(" traded:") && String(NodeList[i].innerHTML).includes("for: ")&& String(NodeList[i].innerHTML).includes("with:")):
        processTrade(NodeList[i]); //process keyword " traded "
        deleteTable();
        createTable();
        return;

      case (String(NodeList[i].innerHTML).includes(" gave bank:") && String(NodeList[i].innerHTML).includes("and took")):
        processBank(NodeList[i]); //process keyword " gave bank".  port trades use the same language!
        deleteTable();
        createTable();
        return;

      case (String(NodeList[i].innerHTML).includes("discarded:")):
        processDiscarded(NodeList[i]); //process keyword " gave bank".  port trades use the same language!
        deleteTable();
        createTable();
        return;
      case (String(NodeList[i].innerHTML).includes(" stole ")):
        //TODO. monopoly.
        processMonopoly(NodeList[i]); //process keyword " stole ".  this is when a monopoly is triggered!
        deleteTable();
        resetIfHandsEmpty();
        createTable();
        return;
      case (String(NodeList[i].innerHTML).includes(" won the game!")):
        deleteTable();
        playerList=[];

      }//switch
    }//for
}//processNodes function


    //<img src="../dist/images/icon_player.svg?v127" alt="Guest" height="20" width="20">noa#7878 received starting resources:  <img src="../dist/images/card_brick.svg?v127" alt="brick" height="20" width="14.25" class="lobby-chat-text-icon"><img src="../dist/images/card_wool.svg?v127" alt="wool" height="20" width="14.25" class="lobby-chat-text-icon"><img src="../dist/images/card_brick.svg?v127" alt="brick" height="20" width="14.25" class="lobby-chat-text-icon">

function deleteTable(){
  var child = document.getElementById('table1');
  child.parentNode.removeChild(child);
}

function createTable(){
  var canvas = document.getElementsByClassName('canvas');
  var table = document.createElement('table');
  table.setAttribute('id','table1');

  var imglumber = document.createElement('img');
  imglumber.src = "../dist/images/card_lumber.svg?v129";
  imglumber.setAttribute('height','30');
  imglumber.setAttribute('width','21.375');

  var imgbrick = document.createElement('img');
  imgbrick.src = "../dist/images/card_brick.svg?v129";
  imgbrick.setAttribute('height','30');
  imgbrick.setAttribute('width','21.375');

  var imgwool = document.createElement('img');
  imgwool.src = "../dist/images/card_wool.svg?v129";
  imgwool.setAttribute('height','30');
  imgwool.setAttribute('width','21.375');

  var imggrain = document.createElement('img');
  imggrain.src = "../dist/images/card_grain.svg?v129";
  imggrain.setAttribute('height','30');
  imggrain.setAttribute('width','21.375');

  var imgore = document.createElement('img');
  imgore.src = "../dist/images/card_ore.svg?v129";
  imgore.setAttribute('height','30');
  imgore.setAttribute('width','21.375');


  var imgunknown = document.createElement('img');
  imgunknown.src = "../dist/images/card_rescardback.svg?v129";
  imgunknown.setAttribute('height','30');
  imgunknown.setAttribute('width','21.375');

  var tr = document.createElement('tr');
  var tdname=document.createElement('td');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  var td5 = document.createElement('td');
  var td6 = document.createElement('td');

  var text = document.createTextNode('Names:');

  tdname.appendChild(text);

  td1.appendChild(imglumber);
  td2.appendChild(imgbrick);
  td3.appendChild(imgwool);
  td4.appendChild(imggrain);
  td5.appendChild(imgore);
  td6.appendChild(imgunknown);

  tr.appendChild(tdname);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);

  table.appendChild(tr);

  for(var j = 0; j < playerList.length; j++){
    appendrow(j,table);

    }//for loop
  document.getElementsByTagName('body')[0].appendChild(table);
}//function createTable

function appendrow(j,table){

  let newRow = table.insertRow(-1);

  let newCell = newRow.insertCell(0);
  let newText = document.createTextNode(playerList[j].name);
  newCell.appendChild(newText);

  let newCell1 = newRow.insertCell(1);
  let newText1 = document.createTextNode(playerList[j].lumber);
  newCell1.appendChild(newText1);

  let newCell2 = newRow.insertCell(2);
  let newText2 = document.createTextNode(playerList[j].brick);
  newCell2.appendChild(newText2);

  let newCell3 = newRow.insertCell(3);
  let newText3 = document.createTextNode(playerList[j].wool);
  newCell3.appendChild(newText3);

  let newCell4 = newRow.insertCell(4);
  let newText4 = document.createTextNode(playerList[j].grain);
  newCell4.appendChild(newText4);

  let newCell5 = newRow.insertCell(5);
  let newText5 = document.createTextNode(playerList[j].ore);
  newCell5.appendChild(newText5);

  let newCell6 = newRow.insertCell(6);
  let newText6 = document.createTextNode(playerList[j].unknown);
  newCell6.appendChild(newText6);
}

function receivedStarting(NodeList, i){//gets called when "received starting resources:" is found.
  //<div class="message_post" id="" style="color: rgb(226, 113, 116);"><img src="../dist/images/icon_player.svg?v127" alt="Guest" height="20" width="20">noa#7878 placed a <img src="../dist/images/road_red.svg?v127" alt="road" height="20" width="20" class="lobby-chat-text-icon"></div>
  Node=NodeList[i];
  playerRGB = window.getComputedStyle(Node).color
  let re1=new RegExp(">(.*) received");

  let playernamestring=re1.exec(String(Node.innerHTML));
  //console.log(playernamestring[1]);

  //this is name!

  let tempplayer = new player(playernamestring[1], playerRGB);
  //console.log(String(Node.innerHTML));
  //welp, now count how many alt="lumber" is in Node.innerHTML, etc.

  addResources(tempplayer, String(Node.innerHTML));//extracts string with resource keywords, then adds it to tempplayer.


  playerList.push(tempplayer);

}//function receivedStarting


function addResources(tempplayer, text){

//consider catching "you" as a keyword, and accounting for that.
tempplayer.lumber+= (text.match(/alt="lumber"/g) || []).length;
tempplayer.brick+= (text.match(/alt="brick"/g) || []).length;
tempplayer.wool+= (text.match(/alt="wool"/g) || []).length;
tempplayer.grain+= (text.match(/alt="grain"/g) || []).length;
tempplayer.ore+= (text.match(/alt="ore"/g) || []).length;
tempplayer.unknown+= (text.match(/alt="card"/g) || []).length; //this is either 1 or 0;
//<img src="../dist/images/card_rescardback.svg?v129" alt="card" height="20" width="14.25" class="lobby-chat-text-icon">

}

function subResources(tempplayer, text){

//consider catching "you" as a keyword, and accounting for that.

tempplayer.lumber-= (text.match(/alt="lumber"/g) || []).length;
tempplayer.brick-= (text.match(/alt="brick"/g) || []).length;
tempplayer.wool-= (text.match(/alt="wool"/g) || []).length;
tempplayer.grain-= (text.match(/alt="grain"/g) || []).length;
tempplayer.ore-= (text.match(/alt="ore"/g) || []).length;
tempplayer.unknown-= (text.match(/alt="card"/g) || []).length; //this is either 1 or 0;
//<img src="../dist/images/card_rescardback.svg?v129" alt="card" height="20" width="14.25" class="lobby-chat-text-icon">
resetWhenResourceNegative();
}
function processGot(tempnode){
//figure out which player is getting the
index = findIndex(tempnode);

addResources(playerList[index],String(tempnode.innerHTML));

}

function processBuilt(tempnode){

index = findIndex(tempnode);//gets the index of the player that just built!

if((String(tempnode.innerHTML).match(/alt="road"/g) || []).length > 0){
  playerList[index].lumber--;
  playerList[index].brick--;
  }
else if((String(tempnode.innerHTML).match(/alt="settlement"/g) || []).length > 0){
  playerList[index].lumber--;
  playerList[index].brick--;
  playerList[index].wool--;
  playerList[index].grain--;

  }
else if((String(tempnode.innerHTML).match(/alt="city"/g) || []).length > 0){
  playerList[index].grain-=2;
  playerList[index].ore-=3;
  }

}//function processBuilt

function processBought(tempnode){
  index = findIndex(tempnode);
  playerList[index].wool--;
  playerList[index].grain--;
  playerList[index].ore--;
}//function processBuilt


function processBank(tempnode){
//<div class="message_post" id="" style="color: rgb(226, 113, 116);">
//<img src="../dist/images/icon_player.svg?v129" alt="Guest" height="20" width="20">
//noa#7878 gave bank:   <img src="../dist/images/card_lumber.svg?v129" alt="lumber" height="20" width="14.25" class="lobby-chat-text-icon"><img src="../dist/images/card_lumber.svg?v129" alt="lumber"
//height="20" width="14.25" class="lobby-chat-text-icon"> and took
// <img src="../dist/images/card_grain.svg?v129" alt="grain" height="20" width="14.25" class="lobby-chat-text-icon"></div>

//split the String()
var tempstring = String(tempnode.innerHTML);
const [first, ...rest] = tempstring.split(' and took');

const second = rest.join();

nameindex= findIndex(first);



subResources(playerList[nameindex],first);
//first half, decrement the things!

addResources(playerList[nameindex],second);
//second half, increment the things!


}
function processTrade(tempnode){
  //<div class="message_post" id="" style="color: rgb(224, 151, 66);">
  //<img src="../dist/images/icon_bot.svg?v129" alt="bot" height="20" width="20">
  //Touber traded:  <img src="../dist/images/card_grain.svg?v129" alt="grain" height="20" width="14.25"
  //class="lobby-chat-text-icon">for:  <img src="../dist/images/card_lumber.svg?v129" alt="lumber" height="20"
  //width="14.25" class="lobby-chat-text-icon"> with: noa#7878</div>
  var tempstring = String(tempnode.innerHTML);
  const [first, ...rest] = tempstring.split('for: ');

  const second = rest.join();

  firstnameindex= findIndex(first);
  secondnameindex=findIndex(second);

  //firstnameindex loses first half stuff
  //firstnameindex gains second half stuff

  subResources(playerList[firstnameindex],first);
  addResources(playerList[firstnameindex],second);

  //secondnameindex gains first half stuff
  //secondnameindex loses second half stuff

  addResources(playerList[secondnameindex],first);
  subResources(playerList[secondnameindex],second);

}

function processDiscarded(tempnode){

  //we can assume that even though multiple people might have to discard, assume that only one name
  //will be present in tempnode.
  index=findIndex(tempnode);
  subResources(playerList[index],tempnode.innerHTML);

//<div class="message_post" id="" style="color: rgb(226, 113, 116);"><img src="../dist/images/icon_player.svg?v129" alt="Guest" height="20" width="20">noa#7878 discarded: <img src="../dist/images/card_wool.svg?v129" alt="wool" height="20" width="14.25" class="lobby-chat-text-icon"><img src="../dist/images/card_grain.svg?v129" alt="grain" height="20" width="14.25" class="lobby-chat-text-icon"><img src="../dist/images/card_grain.svg?v129" alt="grain" height="20" width="14.25" class="lobby-chat-text-icon"></div>
//<div class="message_post" id="" style="color: rgb(224, 151, 66);"><img src="../dist/images/icon_bot.svg?v129" alt="bot" height="20" width="20">Kalb discarded: <img src="../dist/images/card_grain.svg?v129" alt="grain" height="20" width="14.25" class="lobby-chat-text-icon"><img src="../dist/images/card_grain.svg?v129" alt="grain" height="20" width="14.25" class="lobby-chat-text-icon"><img src="../dist/images/card_wool.svg?v129" alt="wool" height="20" width="14.25" class="lobby-chat-text-icon"></div>
//<div class="message_post" id="" style="color: rgb(226, 113, 116);"><img src="../dist/images/icon_player.svg?v129" alt="Guest" height="20" width="20">noa#7878 discarded: <img src="../dist/images/card_lumber.svg?v129" alt="lumber" height="20" width="14.25" class="lobby-chat-text-icon"><img src="../dist/images/card_lumber.svg?v129" alt="lumber" height="20" width="14.25" class="lobby-chat-text-icon"><img src="../dist/images/card_grain.svg?v129" alt="grain" height="20" width="14.25" class="lobby-chat-text-icon"></div>
}

function processStole(tempnode){
  //<div class="message_post" id="" style="color: rgb(226, 113, 116); //red
  //"><img src="../dist/images/icon_player.svg?v129" alt="Guest" height="20" width="20">//
  //You stole:  <img src="../dist/images/card_wool.svg?v129" alt="wool" height="20" width="14.25" class="lobby-chat-text-icon">
  // from: Iinde</div>
  //Above is...
  //You stole: <img>.... alt="wool"... from: Player A
  if(String(tempnode.innerHTML).includes("You stole: ")){
    var tempstring = String(tempnode.innerHTML);
    const [first, ...rest] = tempstring.split('from: ');

    const second = rest.join();

    //firstnameindex= findIndex(first);
    //find out who "you" is based off the color of the node.
    firstnameindex=findIndexByColor(tempnode);
    secondnameindex=findIndex(second);

    addResources(playerList[firstnameindex], String(tempnode.innerHTML));
    subResources(playerList[secondnameindex], String(tempnode.innerHTML));

  }

  //<div class="message_post" id="" style="color: rgb(98, 185, 93);">
  //<img src="../dist/images/icon_bot.svg?v129" alt="bot" height="20" width="20">
  //Ana stole:  <img src="../dist/images/card_wool.svg?v129" alt="wool"
  // height="20" width="14.25" class="lobby-chat-text-icon"> from you</div>
  //Above is...
  //Player A stole <img>.... alt="wool"... from you
  else if(String(tempnode.innerHTML).includes("from you")){
    //<p class="header_profile_username __web-inspector-hide-shortcut__"
    //id="header_profile_username" style="font-weight: bold;">noa#0570</p>

    var tempstring = String(tempnode.innerHTML);
    const [first, ...rest] = tempstring.split('from');

    //const second = rest.join();
    var youNode = document.getElementById('header_profile_username');
    //console.log(String(youNode.innerHTML));
    firstnameindex= findIndex(first);
    secondnameindex=findIndex(youNode);

    //console.log('detected that [you] has been stolen from. printing out index of who got robbed');
    //console.log(secondnameindex);
    addResources(playerList[firstnameindex], String(tempnode.innerHTML));
    subResources(playerList[secondnameindex], String(tempnode.innerHTML));

    //
  }

  //<div class="message_post" id="" style="color: rgb(98, 185, 93);
  //"><img src="../dist/images/icon_bot.svg?v129" alt="bot" height="20" width="20">
  //Nanji stole  <img src="../dist/images/card_rescardback.svg?v129" alt="card" height="20" width="14.25"
  //class="lobby-chat-text-icon"> from: Bliss</div>
  //Above is...
  //Player A stole <img>.... alt="card"... from: Player B

  else if(String(tempnode.innerHTML).includes("from: ")){
    var tempstring = String(tempnode.innerHTML);
    const [first, ...rest] = tempstring.split('from: ');

    const second = rest.join();

    firstnameindex= findIndex(first);
    secondnameindex=findIndex(second);
    addResources(playerList[firstnameindex], String(tempnode.innerHTML));
    subResources(playerList[secondnameindex], String(tempnode.innerHTML));
    //console.log(String(tempnode.innerHTML));
  }
}//function processStole

function findIndex(tempnode){
//iterate through playerList.
//return the index for the first player name we find (such 'noa#7878')
if (typeof tempnode === 'string' || tempnode instanceof String){
  for (var i=0; i<playerList.length;i++){
      if(tempnode.includes(playerList[i].name)){
        return i;
      }//if

    } //for

}//if type string


for (var i=0; i<playerList.length;i++){
    if(String(tempnode.innerHTML).includes(playerList[i].name)){
      return i;
    }//if


  } //for
  return -1;
}//function findIndex


function findIndexByColor(tempnode){
  colormessage= window.getComputedStyle(tempnode).color;
  for (var i=0; i<playerList.length;i++){
      if(colormessage==(playerList[i].color)){
        return i;
      }//if


    } //for
    return -1;
  //playerRGB = window.getComputedStyle(Node).color
}

function resetIfHandsEmpty(){

//iterates through the playerList and resets the hand to 0 if their hand is empty or is a negative number.
resetWhenResourceNegative();
for (var i=0; i<playerList.length;i++){
    tempsum= playerList[i].lumber + playerList[i].brick + playerList[i].wool + playerList[i].grain + playerList[i].ore + playerList[i].unknown;
    if(tempsum<1){
      playerList[i].lumber=0;
      playerList[i].brick=0;
      playerList[i].wool=0;
      playerList[i].grain=0;
      playerList[i].ore=0;
      playerList[i].unknown=0;
      }//if
  }//for



}


function resetWhenResourceNegative(){
//if a real resource is negative, then compensates with the unknown pile.
  for (var j=0; j<playerList.length;j++){
      if(playerList[j].lumber<0){
        playerList[j].unknown+= playerList[j].lumber;
        playerList[j].lumber=0;
        }//if
      if(playerList[j].brick<0){
        playerList[j].unknown+= playerList[j].brick;
        playerList[j].brick=0;
        }//if
      if(playerList[j].wool<0){
        playerList[j].unknown+= playerList[j].wool;
        playerList[j].wool=0;
        }//if
      if(playerList[j].grain<0){
        playerList[j].unknown+= playerList[j].grain;
        playerList[j].grain=0;
        }//if
      if(playerList[j].ore<0){
        playerList[j].unknown+= playerList[j].ore;
        playerList[j].ore=0;
        }//if

    }//for

}
function reorderList(){
  //function grabs who the "you" keyword is, then makes sure that the associated player is at the
  //bottom of the list. the table now matches the game's UI.
  var youNode = document.getElementById('header_profile_username');

  while(!String(youNode.innerHTML).includes(playerList[playerList.length-1].name)) {
    playerList.unshift(playerList.pop());
  }



}
