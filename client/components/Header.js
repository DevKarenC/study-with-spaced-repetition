import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>
        Study with <br />
        Spaced Repetition!
      </h1>
      <p>
        Have you ever wondered -{' '}
        <span>
          only if someone reminded me to review this
          super-important-crucial-never-forget topic every week before I forget
          everything...
        </span>
        🤔 ? If so, <span>Spaced Repetition</span> is perfect for you! It is one
        of the best ways to convert your short-term memory to long-term memory,
        and we are here to help you.
      </p>
      <p>
        {`Simply type your email, what you wish to review, and/or your study materials to be sent to your inbox. The reminder email will be sent out every Saturday and stop automatically after 4 emails have been sent.`}
      </p>
    </header>
  );
};
export default Header;
