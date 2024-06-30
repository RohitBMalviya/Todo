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
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async verifyUser({ token }) {
    try {
      const response = await axios.get(
        `/api/v1/users/verify-user?token=${token}`
      );
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async login({ email, password }) {
    try {
      const response = await axios.post("/api/v1/users/login", {
        email,
        password,
      });
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async logout() {
    try {
      const response = await axios.post("/api/v1/users/logout");
      return response;
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
      const response = await axios.patch("/api/v1/users/update-detail", {
        username,
      });
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async updatePassword({ password, newpassword, confirm_password }) {
    try {
      const response = await axios.patch("/api/v1/users/update-password", {
        password,
        newpassword,
        confirm_password,
      });
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteAccount() {
    try {
      const response = await axios.delete("/api/v1/users/delete-account");
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async forgotPassword({ email }) {
    try {
      const response = await axios.post("/api/v1/users/forgot-password", {
        email,
      });
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async resetPassword({ password, confirm_password, token }) {
    try {
      const response = await axios.patch(
        `/api/v1/users/reset-password?token=${token}`,
        {
          password,
          confirm_password,
        }
      );
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }
  6;
  // Admin
  async getSingleUser() {
    try {
      const response = await axios.get("/api/v1/users/get-single-user/:id");
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async getAllUser() {
    try {
      const response = await axios.get("/api/v1/users/get-all-user/");
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateRole({ role }) {
    try {
      const response = await axios.patch("/api/v1/users/update-role/:id", {
        role,
      });
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteUser({}) {
    try {
      const response = await axios.delete("/api/v1/users/delete-user/:id");
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }
}

export const authService = new AuthService();
export default authService;
