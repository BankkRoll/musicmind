// src/pages/_app.tsx
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '@/styles/globals.css'
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </ClerkProvider>
  )
}
export default MyApp

