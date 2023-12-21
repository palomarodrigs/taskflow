import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import * as z from 'zod'

const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = userSchema.parse(body)

    const findUserByEmail = await prisma.user.findUnique({ where: { email: email } })

    if (findUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: 'User with this email already exists, Please use another email.',
        },
        { status: 409 },
      )
    }

    const hashedPassword = await hash(password, 8)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })

    const { password: userPassword, ...rest } = user

    return NextResponse.json(
      { user: rest, message: 'User created successfully!' },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
  }
}
