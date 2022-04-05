var music1 = "";
var music1Status = "";
var music2 = "";
var music2Status = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var scoreLeftWrist = 0;
var scoreRightWrist = 0;

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
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

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

    fill("#ff0066");
    stroke("#ff0066");
    
    music1Status = music1.isPlaying();
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        music2.stop();
        if(music1Status == false){
            music1.play();
            document.getElementById("song").innerHTML = "Peter Pan";
        }
    }

    music2Status = music1.isPlaying();
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        music1.stop();
        if(music2Status == false){
            music2.play();
            document.getElementById("song").innerHTML = "Harry Porter Theme song";
        }
    }
}