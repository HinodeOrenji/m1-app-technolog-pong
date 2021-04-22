game.control = {

    mousePointer : null,

    //Fonction de l'appui de la touche
    onKeyDown : function(event) {
        if ( event.keyCode === game.keycode.KEYDOWN ) {
            game.playerOne.goDown = true;
            game.playerTwo.goDown = true;
            game.playerThree.goDown = true;
            game.playerFour.goDown = true;
        } else if ( event.keyCode === game.keycode.KEYUP ) {
            game.playerOne.goUp = true;
            game.playerTwo.goUp = true;
            game.playerThree.goUp = true;
            game.playerFour.goUp = true;
        }
    },

    onKeyUp : function(event) {
        if ( event.keyCode === game.keycode.KEYDOWN ) {
            game.playerOne.goDown = false;
            game.playerTwo.goDown = false;
            game.playerThree.goDown = false;
            game.playerFour.goDown = false;
        } else if ( event.keyCode === game.keycode.KEYUP ) {
            game.playerOne.goUp = false;
            game.playerTwo.goUp = false;
            game.playerThree.goUp = false;
            game.playerFour.goUp = false;
        }
    },
/*
    //Fonction du controle de la souris
    onMouseMove : function(event) {

        if ( event ) {
            game.control.mousePointer = event.clientY;
        }

        if ( game.control.mousePointer > game.playerTwo.posY ) {
            game.playerTwo.goDown = true;
            game.playerTwo.goUp = false;
        } else if ( game.control.mousePointer < game.playerTwo.posY ) {
            game.playerTwo.goDown = false;
            game.playerTwo.goUp = true;
        } else {
            game.playerTwo.goDown = false;
            game.playerTwo.goUp = false;
        }
    }*/
}
