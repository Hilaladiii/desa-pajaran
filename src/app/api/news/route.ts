import { getNews } from "@/common/db/news";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await getNews();
  return NextResponse.json(res, { status: res.status });
}
