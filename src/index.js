import templateCountries from "./templates/imagesHbs.hbs";
import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const gallery = document.querySelector('.gallery');
const keyWord = document.querySelector('.keyWord');
const loadMore = document.querySelector('.load')


let keyValue;
let page = 0;
const galleryItems = function() {
    keyValue = keyWord.value;
    page += 1;
    loadMore.textContent = 'Load more';
    addImages(keyValue, page)
        .then((list) => list.json())
        .then((list) => addItem(list));
}


const addItem = function(list) {
    const templateItems = templateCountries(list.hits);
    gallery.insertAdjacentHTML('beforeend', templateItems);

}

const addImages = function(keyWord, page) {
    const find = fetch(`
        https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${keyWord}&page=${page}&per_page=12&key=17937639-afdfa4080eb94060ee59a5ab1`)
    return find;
};

loadMore.addEventListener('click', galleryItems)