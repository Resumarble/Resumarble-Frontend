import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 0;

  const MAX_PAGE = 10;
  const datas = Array(100)
    .fill(0)
    .map((_, i) => {
      return {
        qaId: i,
        question: `목 데이터 ${i}`,
        answer: `${i}번째 응답`,
      };
    });

  const hasNextPage = MAX_PAGE - 1 > page;

  return NextResponse.json({
    data: datas.slice(page * 10, page * 10 + 10),
    hasNextPage,
  });
}
