type UnsplashSearchPhotosResponse = {
  total: number
  total_pages: number
  results: Array<{
    id: string
    width: number
    height: number
    blur_hash: string | null
    description: string | null
    urls: {
      raw: string
      full: string
      regular: string
      small: string
      thumb: string
    }
  }>
}

const UNSPLASH_SEARCH_URL = 'https://api.unsplash.com/search/photos'

export async function fetchUnsplashImageUrl(
  query: string,
): Promise<string | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) return null

  const url = new URL(UNSPLASH_SEARCH_URL)
  url.searchParams.set('query', query)
  url.searchParams.set('per_page', '1')
  url.searchParams.set('orientation', 'squarish')

  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  })

  if (!res.ok) return null

  const data = (await res.json()) as UnsplashSearchPhotosResponse
  return data.results?.[0]?.urls?.regular ?? null
}

