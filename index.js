const characters = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'~',
	'`',
	'!',
	'@',
	'#',
	'$',
	'%',
	'^',
	'&',
	'*',
	'(',
	')',
	'_',
	'-',
	'+',
	'=',
	'{',
	'[',
	'}',
	']',
	',',
	'|',
	':',
	';',
	'<',
	'>',
	'.',
	'?',
	'/',
]

const passGenBtn = document.getElementById('generate-passwords')
const passLengthInput = document.getElementById('password-length')
const passLengthValue = document.getElementById('password-length-value')
const passLengthStrength = document.getElementById('password-length-strength')
const changeThemeInput = document.getElementById('theme')
const themeText = document.getElementById('theme-text')
const alertMsg = document.querySelector('.alert-msg')
const passCharArray = []
const charFlags = {
	uppercase: false,
	lowercase: false,
	numbers: false,
	symbols: false,
}

// SET INITIAL STATE OF GENERATOR
passLengthValue.textContent = passLengthInput.value
passLengthStrength.textContent = 'Strong!'

for (pass of document.querySelectorAll('.password-box__password')) {
	pass.textContent = ''
}

//  SET PASSWORD CHARACTERS
function setCharacters(event) {
	const input = event.currentTarget
	const { char } = input.dataset
	charFlags[char] = input.checked
	passCharArray.length = 0
	alertMsg.textContent = ''

	if (charFlags.uppercase) {
		passCharArray.push(...characters.filter(char => char.match(/[A-Z]/)))
	}

	if (charFlags.lowercase) {
		passCharArray.push(...characters.filter(char => char.match(/[a-z]/)))
	}

	if (charFlags.numbers) {
		passCharArray.push(...characters.filter(char => char.match(/[0-9]/)))
	}

	if (charFlags.symbols) {
		passCharArray.push(...characters.filter(char => char.match(/\W/) || char.match('_')))
	}

	generatePassword()
}

// GENERATE PASSWORDS
function generatePassword() {
	if (passCharArray.length !== 0) {
		for (pass of document.querySelectorAll('.password-box__password')) {
			let j = 0
			let stringContainer = ''

			while (j < Number(passLengthInput.value)) {
				const random = Math.floor(Math.random() * passCharArray.length)
				stringContainer += passCharArray[random]
				j++
			}
			pass.textContent = stringContainer
			passLengthValue.textContent = passLengthInput.value
		}
	} else {
		for (pass of document.querySelectorAll('.password-box__password')) {
			pass.textContent = ''
			passLengthValue.textContent = passLengthInput.value
			alertMsg.style.color = 'var(--clr-gen-3)'
			alertMsg.textContent = 'Please choose any type of characters!'
			alertMsg.classList.remove('fade')
			void alertMsg.offsetWidth
			alertMsg.classList.add('fade')
		}
	}

	passLengthStrength.textContent = getPasswordStrengthString(Number(passLengthInput.value))
}

// DETERMINE STRENGTH OF PASSWORD BASED ON ITS LENGTH
function getPasswordStrengthString(length) {
	if (length < 8) return 'Weak...'
	if (length < 16) return 'Average...'
	if (length < 24) return 'Strong!'
	return 'Very Strong!!!'
}

// COPY PASSWORDS
function copyPassword(event) {
	for (pass of document.querySelectorAll('.password-box__password')) {
		pass = event.currentTarget
		if (pass.textContent === '') {
			console.log('hi')
			alertMsg.style.color = 'var(--clr-gen-3)'
			alertMsg.textContent = 'Please choose any type of characters!'
			alertMsg.classList.remove('fade')
			void alertMsg.offsetWidth
			alertMsg.classList.add('fade')
		} else {
			navigator.clipboard.writeText(pass.textContent)
		}
	}
}

// CHANGE COLOR THEME
function changeTheme() {
	if (changeThemeInput.checked) {
		for (element of document.querySelectorAll('.change-theme')) {
			element.classList.add('dark-theme')
			themeText.textContent = 'Dark'
		}
	} else {
		for (element of document.querySelectorAll('.change-theme')) {
			element.classList.remove('dark-theme')
			themeText.textContent = 'Light'
		}
	}
}

// EVENT LISTENERS
passLengthInput.addEventListener('input', setCharacters)
passGenBtn.addEventListener('click', setCharacters)
changeThemeInput.addEventListener('click', changeTheme)

for (input of document.querySelectorAll('.set-char')) {
	input.addEventListener('input', setCharacters)
}

for (pass of document.querySelectorAll('.password-box__password')) {
	pass.addEventListener('click', event => {
		pass = event.currentTarget

		if (pass.textContent === '') {
			alertMsg.style.color = 'var(--clr-gen-3)'
			alertMsg.textContent = 'Please choose any type of characters!'
			alertMsg.classList.remove('fade')
			void alertMsg.offsetWidth
			alertMsg.classList.add('fade')
		} else {
			navigator.clipboard.writeText(pass.textContent)
			alertMsg.style.color = 'var(--clr-gen-main)'
			alertMsg.textContent = 'Password copied!'
			alertMsg.classList.remove('fade')
			void alertMsg.offsetWidth
			alertMsg.classList.add('fade')
		}
	})
}
