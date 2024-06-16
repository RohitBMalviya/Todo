import axios from "axios";

export const signUp = async ({
  username,
  email,
  password,
  confirm_password,
  role = "user",
}) => {
  try {
    await axios.post("/api/v1/users/signup", {
      username,
      email,
      password,
      confirm_password,
      role,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    await axios.post("/api/v1/users/login", { email, password });
  } catch (error) {
    console.error(error.message);
  }
};

export const logout = async () => {
  try {
    await axios.post("/api/v1/users/logout");
  } catch (error) {
    console.error(error.message);
  }
};

export const getUserDetail = async () => {
  try {
    const response = await axios.get("/api/v1/users/get-detail");
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export const updateUserDetail = async ({ username }) => {
  try {
    await axios.patch("/api/v1/users/update-detail", { username });
  } catch (error) {
    console.error(error.message);
  }
};

export const updatePassword = async ({
  password,
  newPassword,
  confirm_password,
}) => {
  try {
    await axios.patch("/api/v1/users/update-password", {
      password,
      newPassword,
      confirm_password,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteAccount = async () => {
  try {
    await axios.delete("/api/v1/users/delete-account");
  } catch (error) {
    console.error(error.message);
  }
};

export const forgotPassword = async ({ email }) => {
  try {
    await axios.post("/api/v1/users/forgot-password", { email });
  } catch (error) {
    console.error(error.message);
  }
};

export const resetPassword = async ({ password, confirm_password }) => {
  try {
    await axios.post("/api/v1/users/reset-passsword", {
      password,
      confirm_password,
    });
  } catch (error) {
    console.error(error.message);
  }
};
6;
// Admin
export const getSingleUser = async () => {
  try {
    await axios.get("/api/v1/users/get-single-user/:id");
  } catch (error) {
    console.error(error.message);
  }
};

export const getAllUser = async () => {
  try {
    await axios.get("/api/v1/users/get-all-user/");
  } catch (error) {
    console.error(error.message);
  }
};

export const updateRole = async ({ role }) => {
  try {
    await axios.patch("/api/v1/users/update-role/:id", { role });
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteUser = async ({}) => {
  try {
    await axios.delete("/api/v1/users/delete-user/:id");
  } catch (error) {
    console.error(error.message);
  }
};
