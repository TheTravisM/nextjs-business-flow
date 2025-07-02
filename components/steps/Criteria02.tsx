import React from "react";

export default function Criteria02() {
  return (
    <main id="criteria-02" className="modal__content content">
      <h2 className="content__title">
        Which record type(s) should be included?
      </h2>
      <section className="options options--criteria-01">
        <div className="options__item options__item--selected">
          <div className="options__icon icon--password"></div>
          <span className="options__text">Password</span>
        </div>
        <div className="options__item">
          <div className="options__icon icon--company-KB-article"></div>
          <span className="options__text">Company KB Article</span>
        </div>
        <div className="options__item">
          <div className="options__icon icon--website"></div>
          <span className="options__text">Central KB Article</span>
        </div>
        <div className="options__item">
          <div className="options__icon icon--expiration"></div>
          <span className="options__text">Process</span>
        </div>
        <div className="options__item">
          <div className="options__icon icon--user"></div>
          <span className="options__text">Website</span>
        </div>
        <div className="options__item">
          <div className="options__icon icon--group"></div>
          <span className="options__text">Rack</span>
        </div>
        <div className="options__item">
          <div className="options__icon icon--integration"></div>
          <span className="options__text">Netword</span>
        </div>
        <div className="options__item">
          <div className="options__icon icon--integration"></div>
          <span className="options__text">Asset</span>
        </div>
        TODO: Add check box "Select All"
      </section>
    </main>
  );
}