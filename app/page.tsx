'use client'
import { useLenis } from '@/hooks/useLenis'
import dynamic from 'next/dynamic'

const CustomCursor   = dynamic(() => import('@/components/CustomCursor'),   { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false })
const Navbar         = dynamic(() => import('@/components/Navbar'),         { ssr: false })
const Hero           = dynamic(() => import('@/components/Hero'),           { ssr: false })
const About          = dynamic(() => import('@/components/About'),          { ssr: false })
const Skills         = dynamic(() => import('@/components/Skills'),         { ssr: false })
const Projects       = dynamic(() => import('@/components/Projects'),       { ssr: false })
const Experience     = dynamic(() => import('@/components/Experience'),     { ssr: false })
const Resume         = dynamic(() => import('@/components/Resume'),         { ssr: false })
const Contact        = dynamic(() => import('@/components/Contact'),        { ssr: false })
const Footer         = dynamic(() => import('@/components/Footer'),         { ssr: false })

export default function Home() {
  useLenis()
  return (
    <main className="min-h-screen" style={{ background: '#26282e' }}>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Resume />
      <Contact />
      <Footer />
    </main>
  )
}

