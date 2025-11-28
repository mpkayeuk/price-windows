import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Project } from '@/lib/projects'

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projects = await getProjects()
    const filtered = projects.filter(p => p.id !== params.id)
    await saveProjects(filtered)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}

