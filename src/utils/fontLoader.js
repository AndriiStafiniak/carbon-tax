import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import bebasNeue from '../assets/fonts/bebas-neue-v9-latin-regular.woff';

const loader = new FontLoader();
let loadedFont = null;

export const loadFont = () => {
    return new Promise((resolve) => {
        if (loadedFont) {
            resolve(loadedFont);
        } else {
            loader.load(bebasNeue, (font) => {
                loadedFont = font;
                resolve(font);
            });
        }
    });
}; 