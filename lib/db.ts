import { sql } from '@vercel/postgres'
import { Project } from './projects'

// Initialize the database table if it doesn't exist
export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(255) PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        property_type VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        images TEXT[],
        completed_date DATE NOT NULL,
        services TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}

// Get all projects
export async function getProjects(): Promise<Project[]> {
  try {
    await initDatabase()
    const result = await sql`
      SELECT 
        id,
        title,
        description,
        property_type as "propertyType",
        location,
        images,
        completed_date as "completedDate",
        services,
        created_at as "createdAt"
      FROM projects
      ORDER BY completed_date DESC
    `
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      propertyType: row.propertyType,
      location: row.location,
      images: Array.isArray(row.images) ? row.images : [],
      completedDate: row.completedDate,
      services: Array.isArray(row.services) ? row.services : [],
      createdAt: row.createdAt || new Date().toISOString(),
    })) as Project[]
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Create a new project
export async function createProject(project: Project): Promise<Project> {
  try {
    await initDatabase()
    await sql`
      INSERT INTO projects (
        id,
        title,
        description,
        property_type,
        location,
        images,
        completed_date,
        services,
        created_at
      ) VALUES (
        ${project.id},
        ${project.title},
        ${project.description},
        ${project.propertyType},
        ${project.location},
        ${sql.array(project.images || [])},
        ${project.completedDate},
        ${sql.array(project.services || [])},
        ${project.createdAt}
      )
    `
    return project
  } catch (error) {
    console.error('Error creating project:', error)
    throw error
  }
}

// Update a project
export async function updateProject(id: string, project: Partial<Project>): Promise<Project> {
  try {
    await initDatabase()
    await sql`
      UPDATE projects
      SET 
        title = ${project.title},
        description = ${project.description},
        property_type = ${project.propertyType},
        location = ${project.location},
        images = ${sql.array(project.images || [])},
        completed_date = ${project.completedDate},
        services = ${sql.array(project.services || [])}
      WHERE id = ${id}
    `
    
    // Fetch and return the updated project
    const result = await sql`
      SELECT 
        id,
        title,
        description,
        property_type as "propertyType",
        location,
        images,
        completed_date as "completedDate",
        services,
        created_at as "createdAt"
      FROM projects
      WHERE id = ${id}
    `
    
    const row = result.rows[0]
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      propertyType: row.propertyType,
      location: row.location,
      images: Array.isArray(row.images) ? row.images : [],
      completedDate: row.completedDate,
      services: Array.isArray(row.services) ? row.services : [],
      createdAt: row.createdAt || new Date().toISOString(),
    } as Project
  } catch (error) {
    console.error('Error updating project:', error)
    throw error
  }
}

// Delete a project
export async function deleteProject(id: string): Promise<void> {
  try {
    await initDatabase()
    await sql`
      DELETE FROM projects
      WHERE id = ${id}
    `
  } catch (error) {
    console.error('Error deleting project:', error)
    throw error
  }
}

