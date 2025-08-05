import apiClient from "~/apis/apiClient";

// Notifycation API service
export const notifyAPI = {
  // POST /Đănng ký token vào CSDL
  NotifyReg: async (data) => {
    var result = await apiClient.post("Systems/NotifyReg", data);
    return result?.data;
  },
};
