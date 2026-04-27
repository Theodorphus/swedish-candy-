import { cookies } from 'next/headers'
import Nav from './Nav'

export default async function NavWrapper() {
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.has('shopify_customer_token')
  return <Nav isLoggedIn={isLoggedIn} />
}
