import { client } from './client'
import { projectId } from '../env'

/** Sanity未設定の場合はnullを返す安全なfetch */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: { next?: { revalidate?: number } } = {}
): Promise<T | null> {
  if (!projectId || projectId === 'notconfigured') return null
  try {
    return await client.fetch<T>(query, params, options)
  } catch {
    return null
  }
}
