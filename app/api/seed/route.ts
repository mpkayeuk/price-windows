import { NextResponse } from 'next/server'
import { createProject } from '@/lib/db'
import { Project, generateId } from '@/lib/projects'

const sampleProjects: Omit<Project, 'id' | 'createdAt'>[] = [
  {
    title: 'Modern Office Building - City Centre',
    description: 'Complete double glazing replacement for a 5-story office building. Installed 120 energy-efficient windows with minimal business disruption. The project was completed on schedule with zero downtime for tenants.',
    propertyType: 'Office Building',
    location: 'Manchester',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    ],
    completedDate: '2024-01-15',
    services: ['Commercial Double Glazed Windows', 'Window Replacement'],
  },
  {
    title: 'Retail Chain - Multiple Locations',
    description: 'Large-scale commercial door installation across 8 retail locations. Heavy-duty entrance doors designed for high-traffic areas. All installations completed within 2 weeks with coordinated scheduling.',
    propertyType: 'Retail',
    location: 'Liverpool',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1555529908-3afb9c2e0d02?w=800'
    ],
    completedDate: '2024-02-20',
    services: ['Commercial Entrance Doors'],
  },
  {
    title: 'Warehouse Facility - Industrial',
    description: 'Large sliding door systems installed for a 10,000 sq ft warehouse. Maximized natural light and improved operational efficiency. Weather-resistant doors designed for industrial use.',
    propertyType: 'Warehouse',
    location: 'Birmingham',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
    ],
    completedDate: '2024-03-10',
    services: ['Commercial Sliding Doors'],
  },
  {
    title: 'Restaurant Complex - Waterfront',
    description: 'Bi-fold door installation for a premium restaurant with stunning waterfront views. The doors create a seamless indoor-outdoor dining experience, opening the entire front of the restaurant.',
    propertyType: 'Restaurant',
    location: 'Brighton',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'
    ],
    completedDate: '2024-04-05',
    services: ['Bi-Fold Door Systems'],
  },
  {
    title: 'Hotel Renovation - City Centre',
    description: 'Complete window and door replacement for a 4-star hotel. 200+ windows and 15 entrance doors replaced with energy-efficient double glazing. Project completed in phases to minimize guest disruption.',
    propertyType: 'Hotel',
    location: 'London',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
    ],
    completedDate: '2024-05-12',
    services: ['Commercial Double Glazed Windows', 'Commercial Entrance Doors', 'Window Replacement'],
  },
  {
    title: 'Industrial Unit - Manufacturing',
    description: 'Large-scale window replacement for a manufacturing facility. Installed 80 heavy-duty commercial windows designed for industrial environments. Improved natural lighting and energy efficiency.',
    propertyType: 'Industrial',
    location: 'Leeds',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800'
    ],
    completedDate: '2024-06-18',
    services: ['Commercial Window Replacement', 'Commercial Double Glazed Windows'],
  },
]

export async function POST() {
  try {
    const createdProjects: Project[] = []
    
    for (const projectData of sampleProjects) {
      const project: Project = {
        id: generateId(),
        ...projectData,
        createdAt: new Date().toISOString(),
      }
      
      await createProject(project)
      createdProjects.push(project)
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully created ${createdProjects.length} sample projects`,
      projects: createdProjects 
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ 
      success: false,
      error: 'Failed to seed database',
      details: errorMessage 
    }, { status: 500 })
  }
}

