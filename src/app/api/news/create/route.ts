import { createNews } from "@/common/db/news";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const res = await createNews({
    content: form.get("content") as string,
    image: form.get("image") as File,
  });
  return NextResponse.json(res, { status: res.status });
}
