import axios from "axios";

class AuthService {
  async signUp({ username, email, password, confirm_password, role = "user" }) {
    try {
      const response = await axios.post("/api/v1/users/signup", {
        username,
        email,
        password,
        confirm_password,
        role,
      });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }

  async login({ email, password }) {
    try {
      await axios.post("/api/v1/users/login", { email, password });
    } catch (error) {
      console.error(error.message);
    }
  }

  async logout() {
    try {
      await axios.post("/api/v1/users/logout");
    } catch (error) {
      console.error(error.message);
    }
  }

  async getUserDetail() {
    try {
      const response = await axios.get("/api/v1/users/get-detail");
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateUserDetail({ username }) {
    try {
      await axios.patch("/api/v1/users/update-detail", { username });
    } catch (error) {
      console.error(error.message);
    }
  }

  async updatePassword({ password, newPassword, confirm_password }) {
    try {
      await axios.patch("/api/v1/users/update-password", {
        password,
        newPassword,
        confirm_password,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteAccount() {
    try {
      await axios.delete("/api/v1/users/delete-account");
    } catch (error) {
      console.error(error.message);
    }
  }

  async forgotPassword({ email }) {
    try {
      await axios.post("/api/v1/users/forgot-password", { email });
    } catch (error) {
      console.error(error.message);
    }
  }

  async resetPassword({ password, confirm_password }) {
    try {
      await axios.post("/api/v1/users/reset-passsword", {
        password,
        confirm_password,
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  6;
  // Admin
  async getSingleUser() {
    try {
      await axios.get("/api/v1/users/get-single-user/:id");
    } catch (error) {
      console.error(error.message);
    }
  }

  async getAllUser() {
    try {
      await axios.get("/api/v1/users/get-all-user/");
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateRole({ role }) {
    try {
      await axios.patch("/api/v1/users/update-role/:id", { role });
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteUser({}) {
    try {
      await axios.delete("/api/v1/users/delete-user/:id");
    } catch (error) {
      console.error(error.message);
    }
  }
}

export const authService = new AuthService();
export default authService;
