document.addEventListener("DOMContentLoaded", (event) => {

	const apiKey = '977c7ae2c0961664daec95abce419bf2';
	const getWeather = (x, y, z) => {

		try {
			let xhr = new XMLHttpRequest() //дает возможность из JavaScript делать HTTP-запросы к серверу без перезагрузки страницы

			xhr.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${x},${y}&units=metric&appid=${z}`, false); //открыли соединение
			xhr.send();

			let json = xhr.responseText;

			let data = JSON.parse(json);

			let {name:city, main: {temp:temperature}, weather:[description]} = data;

			let {icon, description: descriptionWeather} = description;



			let title = document.querySelector('.weather_city'); //создаем элемент
			title.innerText = city; // выводим данные city
			// weatherWrapper.appendChild(title); // добавляем созданый элемент классу weather_wrapper

			let subTitle = document.querySelector('.weather_description');
			subTitle.innerText = descriptionWeather;
			// weatherWrapper.appendChild(subTitle);

			let weatherTemperature = document.querySelector('.weather_temperature');
			weatherTemperature.innerText = temperature;
			// weatherWrapper.appendChild(weatherTemperature);

			let weatherIcon = document.querySelector('.weather_icon');
			weatherIcon.setAttribute('src', `http://openweathermap.org/img/w/${icon}.png`);
			// weatherWrapper.appendChild(weatherIcon);


		} catch (error) {
			console.warn(error)
		}

	}

	

	let btn = document.getElementById('submit');

	btn.addEventListener('click', (e) => {
		e.preventDefault(); //анулирование браузерных событий

		let cityInput = document.getElementById('city');
		let countryInput = document.getElementById('country');

		let cityValue = cityInput.value;
		let countryValue = countryInput.value;

		getWeather(cityValue, countryValue, apiKey);




	});

	let weatherLinks = [...document.getElementsByClassName('weather_link')];

	console.log(weatherLinks);

	weatherLinks.map((item) => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			let link = e.currentTarget;

			let city = link.getAttribute('data-city');
			let country = link.getAttribute('data-country');

			getWeather(city, country, apiKey);

		});
	})

});