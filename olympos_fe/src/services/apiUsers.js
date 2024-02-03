import { getCookie } from "../helper/setCookie";
import toast from "react-hot-toast";
const baseUrl = import.meta.env.VITE_BASE_URL;

export async function fetchUsersApi() {
  const token = getCookie("token");

  const res = await fetch(`${baseUrl}/admin/users`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + token,
    },
  });
  let data = await res.json();
  return data;
}

export const deleteUserApi = (id) => {
  const token = getCookie("token");

  fetch(`${baseUrl}/admin/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`, // Indicates the content
    },
  })
    .then((res) => res.json())
    .then((data) => console.log("delete data", data))
    .catch((err) => {
      // toast.error(err.message);
      console.log(err);
      return err;
    });
};

export const createUserApi = (newUser) => {
  fetch(`http://localhost:3000/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(newUser),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      // toast.error(err.message);
      console.log(err);
      return err;
    });
};

export const editUserApi = (editUser, id) => {
  fetch(`http://localhost:3000/users/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editUser),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      // toast.error(err.message);
      console.log(err);
      return err;
    });
};

export const createUserReview = async (newReview) => {
  console.log("new review", newReview);

  try {
    const token = getCookie("token");
    const res = await fetch(`${baseUrl}/user/create-review`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newReview),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    // toast.error(error.message);
    console.log(error.message);
    return error;
  }
};
// export const editUserReview = async (newReview) => {
//   console.log("new review", newReview);
//   try {
//     const res = await fetch(`${baseUrl}/user/update-review`, {
//       method: "PATCH",
//       headers: {
//         // "Content-type": "application/json; charset=UTF-8",
//         Authorization: "Bearer " + token,
//       },
//       body: newReview,
//     });

//     if (!res.ok) {
//       throw new Error(`Request failed with status: ${res.status}`);
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     // Handle specific error cases or log the error
//     toast.error(error.message);
//     console.log(error.message);
//     return error;
//   }
// };

export const editUserReview = async (newReview, token) => {
  console.log("new review", newReview);
  try {
    const token = getCookie("token");

    const res = await fetch(`${baseUrl}/user/update-review`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json", // Specify the content type as JSON
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newReview), // Convert newReview to a JSON string
    });

    if (res.ok) {
      toast.success("Dəyişildi");
    } else {
      throw new Error(`Request failed with status: ${res.status}`);
    }
    return res;
  } catch (error) {
    // Handle specific error cases or log the error
    toast.error(error.message);
    console.log(error.message);
    return error;
  }
};

export const deleteUserReview = async (id) => {
  console.log("id: " + id);
  try {
    const token = getCookie("token");
    const response = await fetch(`${baseUrl}/user/delete-review/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();

    console.log("data", data);

    if (data.statusCode === 200) {
      toast.success("silindi");
    } else {
      throw new Error(`Request failed with status: ${data.statusCode}`);
    }

    return data;
  } catch (err) {
    toast.error(err.message);
    console.error(err);
    return err;
  }
};

export const sendUserNotification = async (notification) => {
  console.log("not", notification);
  try {
    const token = getCookie("token");
    const res = await fetch(`${baseUrl}/admin/notification-email`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(notification),
    });
    console.log("Res", res);
    const data = await res.json();
    return data;
  } catch (error) {
    // toast.error(error.message);
    console.log(error.message);
    return error;
  }
};

// export const sendUserNotification = async (notification) => {
//   console.log("not", notification);
//   try {
//     const token = getCookie("token");
//     const res = await fetch(`${baseUrl}/admin/notification-email`, {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         Authorization: "Bearer " + token,
//       },
//       body: JSON.stringify(notification),
//     });

//     console.log("Res", res);

//     if (!res.ok) {
//       throw new Error(
//         `Failed to send notification: ${res.status} ${res.statusText}`
//       );
//     }

//     const contentType = res.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new Error("Received non-JSON response");
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     // Handle the error in an appropriate way, such as displaying a user-friendly message
//     return { error: error.message };
//   }
// };

export const sendEmailFromClient = async (email) => {
  console.log("not", email);
  try {
    const res = await fetch(`${baseUrl}/create-subscribe`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(email),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    // toast.error(error.message);
    console.log(error.message);
    return error;
  }
};
