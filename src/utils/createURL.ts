export default function createURL(key: string, value: string, searchParams: URLSearchParams) {
  if (key) searchParams.set(key, value);
  if (!value) searchParams.delete(key);
  if (Array.from(searchParams.keys()).length === 0) {
    return "/";
  } else {
    return `/?${searchParams.toString()}`;
  }
}