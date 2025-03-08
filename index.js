const gameboard = (function () {
    let board = 
    ["-","-","-",
     "-","-","-",
     "-","-","-"
    ];

    const ChangeSpot = function (side, spot)
    { 
        board[spot] = side;
        return spot;
    }

    const CheckBoard = () => board;

    const CheckValidSpot = function (spot)
    {
        if (board[spot] === "-")
        {
            return true;
        }
        else if (board[spot] === "X" || board[spot] === "O")
        {
            return false;
        }
        else
        {
            return false;
        }
    }

    return {ChangeSpot,CheckValidSpot,CheckBoard};
})();

function createPlayer (side)
{
    const playerSide = side;
    let playerSpots = [];

    const PlaceSpot = function (chosenSpot)
    {
        if (gameboard.CheckValidSpot(chosenSpot)) 
        {
            playerSpots.push(gameboard.ChangeSpot(playerSide, chosenSpot));
            console.log(gameboard.CheckBoard());
            return true;
        }
        else
        {
            console.log("NOT VALID TRY AGAIN");
            return false;
        }
    }

    return {playerSide,playerSpots,PlaceSpot};
}

function createComputerPlayer (side)
{
    const {playerSide,playerSpots,PlaceSpot} = createPlayer(side);

    const Play = function ()
    {
        while (!PlaceSpot(Math.floor(Math.random() * 9))){}
    }

    return {playerSide,playerSpots,Play};
}

function createHumanPlayer (side)
{
    const {playerSide,playerSpots,PlaceSpot} = createPlayer(side);

    const Play = function ()
    {
        let move = PlaceSpot(parseInt(prompt("Pick a spot to place (0-8): ")));
        while (!move) {move = PlaceSpot(parseInt(prompt("Pick a spot to place (0-8): ")))}
    }

    return {playerSide,playerSpots,Play};
}



const gameManager = (function () {
    let turn = "X";

    const ChangeTurn = function ()
    {
        if (turn === "X")
        {
            turn = "O";
        }
        else
        {
            turn = "X";
        }
    }

    const CheckIfWon = function (claimedSpots)
    {
        //horizontal
        if (claimedSpots.includes(0) && claimedSpots.includes(1) && claimedSpots.includes(2))
        {
            return true;
        }
        else if (claimedSpots.includes(3) && claimedSpots.includes(4) && claimedSpots.includes(5))
        {
            return true;
        }
        else if (claimedSpots.includes(6) && claimedSpots.includes(7) && claimedSpots.includes(8))
        {
            return true;
        }
        //vertical
        else if (claimedSpots.includes(0) && claimedSpots.includes(3) && claimedSpots.includes(6))
        {
            return true;
        }
        else if (claimedSpots.includes(1) && claimedSpots.includes(4) && claimedSpots.includes(7))
        {
            return true;
        }
        else if (claimedSpots.includes(2) && claimedSpots.includes(5) && claimedSpots.includes(8))
        {
            return true;
        }
        //diagonal
        else if (claimedSpots.includes(0) && claimedSpots.includes(4) && claimedSpots.includes(8))
        {
            return true;
        }
        else if (claimedSpots.includes(2) && claimedSpots.includes(4) && claimedSpots.includes(6))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    const CheckIfTied = function (player1Spots, player2Spots)
    {
        if (player1Spots.length >= 5 || player2Spots.length >= 5)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    const EndGame = function (winner)
    {
        console.log(winner + " WON");
    }

    const StartGame = function (player1, player2)
    {
        while (true)
        {
            if (turn === player1.playerSide) 
            {
                player1.Play();
                
                if (CheckIfWon(player1.playerSpots)) 
                {
                    EndGame(player1.playerSide);
                    break;
                }
                else if (CheckIfTied(player1.playerSpots, player2.playerSpots))
                {
                    EndGame("NEITHER");
                    break;
                }
                else
                {
                    ChangeTurn();
                }
            }
            else
            {
                player2.Play();

                if (CheckIfWon(player2.playerSpots)) 
                {
                    EndGame(player2.playerSide);
                    break;
                }
                else if (CheckIfTied(player1.playerSpots, player2.playerSpots))
                {
                    EndGame("NEITHER");
                    break;
                }
                else
                {
                    ChangeTurn();
                }
            }
        }
    }

    return {StartGame}
})();



player = createHumanPlayer("X");
computer = createComputerPlayer("O");

gameManager.StartGame(player, computer);