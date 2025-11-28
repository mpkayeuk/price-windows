export interface Project {
  id: string
  title: string
  description: string
  propertyType: string
  location: string
  images: string[]
  completedDate: string
  services: string[]
  createdAt: string
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

