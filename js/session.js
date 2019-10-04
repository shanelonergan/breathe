// variables 

let url ='https://breathe-daily.herokuapp.com'
let sessionsUrl = url + "/sessions"
let sessionButton = document.querySelector("#new-session")
// let landing = document.querySelector("#landing")
// let timer = document.querySelector("#timerContainer")
let roundsInput = document.querySelector("#rounds")
// let sessionSection = document.querySelector("#session")
let totalRoundsSpan = document.querySelector("#total-rounds")
let currentBreathRoundSpan = document.querySelector("#breath-current-round")
let breathCount = document.querySelector("#breath-count")
let breathDiv = document.querySelector("#breath-div")
// let holdBreathSection = document.querySelector("#hold-breath")
let roundCounter = document.querySelector("#round-counter")
let upArrow = document.querySelector("#up-arrow")
let downArrow = document.querySelector("#down-arrow")
let roundCount = document.querySelector("#round-count")
let userHeader = document.querySelector("#user-header")
let streakCount = document.querySelector("#streak-count")

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

	let totalRounds = parseInt(roundCount.innerText, 10)

	let currentRound = 1 // set the first round
	totalRoundsSpan.innerText = totalRounds
	currentBreathRoundSpan.innerText = currentRound
	currentBreath = 0
	breathCount.innerText = currentBreath
	instructionsText.innerText = "We will start with 30 deep breaths. After each exhale, hit the space key. After your 30th breath, exhale halfway, and then press the spacebar. Begin holding your breath!"

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
		if (currentBreath === 30) {
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
	instructionsText.style.fontSize = '4vw' 
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
		instructionsText.style.fontSize = '4.5vw' 
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

function shortHold(){
	document.addEventListener("keyup", endRound)
	breathColumn.classList.add("is-hidden")
	timerColumn.classList.remove("is-hidden")
	instructionsText.innerText = "Hold for 30 seconds. You are almost done! Press space when you exhale."
	instructionsText.style.fontSize = '3.435vw' 
	startTimer()
}

function endRound() {
	// coming from add short hold
	if (event.keyCode == 32) {
		document.removeEventListener("keyup", endRound)
		timerColumn.classList.add("is-hidden")

		if (parseInt(currentBreathRoundSpan.innerText, 10) === parseInt(totalRoundsSpan.innerText, 10)) {
			instructionsColumn.classList.add("is-hidden")
			roundCounter.classList.add("is-hidden")
			newRoundColumn.classList.remove("is-hidden")
			streakColumn.classList.remove("is-hidden")
			document.removeEventListener("keyup", incrementBreath)
			instructionsText.style.fontSize = '2.3vw'
			updateUserSessions()
			resetTimer()

		} else {
			
			showBreathCounter()
			resetTimer()
			currentRound = parseInt(currentBreathRoundSpan.innerText, 10)
			currentBreathRoundSpan.innerText = currentRound += 1
			currentBreath = 0
			breathCount.innerText = currentBreath
			instructionsText.innerText = "We will start with 30 deep breaths. After each exhale, hit the space key. After your 30th breath, exhale halfway, and then press the spacebar. Begin holding your breath!"
			instructionsText.style.fontSize = '2.3vw'
		}
	}
}

// events 

sessionButton.addEventListener("click", beginSession)
upArrow.addEventListener("click", incrementRound)
downArrow.addEventListener("click", incrementRound)

function incrementRound(){
	let roundNum = parseInt(roundCount.innerText)
	if (event.target.id === "up-arrow") {
		roundNum += 1
	} else {
		roundNum -= 1
		if (roundNum <= 0) {
			roundNum = 1
		}
	}
	roundCount.innerText = roundNum 
}

// fetch

function updateUserSessions(){
	let userId = userHeader.dataset.id
	let roundNum = parseInt(roundCount.innerText)
	fetch(sessionsUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify( {user_id: userId, rounds: roundNum} )
	})
	.then(res => res.json())
	.then(resObj => updateStreak())
}

function updateStreak(){
	let userId = userHeader.dataset.id
	let userUrl = url + "/users/" + userId
	fetch(userUrl)
	.then(res => res.json())
	.then(userObj => slapStreak(userObj))
}

function slapStreak(user){
	console.log(user)
	streak = user.streak
	if (streak === null) {
		streak = 0
	}
	console.log(streak)
	streakCount.innerText = streak
}
