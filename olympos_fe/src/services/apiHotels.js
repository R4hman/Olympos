import toast from "react-hot-toast";
import { getCookie } from "../helper/setCookie";
const baseUrl = import.meta.env.VITE_BASE_URL;

export async function fetchHotelsApi() {
  const token = getCookie("token");
  const res = await fetch(`${baseUrl}/admin/hotel`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
      Authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  return data;
}
export async function fetchClientSideHotel() {
  const res = await fetch(`${baseUrl}/hotels`);
  let data = await res.json();
  return data;
}
export async function fetchClientSideSingleHotel(url) {
  const res = await fetch(url);
  let data = await res.json();
  return data;
}

export const clientSideHotelOrder = async (newOrder) => {
  try {
    const token = getCookie("token");
    const res = await fetch(`${baseUrl}/user/hotel/create-reserv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify(newOrder),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteHotelApi = (id) => {
  const token = getCookie("token");
  fetch(`${baseUrl}/admin/hotel/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const createHotelApi = (newHotel) => {
  const token = getCookie("token");
  fetch(`${baseUrl}/admin/hotel/create`, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token,
    },

    body: newHotel,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.statusCode && data?.statusCode?.toString().startsWith("4")) {
        throw new Error(`Couldn't create: ${data.message} `);
      } else {
        toast.success("Yeni  hotel yaradıldı");
      }
    })
    .catch((err) => {
      toast.error(err.message);
      return err;
    });
};

export const editHotelApi = (editHotel, id) => {
  const token = getCookie("token");

  fetch(`${baseUrl}/admin/hotel/update/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: editHotel,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data?.statusCode && data?.statusCode?.toString().startsWith("4")) {
        throw new Error(`Couldn't create: ${data.message} `);
      } else {
        toast.success("Hotel haqqında məlumat dəyişildi");
      }
    })
    .catch((err) => {
      toast.error(err.message);
      console.log(err);
      return err;
    });
};
export const fetchHotelFilter = async (url) => {
  const res = await fetch(`${baseUrl}/hotels/filter${url}`);
  let data = await res.json();

  return data;
};

// Admin side fetch hotel includings
export async function fetchHotelIncludings() {
  const token = getCookie("token");
  const res = await fetch(`${baseUrl}/admin/hotel-specifics`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
      Authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  return data;
}

// User side fetch hotel includings
export async function fetchHotelIncludingsClient() {
  const res = await fetch(`${baseUrl}/specifics`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Indicates the content
    },
  });
  const data = await res.json();
  return data;
}

export const createHotelSpecific = (specific) => {
  const token = getCookie("token");

  fetch(`${baseUrl}/admin/hotel-specifics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token,
    },

    body: JSON.stringify(specific),
  })
    .then((res) => {
      if (res.ok) {
        toast.success("Yeni  otel xüsusiyyətləri yaradıldı");
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
