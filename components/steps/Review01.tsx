import React from "react";

export default function Review01() {
  return (
    <>
      {/* review */}
        <main id="review" className="modal__content content--review">
          <h2 className="content__title">
            Review your workflow below. Click a step to make edits if needed.
          </h2>

          <section className="review">
            <p>When any of the follow record types is created, add a flag.</p>
            <ul>
              <li>Password</li>
              <li>Company KB article</li>
              <li>Central KB article</li>
              <li>Process</li>
              <li>Website</li>
              <li> Rack</li>
              <li>Network</li>
              <li>Asset</li>
            </ul>
          </section>
        </main>
    </>
  );
}
