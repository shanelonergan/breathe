// => variables

login = document.querySelector("#login")
modal = document.querySelector("#modal")
modalCloseBttn = document.querySelector("#close")
url = "http://localhost:3000/users"

// helpers 

function closeModal() {
	modal.className = "modal is-clipped"
	// name = user.name
	// id = user.id
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
	fetch('http://localhost:3000/users', {
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
		// closeModal(userObj)
		updateStreak()
	})
}

// => DOM

function slapUserInfo(user){
	banner = document.querySelector("#banner")
	userHeader = document.createElement("H1")
	userHeader.innerText = user.name
	userHeader.className += "column has-text-right is-size-1 has-text-primary animated bounceInDown"
	userHeader.dataset.id = user.id
	userHeader.id = "user-header"
	banner.appendChild(userHeader)
}