import React, { useState } from 'react';

const Form = () => {
  const [inputs, setInputs] = useState({});

  const handleInputChange = (e) => {
    e.persist();
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
      alert('submitted!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={inputs.email || ''}
        onChange={handleInputChange}
        placeholder="Your Email"
        required
      />
      <label htmlFor="item">Reminder Item</label>
      <input
        type="text"
        id="item"
        name="item"
        value={inputs.item || ''}
        onChange={handleInputChange}
        placeholder="This will be used as a subject line for your reminder email!"
        required
      />
      <label htmlFor="message">Message</label>
      <textarea
        type="text"
        id="message"
        name="message"
        value={inputs.message || ''}
        onChange={handleInputChange}
        placeholder="If you would like to see your notes in the email, feel free to include them here."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
