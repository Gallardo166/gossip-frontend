export async function fetchData<T, data>(
  url: string,
  setFn: React.Dispatch<React.SetStateAction<T>>,
  manipulateFn?: (data: data) => T) {
    console.log(url);
    try {
      const response = await fetch(
        url,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      let resJson = await response.json();
      if (manipulateFn) {resJson = manipulateFn(resJson)}
      setFn(resJson);
    } catch (err) {
      console.log(err);
    }
}

export async function fetchProtectedData<T>(
  url: string,
  setFn: React.Dispatch<React.SetStateAction<T>>,
  token: string,
  formData?: object) {
    console.log(url);
    try {
      const response = await fetch(
        url,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          body: formData ? JSON.stringify(formData) : null
        }
      );
      const resJson = await response.json();
      setFn(resJson);
    } catch (err) {
      console.log(err);
    }
}