import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { LiaSpinnerSolid } from "react-icons/lia";

import useAuth from "../hooks/useAuth";
import { generateToken, saveUser } from "../api/apiAuth";
import { useForm } from "react-hook-form";
import Title from "../components/Shared/Title";
import backgroundImage from "../components/assets/banner.png";

const emailVerification = /\S+@\S+\.\S+/;

const statesOfNigeria = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
];

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    createUser,
    updateUserProfile,
    signInWithGoogle,
    loading,
    setLoading,
  } = useAuth();
  const { register, handleSubmit } = useForm();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const {
      name,
      gender,
      email,
      age,
      school,
      stateOfOrigin,
      nationality,
      talentCategory,
      localGovernment,
      instagramHandle,
      facebookHandle,
      phoneNumber,
      stageName,
    } = data;
  
    if (
      !name ||
      !gender ||
      !email ||
      !age ||
      !talentCategory ||
      !school ||
      !stateOfOrigin ||
      !nationality ||
      !localGovernment ||
      !instagramHandle ||
      !facebookHandle ||
      !phoneNumber ||
      !stageName
    ) {
      return toast.error("Please fill out all required fields.");
    }
  
    if (!emailVerification.test(email)) {
      return toast.error("Please enter a valid email");
    }
  
    try {
      const { user } = await createUser(email, "DefaultPassword123!");
      await updateUserProfile(name);
      await generateToken(user?.email);
      await saveUser(data);
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed.");
    }
    navigate("/");
  };
  
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      await generateToken(user?.email);
      await saveUser({
        name: user.displayName,
        email: user.email,
        googleAccount: true,
      });
      toast.success("Account created successfully!");
      navigate(from);
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Title title="Registration | Kwara Talents Harvest" />
      <header className="bg-white shadow-md text-red py-4">
        <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-2xl font-bold">
            Kwara Talents Harvest
          </h1>
          <Link to="/" className="hover:underline font-bold">
            Home
          </Link>
        </nav>
      </header>

      <div className="flex justify-center items-center px-4">
        <div className="flex flex-col w-full max-w-md sm:max-w-lg md:max-w-2xl p-4 sm:p-8 rounded-md bg-white shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="text-xl sm:text-3xl font-bold">
              Kwara Talents Harvest Season 5
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              Register and unleash your talents to the world! Join our WhatsApp
              Group{" "}
              <a
                href="https://chat.whatsapp.com/JxvKM5xasmuFOpD5zJWvWU"
                className="text-blue-500 underline"
              >
                here
              </a>{" "}
              for updates on Kwara Talents Harvest.
            </p>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 sm:mb-2 text-sm sm:text-base"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  {...register("name")}
                  className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900 text-sm sm:text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block mb-1 sm:mb-2 text-sm sm:text-base"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  {...register("gender")}
                  className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900 text-sm sm:text-base"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              {/* Add other fields here with similar responsive styling */}
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="bg-blue-500 w-full rounded-md py-2 sm:py-3 text-white text-sm sm:text-base"
              >
                {loading ? (
                  <LiaSpinnerSolid className="animate-spin mx-auto" />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px bg-gray-700"></div>
            <p className="px-3 text-sm text-gray-400">
              Signup with social accounts
            </p>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          <div
            onClick={handleGoogleSignIn}
            className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 cursor-pointer"
          >
            <FcGoogle size={32} />
            <p>Continue with Google</p>
          </div>

          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:underline hover:text-blue-500 text-gray-600"
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
