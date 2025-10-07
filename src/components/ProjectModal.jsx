'use client'

import { useEffect } from 'react'

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-gray-900 border border-gray-700 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(project.tag)}`}>
                {project.tag}
              </span>
              <span className="text-gray-400 text-sm">
                {formatDate(project.data_lancamento)}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">{project.titulo}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Descrição */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Descrição</h3>
            <p className="text-gray-300 leading-relaxed">{project.descricao}</p>
          </section>

          {/* Proposta de Valor */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Proposta de Valor</h3>
            <p className="text-gray-300 leading-relaxed">{project.proposta_valor}</p>
          </section>

          {/* Mercado */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Mercado</h3>
            <p className="text-gray-300 leading-relaxed">{project.mercado}</p>
          </section>

          {/* Tecnologia */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Tecnologia</h3>
            <p className="text-gray-300 leading-relaxed">{project.tecnologia}</p>
          </section>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-700">
            <button
              onClick={() => window.open(project.link, '_blank')}
              className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-orange-600 hover:scale-105"
            >
              Acessar Projeto
            </button>
            <button
              onClick={() => window.open('/contato', '_blank')}
              className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-gray-600 hover:scale-105"
            >
              Investir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
