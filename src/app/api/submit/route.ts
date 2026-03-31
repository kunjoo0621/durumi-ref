import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { siteName, siteUrl, category } = await req.json();

    if (!siteName || !siteUrl) {
      return NextResponse.json({ error: "사이트명과 URL은 필수입니다." }, { status: 400 });
    }

    const { error } = await supabase.from("durumi_submissions").insert({
      site_name: siteName.trim(),
      site_url: siteUrl.trim(),
      category: category || null,
    });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Submit error:", msg);
    return NextResponse.json({ error: "전송에 실패했습니다.", detail: msg }, { status: 500 });
  }
}
