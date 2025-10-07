'use client'

import { useState } from 'react'

export default function ProjectCard({ project, onCardClick }) {
  const [isHovered, setIsHovered] = useState(false)

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

  const handleCardClick = (e) => {
    // Evita abrir o modal se clicar nos botões
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return
    }
    onCardClick(project)
  }

  return (
    <div
      className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:bg-gray-800/50 hover:border-gray-600/50 hover:shadow-xl hover:shadow-black/20"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header com Tag */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(project.tag)}`}>
          {project.tag}
        </span>
        <div className="text-gray-400 text-sm">
          {formatDate(project.data_lancamento)}
        </div>
      </div>

      {/* Título */}
      <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
        {project.titulo}
      </h3>

      {/* Resumo */}
      <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
        {project.resumo}
      </p>

      {/* Botões */}
      <div className="flex gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation()
            window.open(project.link, '_blank')
          }}
          className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-orange-600 hover:scale-105"
        >
          Acessar
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            // Link fixo para investimento via WhatsApp
            window.open('https://wa.me/5584994094278', '_blank')
          }}
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-gray-600 hover:scale-105"
        >
          Investir
        </button>
      </div>
    </div>
  )
}
