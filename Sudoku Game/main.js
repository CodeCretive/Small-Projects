const gameBoard = document.querySelector("#sudokuBoard");
let lastSelected = null;
let puzzle = [
	"53-7-92--",
	"---------",
	"2---5-67-",
	"---1-6-98",
	"95-3---2-",
	"-4-------",
	
	"1-58--462",
	"7--6-5-1-",
	"-----4---"
];
let solution = [
	"538769241",
	"467231985",
	"219458673",
	"372146598",
	"956387124",
	"841592736",
	"195873462",
	"784625319",
	"623914857"
];

window.onload = () => {
	// Created sudoku board using js
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			const div = document.createElement("div")
			div.classList.add('box')
			div.setAttribute("row", row); // setAttribute is just to access row and column, later out of this block
			div.setAttribute("col", col); // setAttribute is just to access row and column, later out of this block
			gameBoard.appendChild(div)
			div.addEventListener('click', selectBox)
			
			if (puzzle[row][col] != "-") {
				div.classList.add("filled")
				div.innerText = puzzle[row][col]
				
			};
			if (row == 2 || row == 5) {
				div.classList.add('border-bottom')
			};
			if (col == 2 || col == 5) {
				div.classList.add('border-right')
			};
		};
	};
};

const digitsBox = document.querySelector('#digits');
// Created digit buttons using js
for (let i = 0; i < 9; i++) {
	const digitBtn = document.createElement('button');
	digitBtn.classList.add('digit');
	digitBtn.innerText = i + 1;
	digitBtn.addEventListener('click', appendToBox);
	digitsBox.appendChild(digitBtn);
};

// digits can be put in cell, when clicked
function appendToBox() {
	if (lastSelected == null) {
		alert("Select a cell first.")
	}
	else if (!lastSelected.classList.contains('filled')) {
		let row = lastSelected.getAttribute("row")
		let col = lastSelected.getAttribute("col")
		lastSelected.innerText = this.innerText
		if (lastSelected.innerText == solution[row][col]) {
			lastSelected.classList.remove("wrong")
		}
		else {
			lastSelected.classList.add("wrong")
		}
		if (allFilled()) //allFilled is self-created func
		{
			let allBoxes = document.querySelectorAll(".box");
			let isAnythingWrong = [...allBoxes].some((box) => {
				return box.classList.contains("wrong")
			})
			if (!isAnythingWrong) {
				alert("Congratulations! U won")
			}
		};
	};
};

// Higlights selected sudoku cell
function selectBox() {
	if (lastSelected != null) {
		lastSelected.classList.remove("selected")
	}
	lastSelected = this;
	lastSelected.classList.add("selected")
};

// Checks if all cells are filled
function allFilled() {
	let allBoxes = document.querySelectorAll(".box");
	return [...allBoxes].every((tile) => {
		return tile.innerText != ""
	})
}

// Built this game from learning from a yt channel 'King of JavaScript'.

// Below code is just the changes to do in when we open this game on larger width screens. This can be ignored.
if (window.innerWidth > window.innerHeight) {
	sudokuBoard.style.height = '80vh'
	sudokuBoard.style.width = '80vh'
	sudokuBoard.style.marginRight = '5%'
	document.querySelector('.container').style.marginTop = '0'
	document.querySelector('.container').style.flexDirection = 'row'
	digitsBox.style.flexDirection = 'column'
	digitsBox.style.width = '16vh'
	digitsBox.style.marginRight = '5%'
	document.querySelectorAll('.digit').forEach(digit => {
		digit.style.height = 'calc(80vh / 9)'
		digit.style.fontSize = '2em'
	})
};
