//small helper functions to make HTTP requests to the DIVE API
const headers: HeadersInit = {
  Authorization: `Bearer ${import.meta.env.VITE_DIVEONLINE_SECRET_KEY}`,
  'content-type': 'application/json',
  'content-encoding': 'utf-8',
};//end headers

//generic POST request helper
export const post = async (url: string, body: any) => {
  const response = await fetch(`${import.meta.env.VITE_DIVEONLINE_PROD_URL}${url}`, {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify(body),
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error(`HTTP Error: ${response.status}`);
};//end post

//generic GET request helper
export const get = async (url: string) => {
  const response = await fetch(`${import.meta.env.VITE_DIVEONLINE_PROD_URL}${url}`, {
    method: 'GET',
    headers,
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error(`HTTP Error: ${response.status}`);
};//end get
