'use client'

import { useState, useEffect } from 'react'

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    titulo: '',
    resumo: '',
    data_lancamento: '',
    tag: 'ALPHA',
    link: '',
    descricao: '',
    proposta_valor: '',
    mercado: '',
    tecnologia: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (project) {
      setFormData({
        titulo: project.titulo || '',
        resumo: project.resumo || '',
        data_lancamento: project.data_lancamento || '',
        tag: project.tag || 'ALPHA',
        link: project.link || '',
        descricao: project.descricao || '',
        proposta_valor: project.proposta_valor || '',
        mercado: project.mercado || '',
        tecnologia: project.tecnologia || ''
      })
    }
  }, [project])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório'
    }

    if (!formData.resumo.trim()) {
      newErrors.resumo = 'Resumo é obrigatório'
    }

    if (!formData.data_lancamento) {
      newErrors.data_lancamento = 'Data de lançamento é obrigatória'
    }

    if (!formData.link.trim()) {
      newErrors.link = 'Link é obrigatório'
    } else if (!isValidUrl(formData.link)) {
      newErrors.link = 'URL inválida'
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória'
    }

    if (!formData.proposta_valor.trim()) {
      newErrors.proposta_valor = 'Proposta de valor é obrigatória'
    }

    if (!formData.mercado.trim()) {
      newErrors.mercado = 'Mercado é obrigatório'
    }

    if (!formData.tecnologia.trim()) {
      newErrors.tecnologia = 'Tecnologia é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleCancel}
      />
      
      {/* Modal Content */}
      <div className="relative bg-gray-900 border border-gray-700 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            {project ? 'Editar Projeto' : 'Adicionar Novo Projeto'}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título e Tag */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Título *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.titulo ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Nome do projeto"
              />
              {errors.titulo && (
                <p className="text-red-400 text-sm mt-1">{errors.titulo}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tag *
              </label>
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="ALPHA">ALPHA</option>
                <option value="BETA">BETA</option>
              </select>
            </div>
          </div>

          {/* Resumo */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Resumo *
            </label>
            <textarea
              name="resumo"
              value={formData.resumo}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.resumo ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Breve descrição do projeto para o card"
            />
            {errors.resumo && (
              <p className="text-red-400 text-sm mt-1">{errors.resumo}</p>
            )}
          </div>

          {/* Data e Link */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Data de Lançamento *
              </label>
              <input
                type="date"
                name="data_lancamento"
                value={formData.data_lancamento}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.data_lancamento ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.data_lancamento && (
                <p className="text-red-400 text-sm mt-1">{errors.data_lancamento}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Link do Projeto *
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.link ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="https://exemplo.com"
              />
              {errors.link && (
                <p className="text-red-400 text-sm mt-1">{errors.link}</p>
              )}
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Descrição Completa *
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.descricao ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Descrição detalhada do projeto"
            />
            {errors.descricao && (
              <p className="text-red-400 text-sm mt-1">{errors.descricao}</p>
            )}
          </div>

          {/* Proposta de Valor */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Proposta de Valor *
            </label>
            <textarea
              name="proposta_valor"
              value={formData.proposta_valor}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.proposta_valor ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Qual o valor que este projeto oferece?"
            />
            {errors.proposta_valor && (
              <p className="text-red-400 text-sm mt-1">{errors.proposta_valor}</p>
            )}
          </div>

          {/* Mercado e Tecnologia */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Mercado *
              </label>
              <textarea
                name="mercado"
                value={formData.mercado}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.mercado ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Mercado alvo do projeto"
              />
              {errors.mercado && (
                <p className="text-red-400 text-sm mt-1">{errors.mercado}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tecnologia *
              </label>
              <textarea
                name="tecnologia"
                value={formData.tecnologia}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.tecnologia ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Tecnologias utilizadas"
              />
              {errors.tecnologia && (
                <p className="text-red-400 text-sm mt-1">{errors.tecnologia}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-orange-600"
            >
              {project ? 'Salvar Alterações' : 'Adicionar Projeto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
