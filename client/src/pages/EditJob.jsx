import { FormRow, InputSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
// loader which get user data and setup in server.
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`); // so used get request.
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-jobs");
  }
};
// the action is used after submitting the form and it will reloads is it.
export const action = async ({ request, params }) => {
  const formData = await request.formData(); // requested data stored here.
  const data = Object.fromEntries(formData); // the Obj with fromEntries passed here as parameter.
  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success("Job Edited Successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

// this a actual component the loader and action is used for accessing these fucntions
const EditJob = () => {
  const { job } = useLoaderData();
  // console.log(job);
  //  code refactored for btn component
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title"> Edit Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />
          <InputSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <InputSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />

          <SubmitBtn formBtn />
          {/* <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button> */}
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
