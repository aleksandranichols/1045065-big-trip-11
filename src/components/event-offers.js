const returnOfferMarkUp = (name, price) => {
  return (`<li class="event__offer">
          <span class="event__offer-title">${name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
         </li>`);
};

export const returnEventOffers = (offers) => {
  let {names, prices} = offers;
  const offersMarkUp = [];
  names.forEach((name, index) => {
    offersMarkUp.push(returnOfferMarkUp(name, prices[index]));
  });
  return (`<ul class="event__selected-offers">${offersMarkUp.join(`\n`)}</ul>`);
};
