import { getNews, getNewsById } from "@/common/db/news";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = await req.nextUrl.searchParams.get("id");
  if (id) {
    const res = await getNewsById(id);
    return NextResponse.json(res, { status: res.status });
  } else {
    const res = await getNews();
    return NextResponse.json(res, { status: res.status });
  }
}
