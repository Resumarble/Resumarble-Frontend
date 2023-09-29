interface CustomFetchType {
  url: string;
  header?: { [key: string]: string };
  body?: any;
  method: "GET" | "POST";
}

type ConfigType = {
  method: string;
  headers: any;
  body?: any;
};

export default async function customFetch({
  url,
  body,
  header,
  method = "GET",
}: CustomFetchType) {
  const headers = {
    "Content-Type": "application/json",
    ...header,
  };

  const config: ConfigType = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`,
    config
  );

  if (!res.ok) {
    throw new Error(`fetch ERROR, ${res.status}`);
  }

  return res.json();
}
