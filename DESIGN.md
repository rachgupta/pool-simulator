# Design Document
## By: Rachna G and Shreeja K

The backbone of our pool game simulator is based on a combination of HTML pages, powered by a series of JavaScript classes for the functionality and definition of various objects and CSS files for website design. The classes we have defined include a vector class, ball class, and stick class. The ball class defines a cue ball, 8-ball, and regular ball. The stick class simply defines the coordinates of the stick.
For the HTML and CSS, we decided to implement a total of 6 pages: homepage, instructions page, all balls setup, cue ball setup, 8 ball setup, and collisions setup. In terms of style, we decided to implement a navbar from bootstrap to allow the user to switch between different tabs in an efficient way. Additionally, within the HTML files we created a Canvas object which was used in all of the different setups. A Canvas is a html element that is used to draw objects and images in an efficient way. A Canvas element can draw overlapping images as well as animate images. To add functionality to the Canvas, we have developed a few JavaScript functions in Ball.js, Stick.js, and Game.js. Some of these functions include draw functions (implemented in Ball.js, Stick.js, and Game.js) and an animate function in Game.js that enables the balls to move on the canvas over a given time. The animation function uses requestAnimationFrame to help with updating each frame. 
In order to deal with collisions, we researched the physics behind pool to come up with code that incorporated the angle and power behind each collision between balls. We made the assumption that the masses are equal and that elastic kinetic energy is conserved. We also dealt with collisions against the wall, but more straightforwardly. We just had the balls bounce back from the wall, just with a different velocity vector. We did add a little dampening where the velocity vector was scaled back a little, just to make sure the player had the chance to have another turn, rather than just letting the balls bounce for a while. 
We also used a vector class primarily for the velocity and position, just to make it easier to visualize collisions and plot the balls. 
In order to enable the user to hit the cue ball with the cue stick, we implemented a popup box that allows the user to input an angle and power of the hit. We also incorporated checks in the code such that the user is continuously prompted for input until they enter a numerical value for the angle and the power. Once we got the user input, we used basic trigonometry to calculate the x and y velocity of the ball given the angle and magnitude of the total velocity. In the future, we would like to implement a more intuitive way to hit the ball which includes allowing the user to rotate the stick and use arrow keys to increase or decrease the power of the hit. 
The points system we have implemented updates the score of the user based on the number of balls they hit into the pockets. For instance, if a user gets the cue ball into the pocket, then the this.onBoard boolean in the ball class will be true (will not change) and the cue ball will reappear on the board at the origin for the next turn. If the 8-ball gets into a pocket, then the user will have lost the game and this.onBoard will be set to false. Lastly, if the user gets a regular ball into a pocket, then this.onBoard will be set to false and the total score will be incremented by 1 point. 
For reference, we used W3 schools, online documentation for JavaScript, multiple Stack Overflow debugging error posts, and this book by Arjan Egges called Building Javascript Games. We also went to multiple CS50 tutorials and got guidance from many TFs and CAs. 
Overall, we were able to implement a simple pool game tutorial page that allows the user to not only interactively learn about how pool works but also play a rudimentary single-player game of  the pool table through various setups. In the future, we hope to extend the implementation of our pool game to allow the user to play a full, multiplayer, pool game against the computer and friends