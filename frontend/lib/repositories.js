import { apiCall } from "./axiosInstance";

const { get } = apiCall();

export async function getRepositoryList() {
  const repositories = await get(`/repository`);
  //   console.log(users.data);
  return repositories.data;
}
