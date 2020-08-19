import templateCountries from "./templates/imagesHbs.hbs";
import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const gallery = document.querySelector('.gallery');
const keyWord = document.querySelector('.keyWord');
const enterKey = document.querySelector('.load')
const loadMore = document.querySelector('.load__more')

console.log(screen.height)

let keyValue;
let page = 0;
const galleryItems = function() {
    keyValue = keyWord.value;
    page += 1;
    addImages(keyValue, page)
        .then((list) => list.json())
        .then((list) => addItem(list));
    loadMore.classList.add('is__active')
}

const addItem = function(list) {
    const templateItems = templateCountries(list.hits);
    gallery.insertAdjacentHTML('beforeend', templateItems);
}

const addNewItems = function() {
    galleryItems()
    screenScroll()
}

const screenScroll = function() {
    const sctrrenTime = setTimeout(() => {
        scrollBy({
            top: (screen.height - 250),
            behavior: "smooth"
        });
    }, 100);
}

const addImages = function(keyWord, page) {
    const find = fetch(`
        https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${keyWord}&page=${page}&per_page=12&key=17937639-afdfa4080eb94060ee59a5ab1`)
    return find;
};

enterKey.addEventListener('click', galleryItems);
loadMore.addEventListener('click', addNewItems);