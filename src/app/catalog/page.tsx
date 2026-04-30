import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Sends the user to whichever catalog they last visited.
// Falls back to USA if no cookie is set.
export default async function CatalogPage() {
  const store = await cookies()
  const market = store.get('market')?.value === 'sweden' ? 'sweden' : 'usa'
  redirect(`/catalog/${market}`)
}
