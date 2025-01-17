export default async function fetchData<T, data>(
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