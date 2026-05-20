import { cookies } from 'next/headers'
import Nav from './Nav'

export const dynamic = 'force-dynamic'

export default async function NavWrapper() {
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.has('shopify_customer_token')
  const market = cookieStore.get('market')?.value === 'sweden' ? 'sweden' : 'usa'
  return <Nav isLoggedIn={isLoggedIn} market={market} />
}
