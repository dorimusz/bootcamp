import { apiCall } from "./axiosInstance";

const { get } = apiCall();

export async function getContributionList(id: string) {
  // console.log("@@ID", id);
  const { data } = await get(`/contribution/repo/${id}`);
  // console.log(data);
  return data;
}
