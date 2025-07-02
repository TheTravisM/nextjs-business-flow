import React from "react";

export default function Action01() {
  return (
    <>
        {/* action */}
        <main id="action" className="modal__content content--action">
          <h2 className="content__title">
            What should happen once the workflow begins?
          </h2>
          <p className="content__details">
            Select at least 1 action to continue. You can add additional actions
            later
          </p>

          <section className="options options--criteria-01">
            <div className="options__item options__item--selected">
              <div className="options__icon icon--record-created"></div>
              <span className="options__text">Add flag</span>
            </div>
            <div className="options__item">
              <div className="options__icon icon--record-updated"></div>
              <span className="options__text">Send Email</span>
            </div>
            <div className="options__item">
              <div className="options__icon icon--record-updated"></div>
              <span className="options__text">Send webhook</span>
            </div>
          </section>
        </main>
    </>
  );
}
