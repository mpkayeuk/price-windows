'use client'

import { useEffect, useState } from 'react'
import { Project } from '@/lib/projects'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch projects:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <p className="text-gray-600">Loading projects...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Projects
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Explore our portfolio of commercial double glazing projects
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {projects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No projects yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.images && project.images.length > 0 && (
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {project.propertyType}
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>📍 {project.location}</span>
                        <span>{new Date(project.completedDate).toLocaleDateString()}</span>
                      </div>
                      {project.services && project.services.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="relative h-96">
                  <img
                    src={selectedProject.images[0]}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-white text-gray-900 rounded-full p-2 hover:bg-gray-100 transition"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h2>
                <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {selectedProject.propertyType}
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <span>📍 {selectedProject.location}</span>
                <span>📅 {new Date(selectedProject.completedDate).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">{selectedProject.description}</p>
              {selectedProject.services && selectedProject.services.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Services Provided:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-50 text-primary-700 px-3 py-1 rounded text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedProject.images && selectedProject.images.length > 1 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">More Photos:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProject.images.slice(1).map((image, idx) => (
                      <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${selectedProject.title} - Photo ${idx + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

