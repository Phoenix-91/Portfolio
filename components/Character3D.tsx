'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Character3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.set(0, 0, 6)

    // ── Lights ────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x111122, 0.8)
    scene.add(ambientLight)

    const blueLight = new THREE.PointLight(0x4f8ef7, 12, 10)
    blueLight.position.set(-2, 2, 3)
    scene.add(blueLight)

    const purpleLight = new THREE.PointLight(0x7c3aed, 10, 10)
    purpleLight.position.set(2, -1, 2)
    scene.add(purpleLight)

    const cyanLight = new THREE.PointLight(0x22d3ee, 6, 8)
    cyanLight.position.set(0, 3, 1)
    scene.add(cyanLight)

    // ── Group (entire character) ──────────────────────────
    const group = new THREE.Group()
    scene.add(group)

    // ── Head ──────────────────────────────────────────────
    const headGeo = new THREE.SphereGeometry(0.7, 64, 64)
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x1a1c2e,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x0a0a1a,
    })
    const head = new THREE.Mesh(headGeo, headMat)
    head.position.y = 1.4
    head.castShadow = true
    group.add(head)

    // Visor / face panel
    const visorGeo = new THREE.CapsuleGeometry(0.38, 0.3, 8, 24)
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x4f8ef7,
      emissive: 0x4f8ef7,
      emissiveIntensity: 0.6,
      metalness: 0.3,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
    })
    const visor = new THREE.Mesh(visorGeo, visorMat)
    visor.position.set(0, 1.45, 0.55)
    visor.rotation.x = Math.PI / 2
    group.add(visor)

    // Eyes glow
    const eyeGeo = new THREE.SphereGeometry(0.08, 16, 16)
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 2,
    })
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat)
    leftEye.position.set(-0.2, 1.48, 0.65)
    group.add(leftEye)

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat)
    rightEye.position.set(0.2, 1.48, 0.65)
    group.add(rightEye)

    // ── Neck ──────────────────────────────────────────────
    const neckGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.3, 16)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1a1c2e,
      metalness: 0.85,
      roughness: 0.15,
    })
    const neck = new THREE.Mesh(neckGeo, bodyMat)
    neck.position.y = 0.85
    group.add(neck)

    // ── Torso ─────────────────────────────────────────────
    const torsoGeo = new THREE.BoxGeometry(1.0, 1.1, 0.6, 1, 1, 1)
    const torso = new THREE.Mesh(torsoGeo, bodyMat)
    torso.position.y = 0.1
    torso.castShadow = true
    group.add(torso)

    // Chest panel (neon accent)
    const chestGeo = new THREE.BoxGeometry(0.55, 0.45, 0.05)
    const chestMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.5,
      metalness: 0.4,
      roughness: 0.2,
    })
    const chest = new THREE.Mesh(chestGeo, chestMat)
    chest.position.set(0, 0.15, 0.31)
    group.add(chest)

    // Chest lines (cyan strips)
    for (let i = 0; i < 3; i++) {
      const lineGeo = new THREE.BoxGeometry(0.35, 0.03, 0.04)
      const lineMat = new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        emissive: 0x22d3ee,
        emissiveIntensity: 1.5,
      })
      const line = new THREE.Mesh(lineGeo, lineMat)
      line.position.set(0, 0.1 - i * 0.1, 0.325)
      group.add(line)
    }

    // ── Shoulders ─────────────────────────────────────────
    const shoulderGeo = new THREE.SphereGeometry(0.22, 24, 24)
    const shoulderMat = new THREE.MeshStandardMaterial({
      color: 0x2a2d42,
      metalness: 0.9,
      roughness: 0.1,
    })
    const leftShoulder = new THREE.Mesh(shoulderGeo, shoulderMat)
    leftShoulder.position.set(-0.65, 0.55, 0)
    group.add(leftShoulder)

    const rightShoulder = new THREE.Mesh(shoulderGeo, shoulderMat)
    rightShoulder.position.set(0.65, 0.55, 0)
    group.add(rightShoulder)

    // ── Arms ──────────────────────────────────────────────
    const armGeo = new THREE.CapsuleGeometry(0.14, 0.7, 8, 16)
    const leftArm = new THREE.Mesh(armGeo, bodyMat)
    leftArm.position.set(-0.78, -0.05, 0)
    leftArm.rotation.z = 0.18
    group.add(leftArm)

    const rightArm = new THREE.Mesh(armGeo, bodyMat)
    rightArm.position.set(0.78, -0.05, 0)
    rightArm.rotation.z = -0.18
    group.add(rightArm)

    // ── Halo ring ─────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(1.1, 0.025, 16, 120)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x4f8ef7,
      emissive: 0x4f8ef7,
      emissiveIntensity: 1.5,
      metalness: 0.5,
      roughness: 0.1,
    })
    const haloRing = new THREE.Mesh(ringGeo, ringMat)
    haloRing.position.y = 1.4
    haloRing.rotation.x = Math.PI / 2.5
    group.add(haloRing)

    // Outer ring
    const outerRingGeo = new THREE.TorusGeometry(1.4, 0.012, 16, 120)
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      emissive: 0x7c3aed,
      emissiveIntensity: 1.0,
    })
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat)
    outerRing.position.y = 1.4
    outerRing.rotation.x = Math.PI / 2.5
    group.add(outerRing)

    // ── Floating particles ────────────────────────────────
    const particleCount = 120
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const particleColors = [
      new THREE.Color(0x4f8ef7),
      new THREE.Color(0x7c3aed),
      new THREE.Color(0x22d3ee),
    ]

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.8
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      const c = particleColors[Math.floor(Math.random() * 3)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ── Mouse parallax ────────────────────────────────────
    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Animation loop ────────────────────────────────────
    let frameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Floating bob
      group.position.y = Math.sin(t * 0.8) * 0.12

      // Gentle mouse-driven rotation
      group.rotation.y += (mouseX * 0.35 - group.rotation.y) * 0.04
      group.rotation.x += (mouseY * 0.12 - group.rotation.x) * 0.04

      // Halo spin
      haloRing.rotation.z = t * 0.6
      outerRing.rotation.z = -t * 0.4
      outerRing.rotation.y = t * 0.2

      // Particle slow spin
      particles.rotation.y = t * 0.05

      // Light pulse
      blueLight.intensity = 10 + Math.sin(t * 1.5) * 3
      purpleLight.intensity = 8 + Math.cos(t * 1.2) * 2

      // Eye glow pulse
      ;(leftEye.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.5 + Math.sin(t * 2) * 0.5
      ;(rightEye.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.5 + Math.sin(t * 2) * 0.5

      renderer.render(scene, camera)
    }
    animate()

    // ── Resize handler ────────────────────────────────────
    const onResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ minHeight: '500px' }}
    />
  )
}
