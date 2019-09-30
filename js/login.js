login = document.querySelector("#login")
modal = document.querySelector("#modal")
url = "http://localhost:3000/users"

login.addEventListener("click", loginUser)

function closeModal(user) {
	modal.className = "modal is-clipped"
	name = user.name
	id = user.id
}

function loginUser(evt) {
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
	.then(userObj => closeModal(userObj))
}