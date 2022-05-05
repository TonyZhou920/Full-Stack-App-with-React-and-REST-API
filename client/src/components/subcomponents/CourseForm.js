import React from 'react';
import FormErrors from './FormErrors';

export default ({ 
  change,
  submit,
  cancel,
  submitButtonText,
  title,
  description,
  estimatedTime,
  materialsNeeded,
  errors,
  courseOwnerName
}) => {
  const handleSubmit = async (e) => {
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
        <div className="row">
          <div className="col-md-8">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <input 
                id="title" 
                name="title" 
                type="text" 
                className="input-title course--title--input" 
                placeholder="Course title..." 
                value={title}
                onChange={change}
              />
              <p>By {courseOwnerName}</p>
            </div>
    
            <div className="course--description">
              <textarea 
                id="description" 
                name="description"  
                placeholder="Course description..."
                value={description}
                onChange={change}
              >
              </textarea>
            </div>
          </div>
    
          <div className="col-md-4">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time (Hours)</h4>
                  <input 
                    id="estimatedTime" 
                    name="estimatedTime" 
                    type="number" 
                    className="course--time--input" 
                    placeholder="Hours" 
                    value={estimatedTime}
                    onChange={change}
                  />
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <textarea 
                    id="materialsNeeded" 
                    name="materialsNeeded" 
                    placeholder="List materials..."
                    value={materialsNeeded}
                    onChange={change}
                  >
                  </textarea>
                </li>
              </ul>
            </div>
          </div>
  
        </div>

        <div className="grid-100 pad-bottom">
          <div>
            <button className="button" type="submit">{submitButtonText}</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>

    </div>
  );
  
}