'use client'

import { useState, useEffect } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import { fetchProjects } from '../services/projectService'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        const data = await fetchProjects()
        setProjects(data)
      } catch (err) {
        setError('Erro ao carregar projetos. Verifique a conexão com o banco de dados.')
        console.error('Erro:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const handleCardClick = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando projetos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-4">Erro de Conexão</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <p className="text-gray-400 text-sm">
            Verifique se as variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY estão configuradas corretamente.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-white text-center">
            Portfolio de Projetos
          </h1>
          <p className="text-gray-400 text-center mt-2 max-w-2xl mx-auto">
            Descubra projetos inovadores e oportunidades de investimento
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">📁</div>
            <h2 className="text-white text-2xl font-bold mb-4">Nenhum projeto encontrado</h2>
            <p className="text-gray-400">
              Não há projetos disponíveis no momento. Verifique a conexão com o banco de dados.
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8">
              <p className="text-gray-400">
                {projects.length} {projects.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
