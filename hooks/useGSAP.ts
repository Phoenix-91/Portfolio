'use client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Export a pre-configured useGSAP with plugins registered (SKILL.md §9)
gsap.registerPlugin(useGSAP, ScrollTrigger)

export { useGSAP }
export default gsap
