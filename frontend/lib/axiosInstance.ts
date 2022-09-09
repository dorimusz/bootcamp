import http from "axios";

export const apiCall = () => {
  const instance = http.create({
    baseURL: "http://localhost:4000/api/v1",
    timeout: 3000,
  });

  const get = async (path: string) => {
    try {
      const response = await instance.get(path);
      return response;
    } catch (error: any) {
      console.log("(get) error status: " + error.response.status);
      console.log("(get) error data: " + error.response.data);
      return error.response;
    }
  };

  const post = async (path: string, data: object) => {
    try {
      const response = await instance.post(path, data);
      // console.log("RESPONSE DATA:", response.data);
      return response;
    } catch (error: any) {
      console.log("(post) error  data: " + error.response.data);
      return error.response;
    }
  };

  return { get, post, _instance: instance };
};
