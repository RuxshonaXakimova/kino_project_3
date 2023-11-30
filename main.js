import { getData } from "./module/helpers";
import { min_videos, popular_person, reload, reload_genres, search_actor_box, search_movie_box } from "./module/ui";

let body = document.body
let box_one_bottom = document.querySelector('.box_one_bottom')
let box_one_top_p = document.querySelectorAll('.box_one_top_p, .header_middle p')
let film_bg = document.querySelector('.film_bg')
let box_two_middle = document.querySelector('.box_two_middle')
let iframe = document.querySelector('iframe')
let traler_name = document.querySelector('.box_two_bottom_left h2')
let name_origin = document.querySelectorAll('.name_origin')
let popular_right = document.querySelector('.popular_right')
let box_two_mini_videos = document.querySelector('.box_two_mini_videos')
let box_four_bottom = document.querySelector('.box_four_bottom')
let timing_years = document.querySelectorAll('.year')
let all_time = document.querySelector('.all_time')
let timing_p = document.querySelectorAll('.time')
let janres_box = document.querySelector('.jenres')
let jenres = document.querySelectorAll('.box_one_top_p')
let search_btn = document.querySelector('.search')
let inp_search = document.querySelector('.text_search')
let box_movies_list = document.querySelector('.box_movies_list')
let box_actors_list = document.querySelector('.box_actors_list')
let box_madal = document.querySelector('.box_madal')
let main_modal = document.querySelector('.main_modal')
let all_new_movies = document.querySelector('.new_btn')


all_time.classList.add('choosed_janre')
box_madal.classList.add('none')
main_modal.classList.add('none')

search_btn.onclick = () => {
	box_madal.classList.add('block')
	main_modal.classList.add('block')
}

main_modal.onclick = () => {
	box_madal.classList.remove('block')
	main_modal.classList.remove('block')
	box_madal.classList.add('none')
	main_modal.classList.add('none')
}


function debounce(func, timeout = 300) {
	let timer;

	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	}


}

function saveInput() {
	console.log('Saving data');
}
const processChange = debounce(() => saveInput());

inp_search.onkeyup = () => {
	processChange(search(inp_search))

}

function search(inp) {
	getData(`/search/multi?query=${inp.value}`)
		.then(res => {
			let movies = res.results.filter(item => item.media_type == 'movie')
			let actors = res.results.filter(item => item.media_type == "person")
			console.log(res);
			search_movie_box(movies, box_movies_list)
			search_actor_box(actors, box_actors_list)
		})
}

all_new_movies.onclick = () => {
	Promise.all([getData('/movie/now_playing'), getData('/genre/movie/list')])
		.then(([movies, genre]) => {
			reload(movies.results, box_one_bottom, genre.genres);
			getData(`/movie/${movies.results[0].id}/videos`)
				.then(res => {
					setTrailer(res.results[0].key, res.results[0].name)
				})

		})
}


export function now_playing(smth) {
	Promise.all([getData('/movie/now_playing'), getData('/genre/movie/list')])
		.then(([movies, genre]) => {
			let film = movies.results.splice(1, 8)
			reload(film, box_one_bottom, genre.genres);
			getData(`/movie/${movies.results[0].id}/videos`)
				.then(res => {
					setTrailer(res.results[0].key, res.results[0].name)
				})

		})
}



getData('/genre/movie/list')
	.then(res => {
		reload_genres(res.genres, janres_box)

	})





box_one_top_p.forEach(btn => {
	btn.onclick = () => {
		box_one_top_p.forEach(p => {
			p.classList.remove('choosed_janre')
		})
		btn.classList.add('choosed_janre')
	}
})


export function setTrailer(video, name) {
	iframe.src = 'https://www.youtube.com/embed/' + video

	traler_name.innerHTML = name
}


getData('/person/popular')
	.then(res => {
		popular_person(res.results, popular_right)
	})



getData(`/movie/upcoming`)
	.then(res => {
		min_videos(res.results, box_two_mini_videos)
	})


Promise.all([getData(`/discover/movie?primary_release_year=2023`), getData('/genre/movie/list')])
	.then(([movies, genre]) => {
		reload(movies.results, box_four_bottom, genre.genres);
		getData(`/movie/${movies.results[0].id}/videos`)
			.then(res => {
				setTrailer(res.results[0], res.results[0].name)
			})

	})


all_time.onclick = () => {
	timing_p.forEach(btn => {
		btn.classList.remove('choosed_janre')
	})
	all_time.classList.add('choosed_janre')
	Promise.all([getData('/movie/top_rated'), getData('/genre/movie/list')])
		.then(([movies, genre]) => {
			reload(movies.results, box_four_bottom, genre.genres);
			getData(`/movie/${movies.results[0].id}/videos`)
				.then(res => {
					setTrailer(res.results[0].key, res.results[0].name)
				})

		})
}


timing_years.forEach(year => {
	year.onclick = () => {
		timing_p.forEach(btn => {
			btn.classList.remove('choosed_janre')
		})
		year.classList.add('choosed_janre')
		Promise.all([getData(`/discover/movie?primary_release_year=${year.innerHTML}`), getData('/genre/movie/list')])
			.then(([movies, genre]) => {
				reload(movies.results, box_four_bottom, genre.genres);
				getData(`/movie/${movies.results[0].id}/videos`)
					.then(res => {
						setTrailer(res.results[0], res.results[0].name)
					})

			})
	}
})

















// getData('/movie/popular')
//   .then(res => {
//   console.log(res);
// reload(res.results, box_four_bottom)
// })




















// getData('/movie/now_playing?language=ru')
//   .then(res => {
//     let film = res.results.splice(1,8)
//     reload(film, box_one_bottom, film_bg);
//   })




// getData('/genre/movie/list')
// .then(res=> {
//   console.log(res);
// })




// box_two_middle.style.background = `url(https://image.tmdb.org/t/p/original${res.poster_path}) center no-repeat`
//   box_two_middle.style.backgroundSize = 'cover'