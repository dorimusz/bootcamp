import { apiCall } from "./axiosInstance";

const { get } = apiCall();

export async function getUserList() {
  const users = await get(`/user`);
  //   console.log(users.data);
  return users.data;
}
