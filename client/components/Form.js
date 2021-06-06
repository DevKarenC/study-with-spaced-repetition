import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createEmail } from '../redux/email';

const Form = (props) => {
  const [inputs, setInputs] = useState({});

  const handleInputChange = (e) => {
    e.persist();
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
      props.addEmail(inputs);
      setInputs(() => ({
        [e.target.name]: '',
      }));
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
        required
      />
      <label htmlFor="item">Reminder Item</label>
      <input
        type="text"
        id="item"
        name="item"
        value={inputs.item || ''}
        onChange={handleInputChange}
        placeholder="Subject line for your email"
        required
      />
      <label htmlFor="message">Message</label>
      <textarea
        type="text"
        id="message"
        name="message"
        value={inputs.message || ''}
        onChange={handleInputChange}
        placeholder="Study Materials"
        rows="10"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    emails: state.emails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEmail: (newEmail) => dispatch(createEmail(newEmail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
