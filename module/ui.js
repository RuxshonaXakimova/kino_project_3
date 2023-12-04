import { box_one_bottom, now_playing, setTrailer } from "../main"
import { getData } from "./helpers"

export function reload(arr, place, genres) {
  place.innerHTML = ""

  for (let item of arr) {

    let box_one_item = document.createElement('div')
    let item_picture = document.createElement('div')
    let item_rating = document.createElement('div')
    let item_h5 = document.createElement('h5')
    let item_p = document.createElement('p')
    let genres_Title = []

    for (let id of item.genre_ids) {
      for (let genre of genres) {
        if (id === genre.id) {
          genres_Title.push(genre.name)
        }
      }
    }

    box_one_item.classList.add('box_one_item')
    item_picture.classList.add('item_picture')
    item_picture.style.background = `url(https://image.tmdb.org/t/p/original${item.poster_path})`
    item_picture.style.backgroundPosition = 'center'
    item_picture.style.backgroundRepeat = 'no-repeat'
    item_picture.style.backgroundSize = 'cover'
    item_rating.classList.add('item_rating')
    item_rating.innerHTML = item.vote_average.toFixed(2)
    item_h5.classList.add('item_h5')
    item_h5.innerHTML = item.title
    item_p.classList.add('item_p')
    item_p.innerHTML = genres_Title.join(', ')

    let bg_blue_div = document.createElement('div')
    let bg_blue_btn = document.createElement('button')
    let link = document.createElement('a')

    bg_blue_div.classList.add('film_bg')
    bg_blue_btn.classList.add('bg_blue_btn')
    link.classList.add('link')
    link.href = `./movie.html?id=${item.id}`
    link.innerHTML = "Карточка фильма"



    bg_blue_div.append(bg_blue_btn)
    bg_blue_btn.append(link)

    box_one_item.onmouseenter = () => {
      bg_blue_div.classList.add('block')
    }

    box_one_item.onmouseleave = () => {
      bg_blue_div.classList.remove('block')
    }

    place.prepend(box_one_item)
    box_one_item.append(item_picture, bg_blue_div, item_h5, item_p)
    item_picture.append(item_rating)


    box_one_item.onclick = () => {
      getData(`/movie/${item.id}/videos`)
        .then(res => {
          let trailers = [...res.results].filter(film => film.type == "Trailer")
          setTrailer(trailers[0].key, item)
        })
    }

  }
}


export function popular_person(arr, place) {
  place.innerHTML = ""
  let popular_left_one = document.querySelectorAll('.popular_left_one')
  let actor_name_one = document.querySelectorAll('.actor_name_one')
  let origin_actor_name_one = document.querySelectorAll('.origin_actor_name_one')

  for (let i = 0; i < arr.length; i++) {

    if (i == 0 || i == 1) {
      popular_left_one[i].style.background = `url(https://image.tmdb.org/t/p/original${arr[i].profile_path}) center no-repeat`
      popular_left_one[i].style.backgroundSize = 'cover'
      actor_name_one[i].innerHTML = arr[i].name
      origin_actor_name_one[i].innerHTML = arr[i].original_name
    } else {


      let popular_right_box = document.createElement('div')
      let actor_info = document.createElement('div')
      let actor_name = document.createElement('p')
      let origin_actor_name = document.createElement('p')


      let actor_rating = document.createElement('div')
      let actor_rating_p = document.createElement('p')


      popular_right_box.classList.add('popular_right_box')
      actor_info.classList.add('actor_info')
      actor_name.classList.add('actor_name')
      actor_name.classList.add('name')
      actor_name.innerHTML = arr[i].name
      origin_actor_name.innerHTML = arr[i].original_name


      origin_actor_name.classList.add('origin_actor_name')
      origin_actor_name.classList.add('name_origin')


      actor_rating.classList.add('actor_rating')
      actor_rating_p.classList.add('actor_rating_p')
      actor_rating_p.innerHTML = `${i}-место`

      place.append(popular_right_box)

      popular_right_box.append(actor_info, actor_rating)
      actor_info.append(actor_name, origin_actor_name)
      actor_rating.append(actor_rating_p)
    }
  }
}

export function min_videos(arr, place) {
  place.innerHTML = " "

  for (let item of arr) {
    let video_main = document.createElement('div')
    let video_box = document.createElement('div')
    let video_box_blue_bg = document.createElement('div')
    let video_clicked_btn = document.createElement('img')
    let video_title = document.createElement('p')

    video_main.classList.add('video_main')
    video_box.classList.add('video_box')
    video_box_blue_bg.classList.add('video_box_blue_bg')
    video_title.classList.add('video_title')
    video_clicked_btn.classList.add('video_clicked_btn')
    video_box.style.background = `url(https://image.tmdb.org/t/p/original${item.backdrop_path}) center no-repeat`
    video_box.style.backgroundSize = 'cover'
    video_title.innerHTML = item.title
    video_clicked_btn.src = `../public/img/Polygon 2.svg`


    place.append(video_main)
    video_main.append(video_box, video_title)
    video_box.append(video_clicked_btn, video_box_blue_bg)

    video_box_blue_bg.onclick = () => {
      getData(`/movie/${item.id}/videos`)
        .then(res => {
          let trailers = [...res.results].filter(film => film.type == "Trailer")
          setTrailer(trailers[0].key, trailers[0].title)
          let video_box_blue_bgs = document.querySelectorAll('.video_box_blue_bg')
          video_box_blue_bgs.forEach(btn => {
            btn.classList.remove('video_clicked')
          })

          video_box_blue_bg.classList.add('video_clicked')
        })
    }
  }

}


export function reload_genres(arr, place) {
	place.innerHTML = " "

	let ids = []
  if (ids.length == 0) {
    now_playing('vv')
  }
	for (let item of arr) {
		let text = document.createElement('p')
		text.classList.add('box_one_top_p')
		text.innerHTML = item.name
		text.id = item.id
		place.append(text)

	

		text.onclick = () => {
			if (text.classList.contains('choosed_janre')) {
				ids.splice(ids.indexOf(ids.find(num => num == item.id)), 1)
				text.classList.remove('choosed_janre')
			} else {
				text.classList.add('choosed_janre')
				ids.push(item.id)
			}

			Promise.all([getData(`/discover/movie?with_genres=${ids.join(',')}`), getData('/genre/movie/list')])
				.then(([movies, genre]) => {
					console.log(movies);
					let film = movies.results.splice(1, 8)
					reload(film, box_one_bottom, genre.genres);
					getData(`/movie/${movies.results[0].id}/videos`)
						.then(res => {
							setTrailer(res.results[0].key, res.results[0].name)
						})

				})

			if(ids.length ==0){
				now_playing('vv')
			}
		}
	}
}


export function search_movie_box(arr, place) {
  place.innerHTML = " "

  for(let item of arr){
    let search_movie_box = document.createElement('div')
    let search_movie_left = document.createElement('div')
    let search_movie_right = document.createElement('div')
    let search_movie_img = document.createElement('img')
    let search_movie_info = document.createElement('div')
    let search_movie_name = document.createElement('p')
    let search_movie_janre = document.createElement('p')
    let search_movie_rate = document.createElement('p')

    search_movie_box.classList.add('search_movie_box')
    search_movie_left.classList.add('search_movie_left')
    search_movie_right.classList.add('search_movie_right')
    search_movie_img.classList.add('search_movie_img')
    search_movie_info.classList.add('search_movie_info')
    search_movie_name.classList.add('search_movie_name')
    search_movie_janre.classList.add('search_movie_janre')
    search_movie_rate.classList.add('search_movie_rate')

    search_movie_img.src = `https://image.tmdb.org/t/p/original${item.poster_path}`
    search_movie_name.innerHTML = item.title
    search_movie_janre.innerHTML = item.janres
    search_movie_rate.innerHTML = item.popularity

    place.append(search_movie_box)
    search_movie_box.append(search_movie_left, search_movie_right)
    search_movie_left.append(search_movie_img,search_movie_info)
    search_movie_info.append(search_movie_name, search_movie_janre)
    search_movie_right.append(search_movie_rate)
  }
}


export function search_actor_box(arr, place) {
  place.innerHTML = " "

  for(let item of arr){
    let search_actor_box = document.createElement('div')
    let search_actor_left = document.createElement('div')
    let search_actor_img = document.createElement('img')
    let search_actor_info = document.createElement('div')
    let search_actor_name = document.createElement('p')
    let search_actor_janre = document.createElement('p')

    search_actor_box.classList.add('search_actor_box')
    search_actor_left.classList.add('search_actor_left')
    search_actor_img.classList.add('search_actor_img')
    search_actor_info.classList.add('search_actor_info')
    search_actor_name.classList.add('search_actor_name')
    search_actor_janre.classList.add('search_actor_job')

    search_actor_img.src = `https://image.tmdb.org/t/p/original${item.profile_path}`
    search_actor_name.innerHTML = item.name
    search_actor_janre.innerHTML = item.job

    place.append(search_actor_box)
    search_actor_box.append(search_actor_left)
    search_actor_left.append(search_actor_img,search_actor_info)
    search_actor_info.append(search_actor_name, search_actor_janre)
  }
}