let frame = 0;

function frames(i) {
  H_L_select();
  update_life();
  update_HL();
  update_pts();
  requestAnimationFrame(frames); //this function infinitely loops upon getting the first call to it through this
  //basically it refreshes every "frame" which I believe is actually tied to your monitor's refresh rate
  console.log("hi"); //visual confirmation of the loop
}

frames(frame);

function H_L_select() {
  if (H_or_L == "Higher") {
    Himg.src = "images/HIHO.png";
    if (hover == false) {
      Limg.src = "images/LO.png";
    }
  } else if (H_or_L == "Lower") {
    Limg.src = "images/LOHO.png";
    if (hover == false) {
      Himg.src == "images/Hi.png";
    }
  } else {
    if (hover == false) {
      Limg.src = "images/LO.png";
      Himg.src = "images/HI.png";
    }
  }
}

function update_pts() {
  //makes sure the points stay up to date
  pts.textContent = "PTS: " + Player_Points;
}

function update_HL() {
  //keeps the visuals of wether you selected "higher" or "lower" updated
  HL.textContent = "Selected: " + H_or_L;
}

function update_life() {
  //updates the counter that shows your current lives
  if (Player_Lives > 0) {
    Life.textContent = Player_Lives;
  } else {
    Life.textContent = "0";
    reset();
    delay(500).then(() => alert("game over"));
  }
}

function reset() {
  //this resets the game once you're out of lives, setting you back to 0 points, no selections and full lives basically putting you at the beginning without a refresh
  WL.style.marginLeft = "-555px";
  quickmath.style.marginLeft = "-460px";

  Player_Lives = 5;
  H_or_L = "none";
  Player_Points = 0;
  busy = true;
  delay(3500).then(() => (busy = false));
  quickmath.textContent = "Press the card to draw";
  WL.textContent = "Please pick Higher or Lower";
}
