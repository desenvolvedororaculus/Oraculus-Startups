import { supabase } from '../lib/supabase'

export const fetchProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projetos')
      .select('*')
      .order('data_lancamento', { ascending: false })

    if (error) {
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return []
  }
}

export const fetchProjectById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('projetos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Erro ao buscar projeto:', error)
    return null
  }
}

export const createProject = async (projectData) => {
  try {
    const { data, error } = await supabase
      .from('projetos')
      .insert([projectData])
      .select()

    if (error) {
      throw error
    }

    return data[0]
  } catch (error) {
    console.error('Erro ao criar projeto:', error)
    throw error
  }
}

export const updateProject = async (id, projectData) => {
  try {
    const { data, error } = await supabase
      .from('projetos')
      .update(projectData)
      .eq('id', id)
      .select()

    if (error) {
      throw error
    }

    return data[0]
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error)
    throw error
  }
}

export const deleteProject = async (id) => {
  try {
    const { error } = await supabase
      .from('projetos')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Erro ao excluir projeto:', error)
    throw error
  }
}
