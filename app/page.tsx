//import Image from "next/image";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <main className="main">
      <dialog id="new-work-flow" className="modal" open>
        <header className="modal__header">
          <h1 className="modal__title">New Work Flow</h1>
          <button className="modal__close">x</button>
        </header>

        <nav className="modal__progress">
          <ul className="modal__progress-list">
            <li className="modal__progress-item modal__progress-item--active">
              <div className="progress-icon"></div>
              <span className="progress__label">Criteria</span>
            </li>
            <li className="modal__progress-item">
              <div className="progress-icon"></div>
              <span className="progress__label">Trigger</span>
            </li>
            <li className="modal__progress-item">
              <div className="progress-icon"></div>
              <span className="progress__label">Action</span>
            </li>
            <li className="modal__progress-item">
              <div className="progress-icon"></div>
              <span className="progress__label">Review</span>
            </li>
          </ul>
        </nav>

        <section className="modal__content">
          <ul className="modal__list">
            <li className="modal__item">Company</li>
            <li className="modal__item">Record</li>
            <li className="modal__item">Website</li>
            <li className="modal__item">Expiration</li>
            <li className="modal__item">User</li>
            <li className="modal__item">Group</li>
            <li className="modal__item">Integration</li>
          </ul>
        </section>

        <footer className="modal__footer">
          <button className="modal__button modal__button--secondary">
            Back
          </button>
          <button className="modal__button modal__button--tertiary">
            Save and Finish Later
          </button>
          <button className="modal__button modal__button--primary">Next</button>
        </footer>
      </dialog>
    </main>
  );
}
