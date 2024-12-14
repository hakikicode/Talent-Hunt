import { useState } from "react";
import FormLayout from "./FormLayout";
import FormRow from "./FormRow";
import Input from "./Input";
import { Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../api/utils";
import { updateUser } from "../../api/apiUsers";
import useUser from "../../hooks/useUser";
import Loader from "../Shared/Loader";
import toast from "react-hot-toast";

function UpdateUserDataForm() {
  const { user, updateUserProfile } = useAuth();
  const { userData, isLoading } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const { register, handleSubmit } = useForm();

  if (isLoading) return <Loader />;

  async function onSubmit(data) {
    if (!data?.fullName) return;

    const name = data?.fullName;

    setIsUpdating(true);
    try {
      // upload image
      const imageUrl =
        data.image.length === 0
          ? userData.image
          : await imageUpload(data?.image[0]);

      // update profile on firebase
      await updateUserProfile(name, imageUrl);

      // update profile on db
      await updateUser(userData?._id, { name, image: imageUrl });

      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-semibold text-gray-900 mb-10">
        Update Profile
      </h1>
      <FormRow label="Email address">
        <Input value={user?.email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <input
          type="text"
          defaultValue={user?.displayName}
          disabled={isUpdating}
          id="fullName"
          {...register("fullName")}
          className="border border-gray-300 bg-gray-100 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <input
          id="avatar"
          type="file"
          disabled={isUpdating}
          accept="image/*"
          {...register("image")}
        />
      </FormRow>
      <FormRow>
        <div className="flex items-center gap-x-6 justify-end">
          <Button type="submit" variant="contained" disabled={isUpdating}>
            Update account
          </Button>
        </div>
      </FormRow>
    </FormLayout>
  );
}

export default UpdateUserDataForm;
