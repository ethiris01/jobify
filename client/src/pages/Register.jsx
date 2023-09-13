import { Form, redirect, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch"; // base url provided with axios as customFetch
import { toast } from "react-toastify"; // it will used to show up the successful message on screen.

// export the register user as object -action
export const action = async ({ request }) => {
  const formData = await request.formData(); // empty formData will be shown upp here
  const data = Object.fromEntries(formData); // name,email and password are shown up here

  try {
    await customFetch.post("/auth/register", data); // the baseUrl is connected with post and data called up the data
    toast.success("Registration successful"); // if it true this message will pop up
    return redirect("/login"); // after register it will redirect to login
  } catch (error) {
    // if not error will be shown up.
    toast.error(error?.response.data?.msg); // if it is false this message will pop up with prop 'email exits'
    return error;
  }
};

const Register = () => {
  // navigation state for form submitting
  // const navigation = useNavigation();
  // console.log(navigation);
  // const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" placeholder="Your Name" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          placeholder="Your Last Name"
        />
        <FormRow type="text" name="location" placeholder="Earth" />
        <FormRow type="email" name="email" placeholder="name@gmail.com" />
        <FormRow
          type="password"
          name="password"
          placeholder="Max 8 characters"
        />
        <SubmitBtn formBtn />
        {/* the class used and condition for submitting */}
        {/* <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button> */}
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;

// Link method is used only in our local projects
// we should use traditional method < a href =""> for external web sources
