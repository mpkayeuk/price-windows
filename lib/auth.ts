import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

const SESSION_COOKIE_NAME = 'admin_session'

function getAdminUsername(): string {
  const username = process.env.ADMIN_USERNAME
  if (!username) {
    throw new Error('ADMIN_USERNAME environment variable is not set')
  }
  return username
}

function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD
  if (!password) {
    throw new Error('ADMIN_PASSWORD environment variable is not set')
  }
  return password
}

// Generate session token
function generateSessionToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64')
}

// Verify session
export async function verifySession(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
    
    if (!sessionToken) {
      return false
    }
    
    // In a real app, you'd verify the token against a database
    // For simplicity, we'll just check if it exists and is valid format
    try {
      const decoded = Buffer.from(sessionToken, 'base64').toString()
      return decoded.includes('-')
    } catch {
      return false
    }
  } catch (error) {
    console.error('Error verifying session:', error)
    return false
  }
}

// Login
export async function login(username: string, password: string): Promise<{ success: boolean; error?: string; sessionToken?: string }> {
  try {
    const adminUsername = getAdminUsername()
    const adminPassword = getAdminPassword()
    
    if (username !== adminUsername) {
      return { success: false, error: 'Invalid credentials' }
    }
    
    if (password !== adminPassword) {
      return { success: false, error: 'Invalid credentials' }
    }
  } catch (error) {
    console.error('Authentication configuration error:', error)
    return { success: false, error: 'Authentication not configured. Please set ADMIN_USERNAME and ADMIN_PASSWORD environment variables.' }
  }
  
  const sessionToken = generateSessionToken()
  
  try {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    
    return { success: true, sessionToken }
  } catch (error) {
    console.error('Error setting cookie:', error)
    return { success: true, sessionToken } // Return token even if cookie setting fails
  }
}

// Logout
export async function logout(): Promise<void> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(SESSION_COOKIE_NAME)
  } catch (error) {
    console.error('Error deleting cookie:', error)
  }
}

