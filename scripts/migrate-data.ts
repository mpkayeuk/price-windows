/**
 * Migration script to import sample data from JSON to database
 * Run this once after setting up your database:
 * npx tsx scripts/migrate-data.ts
 */

import { createProject } from '../lib/db'
import { Project } from '../lib/projects'
import sampleData from '../lib/projects-data.json'

async function migrate() {
  console.log('Starting data migration...')
  
  try {
    for (const project of sampleData as Project[]) {
      await createProject(project)
      console.log(`✓ Migrated: ${project.title}`)
    }
    
    console.log('\n✅ Migration completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

migrate()

