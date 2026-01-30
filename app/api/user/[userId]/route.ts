import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-utils"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request, props: { params: Promise<{ userId: string }> }) {
  const params = await props.params

  try {
    await requireAdmin()

    const user = await prisma.user.findUnique({
      where: { id: params.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        emailVerified: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error("[USER_GET_ERROR]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: Request, props: { params: Promise<{ userId: string }> }) {
  const params = await props.params

  try {
    await requireAdmin()

    const { name, role } = await request.json()

    const user = await prisma.user.update({
      where: { id: params.userId },
      data: {
        ...(name && { name }),
        ...(role && { role }),
      },
    })

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error("[USER_UPDATE_ERROR]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ userId: string }> }) {
  const params = await props.params

  try {
    await requireAdmin()

    await prisma.user.delete({
      where: { id: params.userId },
    })

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("[USER_DELETE_ERROR]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
