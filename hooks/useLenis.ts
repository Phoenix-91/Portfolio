'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    // CRITICAL: Connect Lenis scroll to GSAP's ticker (from SKILL.md §10)
    lenis.on('scroll', ScrollTrigger.update)

    const tick = gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000)
    })

    // Prevent GSAP lag compensation from fighting Lenis
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}
