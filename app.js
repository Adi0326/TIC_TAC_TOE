const boxes = document.querySelectorAll(".box"); // Select all boxes
const resetBtn = document.querySelector("#reset"); // Select reset button
let turnO = true; // Track turns (true -> O, false -> X)

const WinPattern = [
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

// Handle box clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent overwriting

        box.innerText = turnO ? "O" : "X"; // Set symbol
        turnO = !turnO; // Toggle turn

        checkWinner(); // Check winner after each move
    });
});

// Check for a winner
function checkWinner() {
    for (let pattern of WinPattern) {
        let [a, b, c] = pattern;

        if (
            boxes[a].innerText !== "" && 
            boxes[a].innerText === boxes[b].innerText && 
            boxes[a].innerText === boxes[c].innerText
        ) {
            alert(`🎉 Player ${boxes[a].innerText} wins!`);
            resetBoard();
            return;
        }
    }

    // Check for draw (if all boxes are filled and no winner)
    if ([...boxes].every(box => box.innerText !== "")) {
        alert("😮 It's a Draw!");
        resetBoard();
    }
}

// Reset the board
function resetBoard() {
    boxes.forEach(box => box.innerText = ""); // Clear boxes
    turnO = true; // Reset turn to 'O'
}

// Handle reset button click
resetBtn.addEventListener("click", resetBoard);
