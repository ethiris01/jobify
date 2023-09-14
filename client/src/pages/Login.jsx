import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
// action used to submit the form as post method

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    //useActionData method - for error of using short passwords
    const errors = { msg: "" };
    if (data.password.length < 8) {
      errors.msg = "Password should be at least 8 characters!";
      return errors;
    }
    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries(); // queryClient queries
      toast.success("Login successful");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response.data?.msg);
      // toast.error(error?.response.errors?.msg);
      return error;
    }
  };

const Login = () => {
  // test user functionality user created in database
  // navigate the user demo for app.
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "brucewayne@gmail.com",
      password: "DarKnight",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a  test drive!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response.data?.msg);
    }
  };
  // navigation state for form submitting and setup the react toastify message for submitting
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";

  // useActionData returns the data to nearest routers.
  const errors = useActionData(); // errors password 8 characters
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {errors?.msg && <p style={{ color: "red" }}> {errors.msg}</p>}
        <FormRow type="email" name="email" placeholder="name@gmail.com" />
        <FormRow type="password" name="password" placeholder="●●●●●●●●" />
        <SubmitBtn />
        {/* <button
            type="submit"
            className="btn btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button> */}
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
