const modalJS = () => {
	const modal = document.querySelector('.search-model')
	const modalBtn = document.querySelector('.icon_search')
	const closeBtn = modal.querySelector('.search-close-switch')
	const inputsearch = modal.querySelector('#search-input')
	
	modalBtn.addEventListener('click', () => {
		modal.style.display = 'block'
		inputsearch.focus();
	})
	closeBtn.addEventListener('click', () => {
		modal.style.display = 'none'
	})
	
	inputsearch.addEventListener('input', updateValue)
	function updateValue(e) {
		console.log(e.target.value)
	}
}
modalJS()