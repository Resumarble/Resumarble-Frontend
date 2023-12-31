interface CustomFetchType {
  path: string;
  params?: string;
  header?: { [key: string]: string };
  body?: any;
  method: 'GET' | 'POST' | 'DELETE';
}

type ConfigType = {
  method: string;
  headers: any;
  body?: any;
};

export default async function customFetch({
  path,
  body,
  header,
  params = '',
  method = 'GET',
}: CustomFetchType) {
  let token = localStorage.getItem('token') || null;
  if (token) {
    // TODO 토큰 유효 확인
  }

  const headers = {
    'Content-Type': 'application/json',
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
    if (method === 'DELETE') {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}${path}${
          !!params ? `?page=${params}` : ''
        }`,
        config
      );

      // TODO mutation 사용 ?
      if (res.status !== 204) throw new Error('삭제 실패');

      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${path}${
        !!params ? `${params}` : ''
      }`,
      config
    );
    return res.json();
  } catch (err) {
    console.error(`fetch ERROR`);
    window.alert('에러가 발생했어요. 새로고침 후 다시 시도해주세요.');
  }
}
