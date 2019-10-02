// variables 

let sessionButton = document.querySelector("#new-session")
let landing = document.querySelector("#landing")
let timer = document.querySelector("#timerContainer")
let roundsInput = document.querySelector("#rounds")

// helpers

function beginSession(){
	landing.className += " is-hidden"
	timer.classList.remove("is-hidden")
	let rounds = roundsInput.value
	console.log(rounds)
}

// events 

sessionButton.addEventListener("click", beginSession)
