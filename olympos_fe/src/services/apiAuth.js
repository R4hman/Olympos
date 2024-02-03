import toast from "react-hot-toast";
import { getCookie } from "../helper/setCookie";
const token = getCookie("token");
const baseUrl = import.meta.env.VITE_BASE_URL;

export const signupHandler = async (data) => {
  try {
    const res = await fetch(`${baseUrl}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });

    const respData = await res.json();

    return respData;
  } catch (error) {
    toast.error(error.message);
    console.log(error.message);
    return error;
  }
};

export const loginHandler = async (data) => {
  try {
    const res = await fetch(`${baseUrl}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });

    const respData = await res.json();

    return respData;
  } catch (error) {
    toast.error(error.message);
    console.log(error.message);
    return error;
  }
};

export const getUserDetails = async () => {
  try {
    const token = getCookie("token");

    const res = await fetch(`${baseUrl}/user/profile`, {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //   body: JSON.stringify({ email }),
    });

    const respData = await res.json();
    return respData;
  } catch (error) {
    toast.error(error.message);
    console.log(error);
    // return error;
  }
};

export const editUserProfile = async (editProfile) => {
  try {
    const token = getCookie("token");

    const res = await fetch(`${baseUrl}/user/profile/update`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: editProfile,
    });
    const data = await res.json();
    if (data.statusCode === 200) {
      location.reload();

      toast.success("Profil məlumatları dəyişdirildi");
    }
    if (data.statusCode === 404 || data.statusCode === 400) {
      toast.error(data.message);
    }
    return data;
  } catch (error) {
    toast.error(error.message);
    console.log(error);
    return error;
  }
};
