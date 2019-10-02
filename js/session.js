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

// helpers

function beginBreathHolding() {
	if (event.keyCode == 32) {
		resetTimer()
		// holdBreathSection.classList.add("is-hidden")
		breathColumn.classList.add("is-hidden")
		instructionsColumn.classList.add("is-hidden")

		currentRound = parseInt(currentBreathRoundSpan.innerText, 10)
		currentBreathRoundSpan.innerText = currentRound += 1
		// currentHoldRoundSpan.innerText = currentRound += 1
		document.removeEventListener('keyup', beginBreathHolding)
		currentBreath = 0
		breathCount.innerText = currentBreath

	}
}

function beginSession(){
	document.addEventListener("keyup", incrementBreath)
	newRoundColumn.classList.add("is-hidden")
	streakColumn.classList.add("is-hidden")
	breathColumn.classList.remove("is-hidden")
	instructionsColumn.classList.remove("is-hidden")
	roundCounter.classList.remove("is-hidden")

	let totalRounds = roundsInput.value
	if (totalRounds === "") {
		totalRounds = 1
	}
	let currentRound = 1
	totalRoundsSpan.innerText = totalRounds
	currentBreathRoundSpan.innerText = currentRound
}

function incrementBreath (event) {
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

function createTimer(){
	debugger
	// let timerDiv = document.createElement("DIV")
	// let timerContainer = document.createElement("DIV")
	// let timer = document.createElement("P")

	// timerDiv.className = "notification is-info"
	// timer.className = "timer has-text-centered is-size-1"
	// timer.innerText = ""

	// timerDiv.appendChild(timerContainer)
	// timerContainer.appendChild(timer)

	// timerColumn.appendChild(timerDiv)
	// console.log(timerDiv)

}

function holdBreath() {
	console.log(sessionSection)
	// timer.classList.remove("is-hidden")
	// sessionSection.classList.add("is-hidden")
	// holdBreathSection.classList.remove("is-hidden")

	breathColumn.classList.add("is-hidden")
	timerColumn.classList.remove("is-hidden")
	instructionsText.innerText = "Hold as long as you can! Press space when you exhale."

	startTimer()
	document.addEventListener('keyup', beginBreathHolding)
}

// events 

sessionButton.addEventListener("click", beginSession)


