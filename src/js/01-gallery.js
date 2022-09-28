import SimpleLightbox from "simplelightbox";

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const gallerySimpleLightbox = {

    refs: {
        gallery: document.querySelector('.gallery'),
    },
    lightboxWrapSelector: '.gallery a',
    items: galleryItems,

    markupTemplate({ preview, original, description } = {}) {
        const template = `
        <a href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}"/>
        </a>`;

        return template;
    },

    createMarkup() {
        return this.items.map(this.markupTemplate).join('');
    },

    createLightbox() {
        this.renderMarkup();
        const lightbox = new SimpleLightbox(this.lightboxWrapSelector, {
            captionsData: 'alt',
            captionDelay: 250,
        });        
    },

    renderMarkup() {
        this.refs.gallery.insertAdjacentHTML('beforeend', this.createMarkup());
        
        
    },
};

gallerySimpleLightbox.createLightbox();