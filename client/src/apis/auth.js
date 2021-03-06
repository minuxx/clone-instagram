import client from "./config";

export async function signUpApi(data) {
  const response = await client.post("/users", data);

  return response.data;
}

export async function loginApi(data) {
  const response = await client.post("/users/login", data);

  return response.data;
}

export async function getProfileApi() {
  const response = await client.get(`/users`);

  return response.data;
}
