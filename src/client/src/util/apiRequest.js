export default async ({ url, method, headers, body }) => {
  try {
    const res = await fetch(url, { method, headers, body });
    return res.json();
  } catch (error) {
    console.error(error.message);
  }
};
