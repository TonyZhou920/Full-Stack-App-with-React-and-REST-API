import React from 'react';
import FormErrors from './FormErrors';

export default ({
  cancel,
  errors,
  submit,
  submitButtonText,
  inputFields
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  }

  const handleCancel = (e) => {
    e.preventDefault();
    cancel();
  }

  return (
    <div>
      <FormErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        <div>
          { inputFields() }
        </div>
        <div className="grid-100 pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}