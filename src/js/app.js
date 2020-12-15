import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets';
import favorite from './views/favorites';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;

  // Events

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  document.querySelector('.tickets-sections').addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-fav')) {
      favorite.toggleClass(e.target);
      let id = e.target.dataset.id;
      favorite.filterFavorite(id, locations.lastSearch);
    }
  });

  document.querySelector('.favorite-item-info').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-favorite')) {
      favorite.toggleClass(e.target);
      let id = e.target.dataset.id;
      favorite.filterFavorite(id, locations.lastSearch);
    }
  });

  //Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    // get data from input
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    // console.log(locations.lastSearch);

    ticketsUI.renderTickets(locations.lastSearch);
  }
});
