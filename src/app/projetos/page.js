'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '../../contexts/AuthContext'
import ProjectForm from '../../components/ProjectForm'
import { fetchProjects, createProject, updateProject, deleteProject } from '../../services/projectService'

export default function ProjetosPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      loadProjects()
    }
  }, [user])

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

  const handleAddProject = () => {
    setEditingProject(null)
    setShowForm(true)
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await deleteProject(projectId)
        await loadProjects()
      } catch (err) {
        setError('Erro ao excluir projeto.')
        console.error('Erro:', err)
      }
    }
  }

  const handleFormSubmit = async (projectData) => {
    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectData)
      } else {
        await createProject(projectData)
      }
      setShowForm(false)
      setEditingProject(null)
      await loadProjects()
    } catch (err) {
      setError('Erro ao salvar projeto.')
      console.error('Erro:', err)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingProject(null)
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getTagColor = (tag) => {
    switch (tag) {
      case 'ALPHA':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'BETA':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Será redirecionado para login
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
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
          <button
            onClick={loadProjects}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Logo, Título e Botão de Logout */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logos/Laranja.png"
                alt="Oraculus"
                width={60}
                height={60}
                className="h-12 w-12"
                priority
              />
              <h1 className="text-4xl font-bold text-white">
                Gerenciar Projetos
              </h1>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sair
            </button>
          </div>
          
          <p className="text-gray-400 text-center mt-2 max-w-2xl mx-auto">
            Adicione, edite ou remova projetos do portfólio
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Actions */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Projetos ({projects.length})
            </h2>
            <p className="text-gray-400">
              Gerencie todos os projetos do portfólio
            </p>
          </div>
          <button
            onClick={handleAddProject}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Adicionar Projeto
          </button>
        </div>

        {/* Projects Table */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">📁</div>
            <h3 className="text-white text-2xl font-bold mb-4">Nenhum projeto encontrado</h3>
            <p className="text-gray-400 mb-6">
              Comece adicionando seu primeiro projeto
            </p>
            <button
              onClick={handleAddProject}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Adicionar Primeiro Projeto
            </button>
          </div>
        ) : (
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Projeto
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Tag
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-800/30">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-white font-medium text-lg">
                            {project.titulo}
                          </div>
                          <div className="text-gray-400 text-sm mt-1 line-clamp-2">
                            {project.resumo}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(project.tag)}`}>
                          {project.tag}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {formatDate(project.data_lancamento)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded-lg transition-colors"
                            title="Editar projeto"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Excluir projeto"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  )
}
