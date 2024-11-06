// typical game variables like points and coins
let Points = null;
let Coins = null;
let Items = []; //this will keep track of the items the player currently HAS
let Level = null; // this will keep track of what level/difficulty the player is on
let Special_level_type = null; //might be unused but could be fun for like a christmas special asset day :3
let turn = 0;

//player's point value and lives counter
let Player_Points = 0;
let Player_Lives = 5;
const Life_container = document.querySelector(".lives");
const Life_Code = [
  '<img class="heart" id="Li',
  '" src="images/LifeHeart.png" alt="wario">',
];
//============
const easy = ["1", "2", "3", "4", "5"];
const hard = ["1", "2"];

//============
//I stil call them dice, but they're basically just variables used to store the random number generators
// the number generators end up picking both the card type and house
let Dice_one = null;
let Dice_two = null;
let Dice_three = null;

//these will be the reference for all future shop events
//taking care of both the items in it and their prices
const Shop = [];
const Shop_Prices = [];

//These value are what help in the process of comparing the cards drawn
let Table_value = null;
let Deck_value = null;
let H_or_L = "none";

//These are temporary text elements for visual representation
const quickmath = document.querySelector("#creep");
const pts = document.querySelector("#pleep");
const HL = document.querySelector("#cleep");
const WL = document.querySelector("#cloop");
const Life = document.querySelector("#health");

//this allows the number generation to pick between the card type, house and pick the value according to said type
const Card_type = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const card_img = ["H", "S", "C", "D"];
const Card_house = ["Heart", "Spade", "Clover", "Diamond"];
const Card_value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13];
const Table_card = document.querySelector(".scard");
RNG_control((Dice_three = Get_random_int(9999))); //this one picks between types using a number between 0 and 13 (14 options)
Dice_two = Get_random_int(3); //this one picks between house using a number between 0 and 3 (4 options)

//Probably not temporary pre-start card loader that references the correct file for the chosen card type
function update_card() {
  //function that updates the card sprite on screen
  Table_card.src =
    "images/cardfaces/" + (card_img[Dice_two] + Card_type[Dice_one]) + ".png";
}
update_card();
Table_card.style.opacity = 1;

function RNG_control(i) {
  //controls the chances of which cards you're able to pull
  if (i <= 7000) {
    Dice_one = Get_random_int(5);
  } else if (i > 7000 && i <= 9500) {
    Dice_one = Get_random_int(5) + 6;
  } else if (i > 9500) {
    Dice_one = Get_random_int(3) + 11;
  }
  console.log(Dice_three);
}

//this section controls both the button inputs and hover functionality
// ---------------------------------------------------
let busy = false;
let hover = false;
const cardimg = document.querySelector(".card");
const Himg = document.querySelector(".Hi");
const Limg = document.querySelector(".Lo");

cardimg.addEventListener("mouseover", function (e) {
  e.target.src = "images/CBH.png";
});
cardimg.addEventListener("mouseout", function (e) {
  e.target.src = "images/CB.png";
});

Himg.addEventListener("mouseover", function (e) {
  e.target.src = "images/HIHO.png";
  hover = true;
});
Himg.addEventListener("mouseout", function (e) {
  e.target.src = "images/HI.png";
  hover = false;
});

Limg.addEventListener("mouseover", function (e) {
  e.target.src = "images/LOHO.png";
  hover = true;
});
Limg.addEventListener("mouseout", function (e) {
  e.target.src = "images/LO.png";
  hover = false;
});

const cardbutt = document.querySelector(".Card");
const Hbutt = document.querySelector(".Higher");
const Lbutt = document.querySelector(".Lower");

cardbutt.addEventListener("click", function () {
  if (busy == false) {
    butt_press("Card");
    busy = true;
    delay(2000).then(() => (busy = false));
  }
});
Hbutt.addEventListener("click", function () {
  butt_press("Higher");
});
Lbutt.addEventListener("click", function () {
  butt_press("Lower");
});
// ---------------------------------------------------

//this function is called upon to generate random numbers
function Get_random_int(max) {
  return Math.floor(Math.random() * max);
}

//This next section handles everything related to comparing the cards and win/loss conditions
//basically anything that happens after a button press
//=======================================================================================
function butt_press(i) {
  if (i == "Card") {
    Table_value = Card_value[Dice_one];
    if (turn > 0) {
    }
    console.log("GOT " + i + " PRESSED BOSS");
    RNG_control((Dice_three = Get_random_int(9999)));
    Dice_two = Get_random_int(3);
    Deck_value = Card_value[Dice_one];
    quickmath.textContent =
      "You drew a " + Card_type[Dice_one] + " of " + Card_house[Dice_two];
    //just empty space. this is a temporary visual element to show the

    HL_Check(Deck_value, Table_value);
    turn = turn + 1;
    delay(1000).then(() => update_card());
  } else if (i == "Higher") {
    if (H_or_L != "Higher") {
      H_or_L = "Higher";
      console.log(H_or_L);
    } else {
      H_or_L = "none";
    }
  } else if (i == "Lower") {
    if (H_or_L != "Lower") {
      H_or_L = "Lower";
      console.log(H_or_L);
    } else {
      H_or_L = "none";
    }
  }
  console.log("got input" + i);
}

function HL_Check(a, b) {
  ///this checks if the pulled card is higher or lower than the card already on the table
  let i = null;
  if (a >= b) {
    i = "Higher";
    Win_condition(i);
  } else if (a < b) {
    i = "Lower";
    Win_condition(i);
  } else {
    //if there is no values to check it automatically returns the text back to  "CLICK THE CARD" after 2 seconds
    i = "none";
    Win_condition(i);
  }
}

function Win_condition(i) {
  //Checks if you selected higher or lower then decides if you win or lose based upon the comparison in HL check
  if (H_or_L == "Higher") {
    if (i == "Higher") {
      WL.style.marginLeft = "-390px";
      WL.textContent = "You win!";
      Player_Points = Player_Points + 10;
    } else if (i == "Lower") {
      WL.style.marginLeft = "-392px";
      WL.textContent = "You lose!";
      Player_Lives = Player_Lives - 1;
    }
  } else if (H_or_L == "Lower") {
    if (i == "Lower") {
      WL.style.marginLeft = "-390px";
      WL.textContent = "You win!";
      Player_Points = Player_Points + 10;
    } else if (i == "Higher") {
      WL.style.marginLeft = "-392px";
      WL.textContent = "You lose!";
      Player_Lives = Player_Lives - 1;
    }
  } else {
    WL.style.marginLeft = "-585px";
    WL.textContent = "You didn't pick Higher or Lower"; //tells you that you didn't select higher or lower
    delay(1000).then(() => boop());
  }
}

function boop() {
  WL.style.marginLeft = "-555px";
  WL.textContent = "Please pick Higher or Lower";
}
//=======================================================================================

function delay(time) {
  //this is a timer that I can call whenever, it allows me to wait however many ms before I call the function or whatever is in the timer
  return new Promise((resolve) => setTimeout(resolve, time));
}

const dif_le = easy.length;
const diff = "easy";
/* function instance_Life() {
    let i = 0;
    let a = 1;
    while (i<dif_le) {
        Life_container.innerHTML += (Life_Code[0] + a + Life_Code[1]);
        i++
        a++
    }} */

/*   instance_Life(); */
