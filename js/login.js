// => variables

login = document.querySelector("#login")
modal = document.querySelector("#modal")
modalCloseBttn = document.querySelector("#close")
url = "http://localhost:3000/users"

// helpers 

function closeModal(user) {
	modal.className = "modal is-clipped"
	name = user.name
	id = user.id
}

// => events

login.addEventListener("click", loginUser)

modalCloseBttn.addEventListener("click", function(){
	modal.className = "modal is-clipped"
})

// login.addEventListener('keyup', function(e) {
//     var key = e.which || e.keyCode;
//     debugger
//     if (key === 13) { // 13 is enter
//     	debugger
//       	loginUser()
//   }
// })

// => fetch 

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
	.then(userObj => {
		slapUserInfo(userObj)
		closeModal(userObj)
	})
}

// => DOM

function slapUserInfo(user){
	userHeader = document.getElementById("user-header")
	console.log(userHeader)
	userHeader.innerText = user.name 
	userHeader.dataset.id = user.id
}