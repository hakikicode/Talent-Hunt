import axios from "axios";

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_APP_IMAGEBB_API_KEY
    }`,
    formData
  );
  return data.data.display_url;
};

export const getClientSecret = async () => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_APP_API_URL}/payments/create`
  );
  return data.clientSecret;
};
