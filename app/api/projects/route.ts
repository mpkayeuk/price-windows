import { NextRequest, NextResponse } from 'next/server'
import { Project, generateId } from '@/lib/projects'
import { getProjects, createProject } from '@/lib/db'

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newProject: Project = {
      id: generateId(),
      title: body.title,
      description: body.description,
      propertyType: body.propertyType,
      location: body.location,
      images: body.images || [],
      completedDate: body.completedDate,
      services: body.services || [],
      createdAt: new Date().toISOString(),
    }
    
    await createProject(newProject)
    
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ 
      error: 'Failed to create project',
      details: errorMessage 
    }, { status: 500 })
  }
}

