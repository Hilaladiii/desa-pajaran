import { updateNews } from "@/common/db/news";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const res = await updateNews({
    id: formData.get("id") as string,
    content: formData.get("content") as string,
    image: formData.get("image") as File,
  });
  return NextResponse.json(res, { status: res.status });
}
