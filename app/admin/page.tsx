'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Project } from '@/lib/projects'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AdminPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: '',
    location: '',
    images: [] as string[],
    completedDate: '',
    services: [] as string[],
  })
  const [imageUrl, setImageUrl] = useState('')
  const [serviceInput, setServiceInput] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    // Check authentication
    fetch('/api/auth/verify')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setAuthenticated(true)
          fetchProjects()
        } else {
          setAuthenticated(false)
          router.push('/login')
        }
      })
      .catch(() => {
        setAuthenticated(false)
        router.push('/login')
      })
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      propertyType: '',
      location: '',
      images: [],
      completedDate: '',
      services: [],
    })
    setImageUrl('')
    setServiceInput('')
    setEditingId(null)
  }

  const handleEditProject = (project: Project) => {
    setEditingId(project.id)
    setFormData({
      title: project.title,
      description: project.description,
      propertyType: project.propertyType,
      location: project.location,
      images: project.images || [],
      completedDate: project.completedDate,
      services: project.services || [],
    })
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    try {
      const url = editingId ? `/api/projects/${editingId}` : '/api/projects'
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setMessage({ 
          type: 'success', 
          text: editingId ? 'Project updated successfully!' : 'Project added successfully!' 
        })
        resetForm()
        fetchProjects()
      } else {
        const errorData = await res.json().catch(() => ({}))
        const errorMessage = errorData.details || errorData.error || `Failed to ${editingId ? 'update' : 'add'} project`
        setMessage({ type: 'error', text: `Error: ${errorMessage}` })
        console.error(`Failed to ${editingId ? 'update' : 'add'} project:`, errorData)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : `Error ${editingId ? 'updating' : 'adding'} project`
      setMessage({ type: 'error', text: `Error: ${errorMessage}` })
      console.error(`Error ${editingId ? 'updating' : 'adding'} project:`, error)
    }
  }

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl.trim()],
      })
      setImageUrl('')
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    })
  }

  const handleAddService = () => {
    if (serviceInput.trim()) {
      setFormData({
        ...formData,
        services: [...formData.services, serviceInput.trim()],
      })
      setServiceInput('')
    }
  }

  const handleRemoveService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index),
    })
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Project deleted successfully!' })
        fetchProjects()
      } else {
        setMessage({ type: 'error', text: 'Failed to delete project' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deleting project' })
    }
  }

  const handleSeedDatabase = async () => {
    if (!confirm('This will add 6 sample projects to the database. Continue?')) return

    setMessage(null)
    try {
      const res = await fetch('/api/seed', {
        method: 'POST',
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setMessage({ type: 'success', text: data.message || 'Sample projects added successfully!' })
        fetchProjects()
      } else {
        setMessage({ type: 'error', text: data.details || data.error || 'Failed to seed database' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error seeding database' })
      console.error('Error seeding database:', error)
    }
  }

  if (authenticated === null) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <p className="text-gray-600">Checking authentication...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!authenticated) {
    return null // Will redirect to login
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <section className="py-12 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
              <p className="text-primary-100">Manage your projects</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-primary-700 px-6 py-2 rounded-lg hover:bg-primary-50 transition font-semibold"
            >
              Logout
            </button>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? 'Edit Project' : 'Add New Project'}
                </h2>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="Modern Office Building - City Centre"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Complete double glazing replacement for a 5-story office building..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Property Type *
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    >
                      <option value="">Select type</option>
                      <option value="Office Building">Office Building</option>
                      <option value="Retail">Retail</option>
                      <option value="Warehouse">Warehouse</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Hotel">Hotel</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="Manchester"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Completed Date *
                  </label>
                  <input
                    type="date"
                    value={formData.completedDate}
                    onChange={(e) => setFormData({ ...formData, completedDate: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Images (URLs)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="https://example.com/image.jpg"
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
                    >
                      Add
                    </button>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img}
                            alt={`Preview ${idx + 1}`}
                            className="w-20 h-20 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Services
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={serviceInput}
                      onChange={(e) => setServiceInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddService()
                        }
                      }}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="Commercial Double Glazed Windows"
                    />
                    <button
                      type="button"
                      onClick={handleAddService}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
                    >
                      Add
                    </button>
                  </div>
                  {formData.services.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {service}
                          <button
                            type="button"
                            onClick={() => handleRemoveService(idx)}
                            className="text-primary-700 hover:text-primary-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition transform hover:scale-105 shadow-lg"
                  >
                    {editingId ? 'Update Project' : 'Add Project'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-8 py-4 rounded-lg font-semibold text-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Existing Projects ({projects.length})</h2>
                {projects.length === 0 && (
                  <button
                    onClick={handleSeedDatabase}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
                  >
                    Add Sample Projects
                  </button>
                )}
              </div>
              {loading ? (
                <p className="text-gray-600">Loading...</p>
              ) : projects.length === 0 ? (
                <p className="text-gray-600">No projects yet.</p>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-600">
                          {project.propertyType} • {project.location} • {new Date(project.completedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

