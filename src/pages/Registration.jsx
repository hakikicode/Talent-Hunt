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
  
    // Validation checks
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
  
    // Attempt Firebase registration
    try {
      // Firebase-specific operations
      const { user } = await createUser(email, "DefaultPassword123!");
      await updateUserProfile(name);
      await generateToken(user?.email);
      await saveUser(data);
  
      toast.success("Firebase registration successful!");
    } catch (error) {
      console.error("Firebase registration failed:", error);
      toast.error("Firebase registration failed. Proceeding with backend submission.");
    }
  
    // Attempt backend registration
    try {
      // Backend-specific operations
      const response = await axios.post("/registrations", data);
      if (response.status === 201) {
        toast.success("Backend registration successful!");
      }
    } catch (error) {
      console.error("Backend registration failed:", error);
      toast.error("Backend registration failed.");
    }
  
    // Navigate after submission attempts
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
    <div className="min-h-screen py-10 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Title title="Registration | Kwara Talents Harvest" />
      <header className="bg-white-800 text-red py-4">
        <nav className="max-w-7xl mx-auto px-4 flex justify-between">
          <h1 className="text-2xl font-bold">Kwara Talents Harvest</h1>
          <Link to="/" className="hover:underline font-bold">Home</Link>
        </nav>
      </header>
      <div className="flex justify-center items-center">
        <div className="flex flex-col max-w-2xl p-8 rounded-md sm:p-10 bg-white shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Kwara Talents Harvest season 5</h1>
            <p className="text-sm text-gray-400">Register and Unleash Your Talents To The World, Join our WhatsApp Group <p><a href='https://chat.whatsapp.com/JxvKM5xasmuFOpD5zJWvWU' className='text-blue-500 underline'>https://chat.whatsapp.com/JxvKM5xasmuFOpD5zJWvWU</a></p> to get updates on Kwara Talents Harvest Seasons</p>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">Name</label>
                <input type="text" name="name" id="name" {...register("name")} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" />
              </div>
              <div>
                <label htmlFor="gender" className="block mb-2 text-sm">Gender</label>
                <select name="gender" id="gender" {...register("gender")} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">Email</label>
                <input type="email" name="email" id="email" {...register("email")} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" />
              </div>
              <div>
                <label htmlFor="age" className="block mb-2 text-sm">Age</label>
                <input type="number" name="age" id="age" {...register("age")} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" />
              </div>
              <div>
                <label htmlFor="stateOfOrigin" className="block mb-2 text-sm">State of Origin</label>
                <select name="stateOfOrigin" id="stateOfOrigin" {...register("stateOfOrigin")} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900">
                  {statesOfNigeria.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="localGovernment" className="block mb-2 text-sm">Local Government</label>
                <input type="text" name="localGovernment" id="localGovernment" {...register("localGovernment")} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" />
              </div>
              <div>
                <label htmlFor="nationality" className="block mb-2 text-sm">Nationality</label>
                <input type="text" name="nationality" id="nationality" {...register("nationality")} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" />
              </div>
              <div>
                <label htmlFor="instagramHandle" className="block mb-2 text-sm">Instagram Handle</label>
                <input type="text" name="instagramHandle" id="instagramHandle" {...register("instagramHandle")} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" />
              </div>
              <div>
                <label htmlFor="facebookHandle" className="block mb-2 text-sm">Facebook Handle</label>
                <input type="text" name="facebookHandle" id="facebookHandle" {...register("facebookHandle")} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block mb-2 text-sm">Active Phone Number</label>
                <input type="text" name="phoneNumber" id="phoneNumber" {...register("phoneNumber")} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" />
              </div>
              <div>
                <label htmlFor="stageName" className="block mb-2 text-sm">Stage Name</label>
                <input type="text" name="stageName" id="stageName" {...register("stageName")} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" />
              </div>
            </div>
            <div>
              <button disabled={loading} type="submit" className="bg-blue-500 w-full rounded-md py-3 text-white">
                {loading ? <LiaSpinnerSolid className="animate-spin mx-auto" /> : "Continue"}
              </button>
            </div>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px bg-gray-700"></div>
            <p className="px-3 text-sm text-gray-400">Signup with social accounts</p>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>
          <div onClick={handleGoogleSignIn} className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 cursor-pointer">
            <FcGoogle size={32} />
            <p>Continue with Google</p>
          </div>
          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="hover:underline hover:text-blue-500 text-gray-600">
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
