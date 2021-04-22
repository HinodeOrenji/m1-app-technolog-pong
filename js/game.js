var game = {
    groundWidth: 700,
    groundHeight: 400,
    groundColor: "#000000",
    netWidth: 6,
    netColor: "#FFFFFF",
    scoreLayer: null,
    playersBallLayer: null,
    groundLayer: null,
    scorePosPlayer1: 300,
    scorePosPlayer2: 365,
    scoreTeam1 :0,
    scoreTeam2 :0,

    /*  Creation des objets  */

    //Objet de la balle
    ball: {
        width: 10,
        height: 10,
        color: "#FFFFFF",
        posX: 200,
        posY: 200,
        speed: 1,
        directionX: 1,
        directionY: 1,

        //Methode du mouvement de la balle avec une vitesse
        move: function () {
            this.posX += this.directionX * this.speed;
            this.posY += this.directionY * this.speed;
            console.log(this.directionX);
        },

        //Methode du rebond de la balle sur les bords du terrain
        bounce: function () {
            if (this.posX > game.groundWidth){
               game.scoreTeam1++;
               this.ballCenter();
            }
            if (this.posX < 0){
                game.scoreTeam2++;
                this.ballCenter();
            }
            if (this.posY > game.groundHeight || this.posY < 0)
                this.directionY = -this.directionY;
        },
        //Méthode du rebons de la balle sur la raquette
        collide: function (anotherItem) {
            if (!(this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
                || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height)) {
                // Collision
                return true;
            }
            return false;
        },
        ballCenter : function (){
            this.posX = 200;
            this.posY = 200;
            this.directionX = 1;
            this.directionY = 1;
            game.clearLayer(game.scoreLayer);
            game.displayScore(game.scoreTeam1, game.scoreTeam2);
        },
    },

    //Objet du joueur 1
    playerOne: {
        width: 10,
        height: 50,
        color: "#FFFFFF",
        posX: 80,
        posY: 200,
        goUp: false,
        goDown: false,
        originalPosition: "left",
        score : 0
    },

        //Objet du joueur 2
        playerTwo: {
            width: 10,
            height: 50,
            color: "#FFFFFF",
            posX: 605,
            posY: 200,
            goUp: false,
            goDown: false,
            originalPosition: "right",
            score : 0

        },
        //Objet du joueur 3
        playerThree: {
            width: 10,
            height: 50,
            color: "#FFFFFF",
            posX: 10,
            posY: 200,
            goUp: false,
            goDown: false,
            originalPosition: "left"
        },
        //Objet du joueur 4
        playerFour: {
            width: 10,
            height: 50,
            color: "#FFFFFF",
            posX: 675,
            posY: 200,
            goUp: false,
            goDown: false,
            originalPosition: "right"
        },


        init: function () {
            this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0);

            game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth / 2 - this.netWidth / 2, 0);
            this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);

            game.display.drawTextInLayer(this.scoreLayer, "SCORE", "10px Arial", "#FF0000", 10, 10);
            this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);

            game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#ff0000", 100, 100);

            //game.initMouse(game.control.onMouseMove); // appel de la fonction d'appel de la souris

            /*game.ai.setPlayerAndBall(this.playerThree, this.ball); // appel de l'ia pour le joueur 3

            game.ai.setPlayerAndBall(this.playerFour, this.ball); // appel de l'ia pour le joueur 4*/

            this.displayScore(game.scoreTeam1, game.scoreTeam2); //appel de la fonction score

            this.displayBall(this.ball.posX, this.ball.posY); // appel de la fonction de la balle

            this.displayPlayers(); // appel de la fonction des joueurs

            this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp); // appel de la fonction d'appel des actions des touches

        },

        //Fonction du mouvement des raquettes des joueurs
        movePlayer1: function () {
            if (game.playerOne.goUp && game.playerOne.posY > 0)
                game.playerOne.posY -= 5;
            else if (game.playerOne.goDown && game.playerOne.posY < game.groundHeight - game.playerOne.height)
                game.playerOne.posY += 5;
        },
        movePlayer2: function () {
            if (game.playerTwo.goUp && game.playerTwo.posY > 0)
                game.playerTwo.posY -= 5;
            else if (game.playerTwo.goDown && game.playerTwo.posY < game.groundHeight - game.playerTwo.height)
                game.playerTwo.posY += 5;
        },

        movePlayer3: function () {
            if (game.playerThree.goUp && game.playerThree.posY > 0)
                game.playerThree.posY -= 5;
            else if (game.playerThree.goDown && game.playerThree.posY < game.groundHeight - game.playerThree.height)
                game.playerThree.posY += 5;
        },
        movePlayer4: function () {
            if (game.playerFour.goUp && game.playerFour.posY > 0)
                game.playerFour.posY -= 5;
            else if (game.playerFour.goDown && game.playerFour.posY < game.groundHeight - game.playerFour.height)
                game.playerFour.posY += 5;
        },

        //Fonction du score
        displayScore: function (scorePlayer1, scorePlayer2) {
            game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
            game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
        },

        //Fonction de la balle
        displayBall: function () {
            game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
        },

        //Fonction des joueurs
        displayPlayers: function () {
            game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
            game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
            game.display.drawRectangleInLayer(this.playersBallLayer, this.playerThree.width, this.playerThree.height, this.playerThree.color, this.playerThree.posX, this.playerThree.posY);
            game.display.drawRectangleInLayer(this.playersBallLayer, this.playerFour.width, this.playerFour.height, this.playerFour.color, this.playerFour.posX, this.playerFour.posY);
        },

        //Fonction du mouvement de la balle
        moveBall: function () {
            this.ball.move();
            this.ball.bounce();
            this.displayBall();
        },

        //Fonction d'effacement du layer
        clearLayer: function (targetLayer) {
            targetLayer.clear();
        },

        //Fonction d'appel des actions des touches
        initKeyboard: function (onKeyDownFunction, onKeyUpFunction) {
            window.onkeydown = onKeyDownFunction;
            window.onkeyup = onKeyUpFunction;
        },
        //Fonction d'appel du controle de la souris
       /* initMouse: function (onMouseMoveFunction) {
            window.onmousemove = onMouseMoveFunction;
        },*/

        //Fonction d'appel de la méthode du rebond sur les raquettes
        collideBallWithPlayersAndAction: function () {
            if (this.ball.collide(game.playerOne))
                game.ball.directionX = -game.ball.directionX;
            if (this.ball.collide(game.playerTwo))
                game.ball.directionX = -game.ball.directionX;
            if (this.ball.collide(game.playerThree))
                game.ball.directionX = -game.ball.directionX;
            if (this.ball.collide(game.playerFour))
                game.ball.directionX = -game.ball.directionX;
        }
};
