export default async function handleSubmitUser(url: string, username: string, password: string) {
  try {
    await fetch(
      url,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        })
      }
    );
  } catch (err) {
    console.log(err);
  }
}