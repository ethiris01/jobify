const formRow = (props) => {
  return (
    <div className="form-row">
      <label htmlFor={props.name} className="form-label">
        {props.labelText || props.name}
      </label>
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        className="form-input"
        defaultValue={props.defaultValue || ""}
        placeholder={props.placeholder || ""}
        onChange={props.onChange}
        required
      ></input>
    </div>
  );
};
export default formRow;

// first you should pass the value like this
// const formRow = (props) =>
// You can pass the value as props and call it as props.type ,props.name

//  or the name and type should be pass it the function as jsx element
// / ex {type,name,value}
