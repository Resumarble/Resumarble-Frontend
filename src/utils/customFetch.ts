interface CustomFetchType {
  url: string;
  headers?: [string: string];
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
  method = "GET",
}: CustomFetchType) {
  const headers = {
    "Content-Type": "application/json",
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
