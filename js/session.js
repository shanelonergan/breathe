// variables 

let sessionButton = document.querySelector("#new-session")
let landing = document.querySelector("#landing")
// let timer = document.querySelector("#timerContainer")
let roundsInput = document.querySelector("#rounds")
let sessionSection = document.querySelector("#session")
let totalRoundsSpan = document.querySelector("#total-rounds")
let currentBreathRoundSpan = document.querySelector("#breath-current-round")
let breathCount = document.querySelector("#breath-count")
let breathDiv = document.querySelector("#breath-div")
let holdBreathSection = document.querySelector("#hold-breath")
let roundCounter = document.querySelector("#round-counter")
let currentBreath
let currentRound

// columns
let newRoundColumn = document.querySelector("#new-round-column")
let streakColumn = document.querySelector("#streak-column")
let breathColumn = document.querySelector("#breath-column")
let timerColumn = document.querySelector("#timer-column")
let instructionsColumn = document.querySelector("#instructions-column")


let instructionsText = document.querySelector("#instructions-text")

// breathing cycle (chronological order)

function beginSession(){
	
	showBreathCounter()

	let totalRounds = roundsInput.value
	// set the default number of rounds to 1
	if (totalRounds === "") {
		totalRounds = 1
	}

	let currentRound = 1 // set the first round
	totalRoundsSpan.innerText = totalRounds
	currentBreathRoundSpan.innerText = currentRound
}

function showBreathCounter(){
	// coming from beginSession

	document.addEventListener("keyup", incrementBreath)
	newRoundColumn.classList.add("is-hidden")
	streakColumn.classList.add("is-hidden")
	breathColumn.classList.remove("is-hidden")
	instructionsColumn.classList.remove("is-hidden")
	roundCounter.classList.remove("is-hidden")
}

function incrementBreath (event) {
	// coming from showBreathCounter

	if (event.keyCode == 32){
		currentBreath = parseInt(breathCount.innerText, 10)
		if (currentBreath === 5) {
			holdBreath()
		} else {
			currentBreath += 1 
			breathCount.innerText = currentBreath
		}
	}
}


function holdBreath() {
	// coming from incrementBreath

	document.addEventListener("keyup", incrementBreath)
	breathColumn.classList.add("is-hidden")
	timerColumn.classList.remove("is-hidden")
	instructionsText.innerText = "Hold as long as you can! Press space when you exhale."

	startTimer()
	document.addEventListener('keyup', beginBreathHolding)
}

function beginBreathHolding() {
	// coming from holdBreath 

	if (event.keyCode == 32) {
		resetTimer()
		breathColumn.classList.add("is-hidden")
		timerColumn.classList.add("is-hidden")
		instructionsText.innerText = "Now take one more big inhale and hold at the top! Press space once you have inhaled."

		document.removeEventListener('keyup', beginBreathHolding)
		document.addEventListener("keyup", addShortHold)
		currentBreath = 0
		breathCount.innerText = currentBreath

	}
}

function addShortHold(){
	// coming from beginBreathHolding
	if (event.keyCode == 32) {
		shortHold()
		document.removeEventListener("keyup", addShortHold)
	}
}

function shortHold() {
	// coming from add short hold

	if (parseInt(currentBreathRoundSpan.innerText, 10) === parseInt(totalRoundsSpan.innerText, 10)) {
		timerColumn.classList.add("is-hidden")
		instructionsColumn.classList.add("is-hidden")
		roundCounter.classList.add("is-hidden")
		newRoundColumn.classList.remove("is-hidden")
		streakColumn.classList.remove("is-hidden")

	} else {
		debugger
		showBreathCounter()
		currentRound = parseInt(currentBreathRoundSpan.innerText, 10)
		currentBreathRoundSpan.innerText = currentRound += 1
	}
}

// events 

sessionButton.addEventListener("click", beginSession)


