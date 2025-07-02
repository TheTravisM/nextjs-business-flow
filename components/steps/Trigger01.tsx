import React from "react";

export default function Trigger01() {
  return (
    <>
      {/* trigger  */}
      TODO: Save and finsih later button appears from ech step onward 
      TODO:when
      an option is selected the + Add Condtion button appears,
      <main id="trigger" className="modal__content">
        <h2 className="content__title">What should trigger this workflow?</h2>

        <section className="options options--criteria-01">
          <div className="options__item options__item--selected">
            <div className="options__icon icon--record-created"></div>
            <span className="options__text">record created</span>
          </div>
          <div className="options__item">
            <div className="options__icon icon--record-updated"></div>
            <span className="options__text">record updated</span>
          </div>
          <button className="button button--text">+ Add Condition</button>
        </section>
      </main>
    </>
  );
}
