import toast from "react-hot-toast";
import { getCookie } from "../helper/setCookie";
const baseUrl = import.meta.env.VITE_BASE_URL;

const token = getCookie("token");
export async function fetchHomeReview() {
  const res = await fetch(`${baseUrl}/reviews`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
      Authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  return data;
}
