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
  let token = localStorage.getItem("token") || null;
  if (token) {
    // TODO 토큰 유효 확인
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
    ...header,
  };

  const config: ConfigType = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`,
      config
    );
    return res.json();
  } catch (err) {
    console.error(`fetch ERROR`);
  }
}
