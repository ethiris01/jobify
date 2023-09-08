import { FormRow, InputSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext(); // searchValues id params are coming from allJobs.jsx
  // searchValues ex:  {search: 'a', jobStatus: 'pending', jobType: 'all', sort: 'newest'}

  const { search, jobStatus, jobType, sort } = searchValues; // values set up as searchValues

  const submit = useSubmit(); // submit used on change property in below
  // debounce
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout); // get the id by user. and clear the timeout functionality
      timeout = setTimeout(() => {
        // this one will get timeOut
        onChange(form); // calling the function.
      }, 2000);
      //  console.log(form);  this function has actual event listener hold the values of form.
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search from</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            // onChange={(e) => {  submit(e.currentTarget.form); }}  onChange functionality changed.
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <InputSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <InputSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <InputSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          {/* temporary
          <SubmitBtn formBtn /> */}
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
