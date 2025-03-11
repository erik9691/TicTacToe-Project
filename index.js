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
        console.log("CHECKING " + playerSide + "'S VALIDITY");
        if (gameboard.CheckValidSpot(chosenSpot)) 
        {
            playerSpots.push(gameboard.ChangeSpot(playerSide, chosenSpot));
            console.log(gameboard.CheckBoard());
            displayManager.UpdateBoard();
            gameManager.CheckEndConditions(playerSpots, playerSide);
            console.log(playerSide + " PLACED");
        }
        else
        {
            console.log("NOT VALID TRY AGAIN");
        }
    }

    return {playerSide,playerSpots,PlaceSpot};
}
/*
function createComputerPlayer (side)
{
    const {playerSide,playerSpots,PlaceSpot} = createPlayer(side);

    const Play = function ()
    {
        while (!PlaceSpot(Math.floor(Math.random() * 9))){}
    }

    return {playerSide,playerSpots,Play};
}
*/
/*
function createHumanPlayer (side)
{
    const {playerSide,playerSpots,PlaceSpot} = createPlayer(side);
    return {playerSide,playerSpots};
}
*/


const gameManager = (function () {
    let turn = "X";
    console.log(turn + "'s TURN");
    let players = {};

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
        console.log(turn + "'s TURN");
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

    const CheckIfTied = function ()
    {
        for (const spot in gameboard.CheckBoard()) {
            if (gameboard.CheckValidSpot(spot))
            {
                return false;
            }
        }
        return true;
    }

    const CheckEndConditions = function (claimedSpots, side)
    {
        if (CheckIfWon(claimedSpots)) 
        {
            EndGame(side);
        }
        else if (CheckIfTied())
        {
            EndGame("NEITHER");
        }
        else
        {
            ChangeTurn();
        }
    }

    const EndGame = function (winner)
    {
        console.log(winner + " WON");
    }

    const RegisterPlayers = function (playerX, playerO) {
        players["X"] = playerX;
        players["O"] = playerO;
    };

    const ProcessMove = function (chosenSpot) {
        if (gameboard.CheckValidSpot(chosenSpot))
        {
            players[turn].PlaceSpot(chosenSpot);
        }
        else
        {
            console.log("NOT VALID TRY AGAIN");
        }
    };

    return {CheckEndConditions, RegisterPlayers, ProcessMove}
})();

const displayManager = (function () {
    const visualBoard = document.querySelectorAll(".spot");

    const UpdateBoard = function ()
    {
        for (const [i, spot] of gameboard.CheckBoard().entries())
        {
            if (spot !== "-")
            {
                visualBoard[i].innerText = spot
            }
        }
    }

    visualBoard.forEach((spot) => 
    {
        spot.addEventListener("click", function(e){
            e.preventDefault();
            const chosenSpot = parseInt(e.target.id);
            gameManager.ProcessMove(chosenSpot);
        ;});
    });
    
    return {visualBoard, UpdateBoard}
})();


player1 = createPlayer("X");
player2 = createPlayer("O");

gameManager.RegisterPlayers(player1, player2);