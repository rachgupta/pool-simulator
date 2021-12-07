# Pool50: Pool Simulator
## By: Rachna Gupta and Shreeja Kikkisetti
## How to run the code:
To run the code, first ensure that you have access to vscode(either the desktop app or the website). Then, download the code that we have provided. To run the program, simply right click on the home.html file and open the live server to interact with the website. 
## Description: 
Pool50 provides users a chance to improve their pool skills and attempts to teach new users how to play pool through a series of tasks. These tasks include exploring what would happen if a user were to hit the cue ball into a pocket, hit an 8 ball into a pocket, and hit a series of regular balls into a pocket via collisions. Through the development of 4 different html files, each that allows a user to interact with a different pool setup, Pool50 works to enhance the users knowledge of pool. Additionally, the user can hit balls through inputting an angle and power of the hit. The angle should be in degrees, where 0 degrees is straight down. Since, the objective of this program is to teach the user how to play pool, the user can keep hitting the cue ball until the ball (or balls) of interest goes into the pocket. 
## Description of files:
### Stick.js: 
The Stick.js file creates a Stick object with its field being an x position and y position. In addition, the stick class has a function called draw where the stick image is drawn at the given x and y position. 
### Ball.js: 
The Ball.js file creates a Ball object with various methods describing behaviors that affect the ball or use fields from the class, such as draw, update, and checkIfPoint. 
### Game.js: 
The Game.js file contains a plethora of functions including functions relating to redrawing the board, animating the balls, starting a new game, hitting the cue, clearing the board, checking to see if a ball is in a pocket, updating points, and dealing with collisions between balls and the walls. 
### Vector2.js: 
The Vector2.js file defines a vector2 object with its fields being an x and y magnitude.
images: The images file contains images of the various balls (8-ball, cue balls, regular balls), stick, pool table, and background image for the home page. 
### home.html: 
The home.html file contains html code for the homepage including the implementation of a background image, bootstrap powered navbar, and an introduction to our program.
### instructions.html: 
The instructions.html file contains html code for the page with the instructions for how to play eight ball in general, how to navigate between the different tabs, and how to interact with the pool board. 
### main.html: 
The main.html file contains the all ball setup. This setup utilizes a canvas with the stick, cue ball, 8-ball, and 14 regular balls. 
### setup1.html: 
The setup1.html file contains the cue ball setup. This setup utilizes a canvas with the cue ball. 
### setup2.html: 
The setup2.html file contains the 8-ball setup. This setup utilizes a canvas with the cue ball and the 8 ball. 
### setup3.html: 
The setup3.html file contains the collision ball setup. This setup utilizes a canvas with the cue ball and three regular balls
## Project Status: 
Although we had originally intended to complete a full implementation of a multiplayer pool game, we decided to shift the direction of our project and create fully-functional smaller mini pool games with fewer animations. Additionally, our pool board is flickering right now due to the way we are loading the elements on the pool table. We have attempted to solve this problem through loading all the elements first and then displaying them, but this method gave us a multitude of errors that we were unable to address given the amount of time we had. In the future, we would like to retry implementing the load.js class we had started to build. 
