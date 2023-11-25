import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // TODO 리프레시 토큰 로직 어디에 넣을지 고민......
  // - request 응답 코드가 401인 경우 재발급하도록하려면 패치 중간에 로직이 필요함
  // -> 이거 때문에 axios를 사용할 필요가 있을까 ?
  // -> fetch 메서드 인터셉터를 추가하는 방향으로 ? (커스텀 fetch)
  // const now = Math.floor(Date.now() / 1000);
  // const isExpired = (token.exp as number) - now < 600; // 만료 10분 전인지 체크
  // TODO middleware가 서버 사이드라서 getSession 불가능.
  // 그렇다면 어떤 방법으로 회원/비회원을 구분할 것인가..
}

export const config = {
  matcher: ['/join', '/login'],
};
