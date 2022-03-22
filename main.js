var music1 = "";
var music2 = "";
var leftWristX = "";
var leftWristY = "";
var rightWristX = "";
var rightWristY = "";

function preload(){
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialised");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristX+", Left Wrist Y = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristX+", Right Wrist Y = "+rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 500, 400);
}