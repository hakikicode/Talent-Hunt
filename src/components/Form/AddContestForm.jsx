import { saveContest } from "../../api/apiContests";
import { imageUpload } from "../../api/utils";
import useUser from "../../hooks/useUser";
import FormLayout from "./FormLayout";
import FormRow from "./FormRow";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../Shared/Loader";
import { useState } from "react";
import SpinnerMini from "../Shared/SpinnerMini";

const AddContestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { userData, isLoading: isUserLoading } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  if (isUserLoading && !userData) return <Loader />;

  const credits = userData?.credits || 0;

  const onSubmit = async (data) => {
    if (credits < 50) return toast.error("You don't have enough credits");

    setIsLoading(true);
    try {
      // upload image
      const imageUrl = await imageUpload(data.image[0]);

      // save the contest to the database
      const res = await saveContest({
        ...data,
        image: imageUrl,
        priceMoney: parseFloat(data.prizeMoney),
        entryFee: parseFloat(data.entryFee),
        creator: userData._id,
      });

      if (res) {
        toast.success("Contest added successfully");
        navigate("/dashboard/creator/contests");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error adding contest"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center mb-10">
        <h1 className="text-2xl text-gray-700 font-bold ">Add New Contest</h1>
        <p className="text-gray-600 font-medium ">
          Every contest will charge 50 credits
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10">
        <div>
          <FormRow label="Title" required error={errors?.title?.message}>
            <input
              className="input"
              type="text"
              id="contestName"
              {...register("title", {
                required: "Title is required",
              })}
            />
          </FormRow>
          <FormRow label="Image" required error={errors?.image?.message}>
            <input
              className="input"
              type="file"
              accept="image/*"
              id="image"
              {...register("image", {
                required: "Image is required",
              })}
            />
          </FormRow>

          <FormRow label="Type" required error={errors?.type?.message}>
            <select className="input" id="type" {...register("type")}>
              <option value="business">Business Contest</option>
              <option value="medical">Medical Contest</option>
              <option value="writing">Article Writing</option>
              <option value="gaming">Gaming</option>
            </select>
          </FormRow>

          <FormRow
            label="Description"
            required
            error={errors?.description?.message}
          >
            <textarea
              className="input"
              id="description"
              rows={6}
              {...register("description", {
                required: "Contest Description is required",
                validate: (value) =>
                  value.length >= 50 ||
                  "Description must be at least 50 characters",
              })}
            />
          </FormRow>
        </div>
        <div>
          <FormRow
            label="Price Money"
            required
            error={errors?.prizeMoney?.message}
          >
            <input
              className="input"
              type="number"
              step="any"
              id="priceMoney"
              {...register("prizeMoney", {
                required: "Price money is required",
                validate: (value) =>
                  value > 0 || "Price money must be greater than 0",
              })}
            />
          </FormRow>
          <FormRow label="Entry fee" required error={errors?.entryFee?.message}>
            <input
              className="input"
              type="number"
              step="any"
              id="entryFee"
              {...register("entryFee", {
                required: "Entry fee is required",
                validate: (value) =>
                  value > 0 || "Entry fee must be greater than 0",
              })}
            />
          </FormRow>

          <FormRow
            label="Instructions"
            required
            error={errors?.instruction?.message}
          >
            <textarea
              className="input"
              id="instruction"
              rows={6}
              {...register("instruction", {
                required: "Contest instruction is required",
                validate: (value) =>
                  value.length >= 20 ||
                  "Instructions must be at least 20 characters",
              })}
            />
          </FormRow>

          <FormRow label="Deadline" required error={errors?.deadline?.message}>
            <input
              type="datetime-local"
              className="input"
              id="deadline"
              {...register("deadline", {
                required: "Contest Deadline is required",
                validate: (value) =>
                  new Date(value) > new Date() ||
                  "Deadline must be greater than today",
              })}
            />
          </FormRow>
        </div>
      </div>
      <div>
        <button disabled={isLoading} className="btn disabled:opacity-50">
          {isLoading ? <SpinnerMini /> : "Add Contest"}
        </button>
      </div>
    </FormLayout>
  );
};

export default AddContestForm;
