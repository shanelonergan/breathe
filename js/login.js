// import url from './url.js'
// => variables
const mainHeader = document.querySelector("#main-header")
const login = document.querySelector("#login")
const loginField = document.querySelector("#field")
const modal = document.querySelector("#modal")
const modalCloseBttn = document.querySelector("#close")
const screenSize = window.screen.width

// screen size

function renderLogin() {
	if (screenSize > 500) {
		loginField.classList.add('is-grouped')
		mainHeader.classList.add('is-size-1')
	} else {
		login.classList.add('is-fullwidth')
		login.style.margin = '5vw 0'
		mainHeader.classList.add('is-size-2')
	}
}

renderLogin()

// helpers

function closeModal() {
	modal.className = "modal is-clipped"
}

// => events

login.addEventListener("click", loginUser)

document.addEventListener('keyup', loginEnter)

function loginEnter(event) {
    if (modal.classList.contains("is-active")) {
    	var key = event.which || event.keyCode;
    	if (key === 13) { // 13 is enter
      		loginUser()
      		document.removeEventListener('keyup', loginEnter)
 		}
    };

}

// => fetch

function loginUser(evt) {
	login.removeEventListener("click", loginUser)
	closeModal()
	let name = document.querySelector("#username").value
	fetch(url + '/users', {
		method: 'POST',
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: name
		})
	})
	.then(res => res.json())
	.then(userObj => {
		slapUserInfo(userObj)
		updateStreak()
	})
}

// => DOM

function slapUserInfo(user){
	banner = document.querySelector("#banner")
	userHeader = document.createElement("H1")
	userHeader.innerText = user.name
	userHeader.className += "column has-text-right has-text-primary animated bounceInDown"
	if (screenSize > 500) {
		userHeader.classList.add('is-size-1')
	} else {
		userHeader.classList.add('is-size-2')
	}
	userHeader.dataset.id = user.id
	userHeader.id = "user-header"
	banner.appendChild(userHeader)
}
