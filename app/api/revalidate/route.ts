import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }
  revalidateTag("home", "max")
  revalidateTag("varieties", "max")
  revalidateTag("journal", "max")
  revalidateTag("workshops", "max")
  revalidatePath("/")
  return NextResponse.json({ revalidated: true })
}
