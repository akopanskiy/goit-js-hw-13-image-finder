import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    basicLightbox
      .create(
        `
    <img src="${event.target.getAttribute(
      'data-source',
    )}" width="800" height="600">
`,
      )
      .show();
  }
}
export default openModal;
