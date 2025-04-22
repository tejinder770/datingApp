import { NextResponse } from "next/server"

const usersData = [
    { name: 'tejinder', branch: 'IT', address: 'Chandigarh' },
    { name: 'harwinder', branch: 'CSE', address: 'Mohali' },
    { name: 'ashish', branch: 'IT', address: 'Mohali' },
    { name: 'gurwinder', branch: 'IT', address: 'Chandigarh' },
]

export const GET = async () => {
    return NextResponse.json({
        status: 200,
        message: 'users retrieved successfully',
        data: usersData
    })
}

export const POST = async (req, res) => {
    return NextResponse.json({
        status: 201,
        message: 'created',
    })
}
