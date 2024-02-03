import toast from "react-hot-toast";
import { getCookie } from "../helper/setCookie";
const baseUrl = import.meta.env.VITE_BASE_URL;

export async function fetchToursApi() {
  const token = getCookie("token");
  const res = await fetch(`${baseUrl}/admin/tour`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + token,
    },
  });
  let data = await res.json();
  data = data.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
  return data;
}

export async function fetchClientSideToursApi() {
  const res = await fetch(`${baseUrl}/tour`);
  let data = await res.json();
  return data;
}

export async function fetchClientSingleTour(id) {
  const res = await fetch(`${baseUrl}/tour/${id}`);
  let data = await res.json();
  return data;
}

export const fetchTourFilter = async (url) => {
  const res = await fetch(`${baseUrl}/tours/filter${url}`);
  let data = await res.json();

  return data;
};

export async function fetchClientSideToursCategory() {
  const res = await fetch(`${baseUrl}/tourcategory`);
  let data = await res.json();
  return data;
}

// export const clientSideTourOrder = async (newOrder) => {
//   try {
//     const res = await fetch(`${baseUrl}/user/tour/create-reserv`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//         Authorization: "Bearer " + token,
//       },

//       body: JSON.stringify(newOrder),
//     });

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     return error;
//   }
// };

export const deleteTourApi = (id) => {
  const token = getCookie("token");
  fetch(`${baseUrl}/admin/tour/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const createTourApi = (newTour) => {
  const token = getCookie("token");
  fetch(`${baseUrl}/admin/tour/create`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },

    body: newTour,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("create tour data", data);
      if (data?.statusCode && data?.statusCode?.toString().startsWith("4")) {
        throw new Error(`Couldn't create: ${data.message} `);
      } else {
        window.location.reload();
        toast.success("Yeni  tur yaradıldı");
      }
    })
    .catch((err) => {
      console.log("api erroru", err);
      toast.error(err.message);
      return err;
    });
};

export const editTourApi = (editTour, id) => {
  const token = getCookie("token");
  fetch(`${baseUrl}/admin/tour/update/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: editTour,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.statusCode === 200) {
        window.location.reload();
        toast.success(data.message);
      }
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export async function fetchTourCategory() {
  const token = getCookie("token");
  const res = await fetch(`${baseUrl}/admin/tourcategory`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + token,
    },
  });
  let data = await res.json();
  // data = data.map(({ name }) => name);
  return data;
}

export async function fetchClientTourCategory() {
  const res = await fetch(`${baseUrl}/tourcategory`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  let data = await res.json();
  // data = data.map(({ name }) => name);
  return data.map(({ name }) => name);
}

export const createTourCategory = (newTour) => {
  const token = getCookie("token");

  fetch(`${baseUrl}/admin/tourcategory/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token,
    },

    body: JSON.stringify(newTour),
  })
    .then((res) => {
      if (res.ok) {
        toast.success("Yeni  tur kateqoriyası yaradıldı");
        window.location.reload();
      }
      return res;
    })
    .catch((err) => {
      console.log(err.message);
      toast.error(err.message);
      return err;
    });
};
