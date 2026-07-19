"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function hslToThreeColor(hsl: string): THREE.Color {
  // Parse HSL string like "185 85% 55%" or "hsl(185, 85%, 55%)"
  const match = hsl.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
  if (match) {
    const h = parseInt(match[1]) / 360;
    const s = parseInt(match[2]) / 100;
    const l = parseInt(match[3]) / 100;
    return new THREE.Color().setHSL(h, s, l);
  }
  // Try hex
  return new THREE.Color(hsl);
}

export function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Get theme colors from CSS variables
    const getThemeColor = (variable: string): string => {
      const color = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
      return color || "270 70% 60%";
    };

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: hslToThreeColor(getThemeColor("--primary")),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating shapes
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.OctahedronGeometry(0.25, 0),
      new THREE.TetrahedronGeometry(0.2, 0),
    ];

    const shapeMaterial = new THREE.MeshBasicMaterial({
      color: hslToThreeColor(getThemeColor("--gradient-2")),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const shape = new THREE.Mesh(geometry, shapeMaterial.clone());
      shape.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4);
      shape.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      shapes.push(shape);
      scene.add(shape);
    }

    // Create aurora blobs
    const blobGeometry = new THREE.SphereGeometry(1, 32, 32);
    const blobMaterial = new THREE.MeshBasicMaterial({
      color: hslToThreeColor(getThemeColor("--gradient-3")),
      transparent: true,
      opacity: 0.08,
    });

    const blobs: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const blob = new THREE.Mesh(blobGeometry, blobMaterial.clone());
      blob.position.set((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, -2);
      blob.scale.setScalar(Math.random() * 2 + 1);
      blobs.push(blob);
      scene.add(blob);
    }

    camera.position.z = 3;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Update colors when theme changes
    const updateColors = () => {
      const primaryColor = hslToThreeColor(getThemeColor("--primary"));
      const gradient2Color = hslToThreeColor(getThemeColor("--gradient-2"));
      const gradient3Color = hslToThreeColor(getThemeColor("--gradient-3"));

      particlesMaterial.color = primaryColor;
      shapes.forEach(shape => {
        (shape.material as THREE.MeshBasicMaterial).color = gradient2Color;
      });
      blobs.forEach(blob => {
        (blob.material as THREE.MeshBasicMaterial).color = gradient3Color;
      });
    };

    // Listen for theme changes
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.002 + i * 0.001;
        shape.rotation.y += 0.003 + i * 0.001;
        shape.position.y += Math.sin(time + i) * 0.001;
      });

      blobs.forEach((blob, i) => {
        blob.position.x += Math.sin(time * 0.5 + i) * 0.002;
        blob.position.y += Math.cos(time * 0.3 + i) * 0.001;
        blob.scale.setScalar(1 + Math.sin(time + i) * 0.2);
      });

      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      container.removeChild(renderer.domElement);
      geometries.forEach(g => g.dispose());
      particlesGeometry.dispose();
      blobGeometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
    />
  );
}
