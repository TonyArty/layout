const mainData = () => {

	document.title = "Главная | Anime";

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

	const renderAnimeList = (array, ganres) => {
		const wrapper = document.querySelector('.product .col-lg-8')
		wrapper.innerHTML = ''
		ganres.forEach((ganre) => {
			const producBlock = document.createElement('div')
			const listBlock = document.createElement('div')
			const list = array.filter(item => item.ganre === ganre)

			listBlock.classList.add('row')
			producBlock.classList.add('mb-5')

			producBlock.insertAdjacentHTML('beforeend', `
				<div class="row">
						<div class="col-lg-8 col-md-8 col-sm-8">
								<div class="section-title">
										<h4>${ganre}</h4>
								</div>
						</div>
						<div class="col-lg-4 col-md-4 col-sm-4">
								<div class="btn__all">
										<a href="/categories.html?ganre=${ganre}" class="primary-btn">View All <span class="arrow_right"></span></a>
								</div>
						</div>
				</div>
			`)

			list.forEach(item => {
				const tagsBlock = document.createElement('ul')
				item.tags.forEach(tag => {
					tagsBlock.insertAdjacentHTML('beforeend', `
						<li>${tag}</li>
					`)
				})

				listBlock.insertAdjacentHTML('beforeend', `
					<div class="col-lg-4 col-md-6 col-sm-6">
							<div class="product__item">
									<div class="product__item__pic set-bg" data-setbg="${item.image}">
											<div class="ep">18 / ${item.rating}</div>
											<div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
									</div>
									<div class="product__item__text">
											${tagsBlock.outerHTML}
											<h5><a href="/anime-details.html?itemId=${item.id}">${item.title}</a></h5>
									</div>
							</div>
					</div>
				`)
			})

			producBlock.append(listBlock)
			wrapper.append(producBlock)

			wrapper.querySelectorAll('.set-bg').forEach((elem) => {
				elem.style.backgroundImage = `url(${elem.dataset.setbg})`
			})
		})
		setTimeout(() => {
			preloder.classList.remove('active')
		}, 500)
	}

	const renderTopAnime = (array) => {
		const wrapper = document.querySelector('.filter__gallery')
		wrapper.innerHTML = ''
		array.forEach((item) => {
			// console.log(item);
			wrapper.insertAdjacentHTML('beforeend', `
				<div class="product__sidebar__view__item set-bg mix" data-setbg="${item.image}">
						<div class="ep">18 / ${item.rating}</div>
						<div class="view">
							<i class="fa fa-eye"></i> ${item.views}
						</div>
						<h5>
							<a href="/anime-details.html?itemId=${item.id}">${item.title}</a>
						</h5>
				</div>
			`)
			wrapper.querySelectorAll('.set-bg').forEach((elem) => {
				elem.style.backgroundImage = `url(${elem.dataset.setbg})`
			})
		})
	}

	fetch('https://anime-d494d-default-rtdb.firebaseio.com/anime.json')
	.then((response) => response.json())
	.then((data) => {
		const ganres = new Set()
		
		data.forEach((item) => {
			ganres.add(item.ganre)
		})

		renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5))
		renderAnimeList(data, ganres)
		renderGanreList(ganres)
	})
}
mainData()