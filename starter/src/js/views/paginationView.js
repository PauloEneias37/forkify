import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }
  _generateButtonMarkup(page, type) {
    return `
      <button data-goto="${page}" class="btn--inline pagination__btn--${type}">
        ${
          type === 'prev'
            ? `
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page}</span>
        `
            : `
          <span>Page ${page}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        `
        }
      </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numPages > 1) {
      return this._generateButtonMarkup(curPage + 1, 'next');
    }

    if (curPage === numPages && numPages > 1) {
      return this._generateButtonMarkup(curPage - 1, 'prev');
    }

    if (curPage < numPages) {
      return (
        this._generateButtonMarkup(curPage - 1, 'prev') +
        this._generateButtonMarkup(curPage + 1, 'next')
      );
    }

    return '';
  }
}

export default new PaginationView();
