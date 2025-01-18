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

export async function getProtected<T>(url: string, token: string, setFn: React.Dispatch<React.SetStateAction<T>>) {
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
        }
      );
      const resJson = await response.json();
      if (setFn) setFn(resJson);
    } catch (err) {
      console.log(err);
    }
}

export async function postProtected(url: string, token: string, formData: FormData) {
    console.log(url);
    try {
      await fetch(
        url,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Authorization": token,
          },
          body: formData,
        }
      );
    } catch (err) {
      console.log(err);
    }
}