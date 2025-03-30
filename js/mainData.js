const mainData = () => {
	fetch('https://anime-d494d-default-rtdb.firebaseio.com/anime.json').then((response) => {
		return response.json()
	})
	.then((data) => {
		console.log(data[3]);
	})
}
mainData()