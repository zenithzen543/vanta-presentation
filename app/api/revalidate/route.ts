import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

function authorized(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return false
  const query = request.nextUrl.searchParams.get("secret")
  const header = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
  return query === secret || header === secret
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  revalidateTag("home", "max")
  revalidateTag("varieties", "max")
  revalidateTag("journal", "max")
  revalidateTag("workshops", "max")

  revalidatePath("/", "layout")
  revalidatePath("/")
  revalidatePath("/varieties")
  revalidatePath("/varieties/[slug]", "page")
  revalidatePath("/journal")
  revalidatePath("/journal/[slug]", "page")
  revalidatePath("/workshops")
  revalidatePath("/order")
  revalidatePath("/about")

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
