export function reload(arr, place, bg) {
    place.innerHTML = ""

    for (let item of arr) {

        let box_one_item = document.createElement('div')
        let item_picture = document.createElement('div')
        let item_rating = document.createElement('div')
        let item_h5 = document.createElement('h5')
        let item_p = document.createElement('p')

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
        item_p.innerHTML = 'Трилер'

        let bg_blue_div = document.createElement('div')
        let bg_blue_btn = document.createElement('button')

        bg_blue_div.classList.add('film_bg')
        bg_blue_btn.classList.add('bg_blue_btn')

        bg_blue_btn.innerHTML = 'Карточка фильма'
        bg_blue_div.append(bg_blue_btn)

        box_one_item.onmouseenter = () => {
            bg_blue_div.classList.add('block')
        }

        box_one_item.onmouseleave = () => {
            bg_blue_div.classList.remove('block')
        }

        place.prepend(box_one_item)
        box_one_item.append(item_picture,bg_blue_div, item_h5, item_p)
        item_picture.append(item_rating)
    }
}