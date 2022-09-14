import { apiCall } from "./axiosInstance";

const { get } = apiCall();

export async function getContributionList(id: string) {
  // console.log("@@ID", id);
  // const { data } = await get(`/contribution/repo/${id}`);
  const { data } = await get(`/repository/${id}/contributions`);
  // console.log(data);
  return data;
}
