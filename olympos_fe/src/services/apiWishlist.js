import toast from "react-hot-toast";
import { getCookie } from "../helper/setCookie";
const baseUrl = import.meta.env.VITE_BASE_URL;

export async function fetchUserWishlist() {
  const token = getCookie("token");

  const res = await fetch(`${baseUrl}/user/profile/whishlist`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + token,
    },
  });
  let data = await res.json();

  return data;
}

export const createWishlist = (id) => {
  const token = getCookie("token");

  fetch(`${baseUrl}/user/create-whishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token,
    },

    body: JSON.stringify(id),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      // toast.error(err.message);

      console.log(err);
      return err;
    });
};

export const deleteWishlist = (id) => {
  const token = getCookie("token");

  fetch(`${baseUrl}/user/delete-whishlist/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      // toast.error(err.message);
      console.log(err);
      return err;
    });
};
