game.ai = {
    player : null,
    ball : null,

    //initialisation de la méthode d'initialisation des  propriétés player et ball
    setPlayerAndBall : function(player, ball) {
        this.player = player;
        this.ball = ball;
    },

    //Fonction de déplacement de l'intelligence artificielle
    move : function() {
        if ( this.ball.directionX === 1 ) {
            if ( this.player.originalPosition === "right" ) {
                // follow
                this.followBall();
            }
            if ( this.player.originalPosition === "left" ) {
                // center
                this.goCenter();
            }
        } else {
            if ( this.player.originalPosition === "right" ) {
                // center
                this.goCenter();
            }
            if ( this.player.originalPosition === "left" ) {
                // follow
                this.followBall();
            }
        }
    },


    //Fonction pour suivre la balle
    followBall : function() {
        if ( this.ball.posY < this.player.posY + this.player.height/2 ) {
            this.player.posY--;
        } else if ( this.ball.posY > this.player.posY + this.player.height/2 ) {
            this.player.posY++;
        }
    },

    //Fcontion se recentrer sur le terrain
    goCenter : function() {
        if ( this.player.posY + this.player.height/2 > game.groundHeight / 2 ) {
            this.player.posY--;
        } else if ( this.player.posY + this.player.height/2 < game.groundHeight / 2 ) {
            this.player.posY++;
        }
    }
}