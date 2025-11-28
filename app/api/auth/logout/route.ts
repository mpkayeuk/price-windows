import { NextResponse } from 'next/server'
import { logout } from '@/lib/auth'

export async function POST() {
  try {
    await logout()
    const response = NextResponse.json({ success: true })
    // Also delete cookie in response
    response.cookies.delete('admin_session')
    return response
  } catch (error) {
    console.error('Logout error:', error)
    const response = NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
    response.cookies.delete('admin_session')
    return response
  }
}

