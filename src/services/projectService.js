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
