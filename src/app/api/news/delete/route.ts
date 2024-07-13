import { deleteNews } from "@/common/db/news";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const id = await req.text();
  const res = await deleteNews(id);
  return NextResponse.json(res, { status: res.status });
}
