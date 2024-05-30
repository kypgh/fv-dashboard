import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

const dashboardApiAxios = axios.create({
  baseURL: process.env.SERVER,
  headers: {
    authorization: `Bearer ${getJWTToken()}`,
  },
});

export function getJWTToken(): string | undefined {
  return getCookie("jwt");
}
function setJWTToken(value: string) {
  dashboardApiAxios.defaults.headers["authorization"] = `Bearer ${value}`;
  setCookie("jwt", value);
}

export function getRefreshToken(): string | undefined {
  return getCookie("refreshToken");
}
function setRefreshToken(value: string) {
  setCookie("refreshToken", value);
}

function removeTokens() {
  setJWTToken("");
  setRefreshToken("");
}

dashboardApiAxios.interceptors.response.use(null, async function (err) {
  if (err.response.status === 403 && (err.config.retry ?? 0) < 1) {
    //create new jwt token based on refresh token, have to create new endpoint for that

    let rToken = getRefreshToken();

    if (!rToken) return Promise.reject(err);

    let jwtToken = await axios
      .post(`${process.env.SERVER}/dashboard/auth/refreshJwt`, {
        refreshToken: rToken,
      })
      .then((res) => res.data.jwtToken)
      .catch((err) => {
        removeTokens();
        return Promise.reject(err);
      });

    setJWTToken(jwtToken);
    dashboardApiAxios.defaults.headers["authorization"] = `Bearer ${jwtToken}`;
    err.config.headers["authorization"] = `Bearer ${jwtToken}`;
    err.config.retry = (err.config.retry || 0) + 1;
    return axios.request(err.config);
  }

  return Promise.reject(err);
});

export const DashboardApiAgent = {
  login: async (email: string, password: string) => {
    return dashboardApiAxios
      .post("dashboard/auth/login", {
        email,
        password,
      })
      .then((res) => {
        setJWTToken(res.data.message.jwt);
        setRefreshToken(res.data.message.refreshToken);
        return res.data;
      });
  },
  logout: async () => removeTokens(),
  getAllUsers: async ({
    page = "1",
    limit,
  }: {
    page: string | undefined;
    limit: number;
  }) => {
    return dashboardApiAxios
      .get(`/dashboard/users/?page=${page}&limit=${limit}`)
      .then((res) => res.data);
  },
  getUserById: async ({ _id }: { _id: string | undefined }) => {
    return dashboardApiAxios
      .get(`/dashboard/users/${_id}`)
      .then((res) => res.data);
  },
  getAllCrmUsers: async ({
    page = "1",
    limit,
  }: {
    page: string | undefined;
    limit: number;
  }) => {
    return dashboardApiAxios
      .get(`/dashboard/crmusers/?page=${page}&limit=${limit}`)
      .then((res) => res.data);
  },
  updateCrmUser: async ({
    _id,
    firstName,
    lastName,
  }: {
    _id: string;
    firstName: string;
    lastName: string;
  }) => {
    return dashboardApiAxios
      .put(`/dashboard/crmusers/${_id}/`, {
        firstName: firstName,
        lastName: lastName,
      })
      .then((res) => res.data);
  },
  changeCrmPermissions: async ({
    _id,
    permissions,
  }: {
    _id: string;
    permissions: string[];
  }) => {
    return dashboardApiAxios
      .put(`/dashboard/crmusers/${_id}/permissions`, {
        permissions: permissions,
      })
      .then((res) => res.data);
  },
  changeCrmRole: async ({ _id, role }: { _id: string; role: string }) => {
    return dashboardApiAxios
      .put(`/dashboard/crmusers/${_id}/permissions`, {
        role: role,
      })
      .then((res) => res.data);
  },
  getAllPosts: async ({
    page = "1",
    limit = 8,
    user_id = "",
  }: {
    page?: string;
    limit?: number;
    user_id?: string;
  }) => {
    return dashboardApiAxios
      .get(`/dashboard/posts?page=${page}&limit=${limit}&user_id=${user_id}`)
      .then((res) => res.data);
  },
  getPostById: async ({ _id }: { _id: string }) => {
    return dashboardApiAxios
      .get(`/dashboard/posts/${_id}/`)
      .then((res) => res.data);
  },
  getAllCrmRoles: async () => {
    return dashboardApiAxios
      .get(`/dashboard/crmroles/`)
      .then((res) => res.data);
  },
  addCrmRoles: async ({ role }: { role: string }) => {
    return dashboardApiAxios
      .post(`/dashboard/crmroles/`, {
        role: role,
      })
      .then((res) => res.data);
  },
  updateCrmRole: async ({
    _id,
    permissions,
  }: {
    _id: string;
    permissions: string[];
  }) => {
    return dashboardApiAxios
      .put(`/dashboard/crmroles/${_id}/`, {
        permissions,
      })
      .then((res) => res.data);
  },
  deleteCrmRole: async ({ _id }: { _id: string }) => {
    return dashboardApiAxios
      .delete(`/dashboard/crmroles/${_id}/`, {})
      .then((res) => res.data);
  },
};
