import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Project, generateId } from '@/lib/projects'

const dataFilePath = path.join(process.cwd(), 'lib', 'projects-data.json')

async function getProjects(): Promise<Project[]> {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    return []
  }
}

async function saveProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2))
}

export async function GET() {
  try {
    const projects = await getProjects()
    // Sort by completed date, most recent first
    const sorted = projects.sort((a, b) => 
      new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
    )
    return NextResponse.json(sorted)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const projects = await getProjects()
    
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
    
    projects.push(newProject)
    await saveProjects(projects)
    
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

