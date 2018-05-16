const map = [
  "  WWWWW ",
  "WWW   W ",
  "WOSB  W ",
  "WWW BOW ",
  "WOWWB W ",
  "W W O WW",
  "WB XBBOW",
  "W   O  W",
  "WWWWWWWW"
];


const columnCount = map[0].length;
const cellWidth = `calc(100vw / ${columnCount}) `;
const cellHeight = `calc(100vh / ${map.length}) `;
const player = document.getElementById("player");

player.style.height = cellHeight;

playerMovementWithArrows();
createMap();
const numOfMatchesToWin = [...document.querySelectorAll('.O')].length
console.log(numOfMatchesToWin)

function createMap() {
  for (let row of map) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    document.body.appendChild(rowDiv);
    for (let cell of row.split("")) {
      const cellDiv = document.createElement("div");
      cell !== " "
        ? cellDiv.classList.add(cell)
        : cellDiv.classList.add("free-space");
      cell === "S"
        ? (cellDiv.id = "s")
        : cell === "F"
          ? (cellDiv.id = "f")
          : null;
      cellDiv.dataset.column = rowDiv.childElementCount;
      cellDiv.style.width = cellWidth;
      cellDiv.style.height = cellHeight;
      rowDiv.appendChild(cellDiv);
    }
  }

  const start = document.getElementById("s");
  start.appendChild(player);
}

function checkWinner() {
  let numberOfMatches =[...document.querySelectorAll('.O.B')].length
  console.log(numberOfMatches);
  numberOfMatches === numOfMatchesToWin ? alert('You\'re a Winner.') : null
  
}
function checkHorizontals(direction) {
  let firstAdjacentChild;
  let secondAdjacentChild;
  if (direction === "right") {
     firstAdjacentChild = player.parentElement.nextElementSibling;
     secondAdjacentChild =
      player.parentElement.nextElementSibling.nextElementSibling;
  } else if (direction === "left") {
     firstAdjacentChild = player.parentElement.previousElementSibling;
     secondAdjacentChild =
      player.parentElement.previousElementSibling.previousElementSibling;
  }
  if (!firstAdjacentChild.classList.contains("W")) {
    if (
      (firstAdjacentChild.classList.contains("O") &&
        !firstAdjacentChild.classList.contains("B")) ||
      !firstAdjacentChild.classList.contains("B")
    ) {
      firstAdjacentChild.appendChild(player);
    } else if (firstAdjacentChild.classList.contains("B")) {
      if (
        !secondAdjacentChild.classList.contains("W") &&
        !secondAdjacentChild.classList.contains("B")
      ) {
        if (firstAdjacentChild.classList.contains("O")) {
          firstAdjacentChild.classList.remove("B");

          firstAdjacentChild.style.backgroundImage =
            "url('pics/targetTile.png')";
          firstAdjacentChild.appendChild(player);
          secondAdjacentChild.classList.add("B");
        } else if (firstAdjacentChild.classList.contains("B")) {
          firstAdjacentChild.classList.remove("B");
          secondAdjacentChild.classList.add("B");
          firstAdjacentChild.appendChild(player);
          if (secondAdjacentChild.classList.contains("O")) {
            secondAdjacentChild.style.backgroundImage =
              "url('pics/boulderOnTarget.png')";
          }
        }
      }
    }
  }
}
    function checkVerticals(direction) {
      let nextRowChildren = [];
      let nextTwoRowsChildren = [];
      if (
        direction === "up" &&
        player.parentElement.parentElement.previousElementSibling
      ) {
        nextRowChildren = [
          ...player.parentElement.parentElement.previousElementSibling
            .childNodes
        ];
        nextTwoRowsChildren = [
          ...player.parentElement.parentElement.previousElementSibling
            .previousElementSibling.childNodes
        ];
      } else if (
        direction === "down" &&
        player.parentElement.parentElement.nextElementSibling
      ) {
        nextRowChildren = [
          ...player.parentElement.parentElement.nextElementSibling.childNodes
        ];
        nextTwoRowsChildren = [
          ...player.parentElement.parentElement.nextElementSibling
            .nextElementSibling.childNodes
        ];
      }

      for (let firstRowChild of nextRowChildren) {
        let currentColumn = player.parentElement.dataset.column;
        if (
          firstRowChild.dataset.column === currentColumn &&
          !firstRowChild.classList.contains("W")
        ) {
          if (
            (firstRowChild.classList.contains("O") &&
              !firstRowChild.classList.contains("B")) ||
            !firstRowChild.classList.contains("B")
          ) {
            firstRowChild.appendChild(player);
          } else if (firstRowChild.classList.contains("B")) {
            for (let secondRowChild of nextTwoRowsChildren) {
              if (secondRowChild.dataset.column === currentColumn) {
                if (
                  !secondRowChild.classList.contains("W") &&
                  !secondRowChild.classList.contains("B")
                ) {
                  if (firstRowChild.classList.contains("O")) {
                    firstRowChild.classList.remove("B");

                    firstRowChild.style.backgroundImage =
                      "url('pics/targetTile.png')";
                    firstRowChild.appendChild(player);
                    secondRowChild.classList.add("B");
                  } else if (firstRowChild.classList.contains("B")) {
                    firstRowChild.classList.remove("B");
                    secondRowChild.classList.add("B");
                    firstRowChild.appendChild(player);
                    if (secondRowChild.classList.contains("O")) {
                      secondRowChild.style.backgroundImage =
                        "url('pics/boulderOnTarget.png')";
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    function playerMovementWithArrows() {
      window.addEventListener("keydown", event => {
        switch (event.key) {
          case "ArrowDown":
            checkVerticals("down");
            checkWinner();
            break;

          case "ArrowUp":
            checkVerticals("up");
            checkWinner();

            break;
          case "ArrowLeft":
            // removeAnimationClasses();
            checkHorizontals("left");
            checkWinner();
            break;

          case "ArrowRight":
            checkHorizontals("right");
            checkWinner();
            break;
        }
      });
    }
  


// function removeAnimationClasses(){
//   player.classList.remove('slideUp');
//   player.classList.remove('slideDown');
//   player.classList.remove('slideRight');
//   player.classList.remove('slideLeft');
// }
