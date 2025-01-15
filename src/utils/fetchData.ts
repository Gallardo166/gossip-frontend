export default async function fetchData<T>(fetchInput: string, setFn: React.Dispatch<React.SetStateAction<T>>) {
  console.log(fetchInput);
  try {
    const response = await fetch(
      fetchInput,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const resJson = await response.json();
    setFn(resJson);
  } catch (err) {
    console.log(err);
  }
}