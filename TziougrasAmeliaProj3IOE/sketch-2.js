// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

/*
This sketch creates an ellipse based on the users nose position.
Turning the potentiometer on the Arduino shield allows the user to
change the background transparency, which gives a different effect
to the moving ellipse.
*/

let video;
let poseNet;
let poses = [];

let fgImg;
let bgImg;
function preload(){
  bgImg = loadImage('images/junglebg.png');
  fgImg = loadImage('images/jungle.png');
}



function setup() {

  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);



  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  
} 



function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}

function draw() {

  background(bgImg);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

  
    //torso
    const rs = pose.rightShoulder;
    const ls = pose.leftShoulder;
    const rh = pose.rightHip;
    const lh = pose.leftHip;

    //arms
    const re = pose.rightElbow;
    const rw = pose.rightWrist;
    const le = pose.leftElbow;
    const lw = pose.leftWrist;

    //legs
    const rk = pose.rightKnee;
    const ra = pose.rightAnkle;
    const lk = pose.leftKnee;
    const la = pose.leftAnkle;

    //head
    const lEar = pose.leftEar;
    const rEar = pose.rightEar;

    stroke(126);
    strokeWeight(50);

    //right arm
    line(rs.x, rs.y, re.x, re.y);
    line(re.x, re.y, rw.x, rw.y);
    
    //left arm
    line(ls.x, ls.y, le.x, le.y);
    line(le.x, le.y, lw.x, lw.y);

    //right leg
    line(rh.x, rh.y, rk.x, rk.y);
    line(rk.x, rk.y, ra.x, ra.y);

    //left leg
    line(lh.x, lh.y, lk.x, lk.y);
    line(lk.x, lk.y, la.x, la.y);

    fill(133,133,133);
    beginShape();
    vertex(rs.x, rs.y);
    vertex(ls.x, ls.y);
    vertex(lh.x, lh.y);
    vertex(rh.x, lh.y);
    endShape(CLOSE);

    //head
    rect(rEar.x, lEar.y+10, lEar.x-rEar.x, lEar.x-rEar.x +10);
  }


  image(fgImg, 0, 0);

}