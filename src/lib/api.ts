// Mock API for Skip Cloud Collection interaction
export async function submitPreCadastro(data: any) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500))

  try {
    const key = 'skip_pre_cadastros_mecanicos'
    const existingStr = localStorage.getItem(key)
    const existing = existingStr ? JSON.parse(existingStr) : []

    const newRecord = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...data,
    }

    existing.push(newRecord)
    localStorage.setItem(key, JSON.stringify(existing))

    return { success: true, id: newRecord.id }
  } catch (error) {
    console.error('Failed to save pre-cadastro:', error)
    throw new Error('Falha ao salvar dados. Tente novamente.')
  }
}
