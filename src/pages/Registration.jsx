import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { LiaSpinnerSolid } from "react-icons/lia";

import useAuth from "../hooks/useAuth";
import { generateToken, saveUser } from "../api/apiAuth";
import { useForm } from "react-hook-form";
import Title from "../components/Shared/Title";
import backgroundImage from "../components/assets/loginback.png";

import { getDatabase, ref, push } from "firebase/database";
import { database } from "../firebase/firebase.config";

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
  try {
    const dbRef = ref(database, "registrations");
    await push(dbRef, data);

    toast.success("Registration successful! Check your WhatsApp group for updates.");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch (error) {
    console.error("Submission error:", error.message);
    toast.error("Failed to submit registration!");
  }
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
            <h1 className="my-3 text-6xl font-bold">Kwara Talents Harvest season 5</h1>
            <p className="text-5xl text-gray-400 font-bold">Register and Unleash Your Talents To The World, Join our WhatsApp Group <p><a href='https://chat.whatsapp.com/JxvKM5xasmuFOpD5zJWvWU' className='text-blue-500 underline font-bold'>https://chat.whatsapp.com/JxvKM5xasmuFOpD5zJWvWU</a></p> to get updates on Kwara Talents Harvest Seasons</p>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
            <label htmlFor="name" className="block mb-2 text-sm">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900"
              required
            />
              </div>

              <div>
              <label htmlFor="talentCategory" className="block mb-2 text-sm">
                Talent Category
              </label>
              <select
                name="talentCategory"
                id="talentCategory"
                {...register("talentCategory", { required: true })}
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900" required
              >
                <option value="COMEDY">COMEDY</option>
                <option value="MUSIC CHANTS">MUSIC CHANTS</option>
                <option value="MODELLING">MODELLING</option>
                <option value="ARTS">ARTS</option>
                <option value="OTHER TALENT">OTHER TALENT</option>
              </select>
            </div>
              <div>
                <label htmlFor="gender" className="block mb-2 text-sm">Gender</label>
                <select name="gender" id="gender" {...register("gender", { required: true })} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">Email</label>
                <input type="email" name="email" id="email" {...register("email")} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" required/>
              </div>
              <div>
                <label htmlFor="age" className="block mb-2 text-sm">Age</label>
                <input type="number" name="age" id="age" {...register("age", { required: true })} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" required/>
              </div>
              <div>
              <label htmlFor="school" className="block mb-2 text-sm">
                School
              </label>
              <input
                type="text"
                name="school"
                id="school"
                {...register("school", { required: true })}
                placeholder="Enter School Name"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900" required
              />
            </div>
              <div>
                <label htmlFor="stateOfOrigin" className="block mb-2 text-sm">State of Origin</label>
                <select name="stateOfOrigin" id="stateOfOrigin" {...register("stateOfOrigin", { required: true })} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900">
                  {statesOfNigeria.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="localGovernment" className="block mb-2 text-sm">Local Government</label>
                <input type="text" name="localGovernment" id="localGovernment" {...register("localGovernment", { required: true })} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" />
              </div>
              <div>
                <label htmlFor="nationality" className="block mb-2 text-sm">Nationality</label>
                <input type="text" name="nationality" id="nationality" {...register("nationality", { required: true })} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" />
              </div>
              <div>
                <label htmlFor="instagramHandle" className="block mb-2 text-sm">Instagram Handle</label>
                <input type="text" name="instagramHandle" id="instagramHandle" {...register("instagramHandle", { required: true })} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" />
              </div>
              <div>
                <label htmlFor="facebookHandle" className="block mb-2 text-sm">Facebook Handle</label>
                <input type="text" name="facebookHandle" id="facebookHandle" {...register("facebookHandle", { required: true })} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block mb-2 text-sm">Active Phone Number</label>
                <input type="text" name="phoneNumber" id="phoneNumber" {...register("phoneNumber", { required: true })} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" required/>
              </div>
              <div>
                <label htmlFor="stageName" className="block mb-2 text-sm">Stage Name</label>
                <input type="text" name="stageName" id="stageName" {...register("stageName", { required: true })} className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900" required/>
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
