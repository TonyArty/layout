const detailData = () => {

	const preloder = document.querySelector('.preloder')

	const renderGanreList = (ganres) => {
		const dropDownBlock = document.querySelector('.header__menu .dropdown')

		dropDownBlock.innerHTML = ''

		ganres.forEach(ganre => {
			dropDownBlock.insertAdjacentHTML('beforeend', `
				<li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
			`)
		})
	}

	const renderAnimeDetails = (array, itemId) => {
		const animeObj = array.find(item => item.id == itemId)
		const imageBlock = document.querySelector('.anime__details__pic')
		const viewsBlock = imageBlock.querySelector('.view')
		const detailsText = document.querySelector('.anime__details__text')
		const titleBlock = detailsText.querySelector('.anime__details__title h3')
		const origTitleBlock = detailsText.querySelector('.anime__details__title span')
		const descrBlock = detailsText.querySelector('p')
		const widgetList = document.querySelectorAll('.anime__details__widget ul li')
		const breadCrumbGanre  = document.querySelector('.breadcrumb__links span')
		console.log(animeObj)
		
		if (animeObj) {
			imageBlock.dataset.setbg = animeObj.image
			viewsBlock.innerHTML = ''
			viewsBlock.insertAdjacentHTML('beforeend', `
				<i class="fa fa-eye"></i> ${animeObj.views}
			`)
			titleBlock.textContent = animeObj.title
			origTitleBlock.textContent = animeObj['original-title']
			document.title = `${animeObj.title} | Anime`
			descrBlock.textContent = animeObj.description
			widgetList[0].innerHTML = ''
			widgetList[0].insertAdjacentHTML('beforeend', `
				<span>Date aired:</span> ${animeObj.date}
			`)
			widgetList[1].innerHTML = ''
			widgetList[1].insertAdjacentHTML('beforeend', `
				<span>Rating:</span> ${animeObj.rating}
			`)
			widgetList[2].innerHTML = ''
			widgetList[2].insertAdjacentHTML('beforeend', `
				<span>Ganre:</span> ${animeObj.tags.join(', ')}
			`)
			breadCrumbGanre.textContent = animeObj.ganre

			document.querySelectorAll('.set-bg').forEach((elem) => {
				elem.style.backgroundImage = `url(${elem.dataset.setbg})`
			})

			setTimeout(() => {
				preloder.classList.remove('active')
			}, 500)
		} else {
			console.log('Аниме отсутствует!')
		}
		
	}

	fetch('https://anime-d494d-default-rtdb.firebaseio.com/anime.json')
	.then((response) => response.json())
	.then((data) => {
		const ganres = new Set()
		const ganreParams = new URLSearchParams(window.location.search).get('itemId')
		// console.log(ganreParams);
		
		data.forEach((item) => {
			ganres.add(item.ganre)
		})

		if (ganreParams) {
			renderAnimeDetails(data, ganreParams)
		} else {
			console.log('Аниме отсутсвует!')
		}
		
		renderGanreList(ganres)
	})

}
detailData()