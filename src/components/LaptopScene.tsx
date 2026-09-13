import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type LaptopSceneProps = {
  className?: string;
};

function createRoundedPanel(width: number, height: number, depth: number, color: number, radius = 0.08) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.025, bevelThickness: 0.025 });
  geometry.center();
  return new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, metalness: 0.7, roughness: 0.28 }));
}

function createKey(x: number, y: number, z: number, width: number, height: number, material: THREE.Material) {
  const geometry = new THREE.BoxGeometry(width, height, 0.025);
  const key = new THREE.Mesh(geometry, material);
  key.position.set(x, y, z);
  return key;
}

export default function LaptopScene({ className = '' }: LaptopSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setHasError(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 1.25, 7.5);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.HemisphereLight(0x8de9ff, 0x07111d, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(3, 5, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const greenLight = new THREE.PointLight(0x10b981, 8, 7);
    greenLight.position.set(-3, 0.8, 2);
    scene.add(greenLight);

    const laptop = new THREE.Group();
    laptop.position.y = -0.35;
    laptop.rotation.x = -0.12;
    scene.add(laptop);

    const base = new THREE.Group();
    base.rotation.x = -0.08;
    laptop.add(base);

    const edgeMaterial = new THREE.MeshStandardMaterial({ color: 0x2c4d68, metalness: 0.75, roughness: 0.25 });
    const keyMaterial = new THREE.MeshStandardMaterial({ color: 0x07131f, metalness: 0.3, roughness: 0.7 });
    const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const cyanMaterial = new THREE.MeshBasicMaterial({ color: 0x22d3ee });

    const basePanel = createRoundedPanel(5.3, 3.2, 0.28, 0x132538, 0.12);
    basePanel.rotation.x = -Math.PI / 2;
    basePanel.position.y = 0.16;
    basePanel.castShadow = true;
    basePanel.receiveShadow = true;
    base.add(basePanel);

    const keyboard = new THREE.Group();
    keyboard.position.set(0, 0.34, 0.06);
    base.add(keyboard);
    const rows = [10, 10, 9, 8];
    rows.forEach((count, row) => {
      const rowWidth = count * 0.34;
      for (let index = 0; index < count; index += 1) {
        const key = createKey((index - (count - 1) / 2) * 0.34, 0, row * 0.28 - 0.18, 0.27, 0.2, keyMaterial);
        key.rotation.x = -Math.PI / 2;
        keyboard.add(key);
      }
      if (row === 0) {
        const accent = createKey(-rowWidth / 2 - 0.1, 0, 0.04, 0.08, 0.2, cyanMaterial);
        accent.rotation.x = -Math.PI / 2;
        keyboard.add(accent);
      }
    });

    const trackpad = new THREE.Mesh(
      new THREE.BoxGeometry(1.45, 0.95, 0.025),
      new THREE.MeshStandardMaterial({ color: 0x1b344a, metalness: 0.6, roughness: 0.3 }),
    );
    trackpad.rotation.x = -Math.PI / 2;
    trackpad.position.set(0, 0.34, -1.05);
    base.add(trackpad);

    const frontLight = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.025, 0.025), glowMaterial);
    frontLight.position.set(0, 0.02, -1.6);
    base.add(frontLight);

    const hinge = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.22, 0.22), edgeMaterial);
    hinge.position.set(0, 0.42, 1.45);
    base.add(hinge);

    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.48, 1.48);
    screenGroup.rotation.x = -0.1;
    laptop.add(screenGroup);

    const screenBack = createRoundedPanel(5.15, 3.35, 0.22, 0x142b40, 0.12);
    screenBack.position.y = 1.52;
    screenBack.castShadow = true;
    screenGroup.add(screenBack);

    const screen = createRoundedPanel(4.68, 2.85, 0.03, 0x06121e, 0.08);
    screen.position.set(0, 1.52, -0.14);
    screenGroup.add(screen);

    const screenGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(4.32, 2.16),
      new THREE.MeshBasicMaterial({ color: 0x092538, transparent: true, opacity: 0.9 }),
    );
    screenGlow.position.set(0, 1.52, -0.17);
    screenGroup.add(screenGlow);

    const terminalLines = new THREE.Group();
    terminalLines.visible = false;
    terminalLines.position.set(-1.85, 1.52, -0.2);
    const lineColors = [0x34d399, 0x22d3ee, 0x6ee7b7, 0x59748d, 0x59748d, 0x34d399];
    lineColors.forEach((color, index) => {
      const line = new THREE.Mesh(new THREE.BoxGeometry(index === 0 ? 1.45 : 1.05 + (index % 3) * 0.4, 0.045, 0.012), new THREE.MeshBasicMaterial({ color }));
      line.position.set((index % 2) * 0.28, 0.82 - index * 0.27, 0);
      terminalLines.add(line);
    });
    const cursor = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.16, 0.02), glowMaterial);
    cursor.position.set(1.34, -0.53, 0);
    terminalLines.add(cursor);
    screenGroup.add(terminalLines);

    const terminalTexture = new THREE.TextureLoader().load(
      '/assets/images/ssh_terminal.png',
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.needsUpdate = true;
        const screenMaterial = screenGlow.material as THREE.MeshBasicMaterial;
        screenMaterial.map = texture;
        screenMaterial.color.set(0xffffff);
        screenMaterial.opacity = 1;
        screenMaterial.needsUpdate = true;
        terminalLines.visible = false;
      },
      undefined,
      () => {
        terminalLines.visible = true;
      },
    );

    const logo = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.17, 6), cyanMaterial);
    logo.position.set(0, 1.52, -0.28);
    logo.rotation.z = Math.PI / 6;
    screenGroup.add(logo);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(4.2, 64),
      new THREE.MeshBasicMaterial({ color: 0x0a2430, transparent: true, opacity: 0.52 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.7;
    floor.scale.set(1.5, 0.52, 1);
    scene.add(floor);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(2.6, 2.63, 96),
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.42, side: THREE.DoubleSide }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.68;
    ring.scale.set(1.45, 0.5, 1);
    scene.add(ring);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    let pointerDown = false;
    let pointerX = 0;
    let pointerY = 0;
    let targetRotationY = 0.34;
    let targetRotationX = -0.12;
    const onPointerDown = (event: PointerEvent) => {
      pointerDown = true;
      pointerX = event.clientX;
      pointerY = event.clientY;
      mount.setPointerCapture(event.pointerId);
      setIsDragging(true);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!pointerDown) return;
      targetRotationY += (event.clientX - pointerX) * 0.008;
      targetRotationX = THREE.MathUtils.clamp(targetRotationX + (event.clientY - pointerY) * 0.005, -0.4, 0.18);
      pointerX = event.clientX;
      pointerY = event.clientY;
    };
    const onPointerUp = () => {
      pointerDown = false;
      setIsDragging(false);
    };
    mount.addEventListener('pointerdown', onPointerDown);
    mount.addEventListener('pointermove', onPointerMove);
    mount.addEventListener('pointerup', onPointerUp);
    mount.addEventListener('pointercancel', onPointerUp);
    mount.addEventListener('pointerleave', onPointerUp);

    const clock = new THREE.Clock();
    let animationFrame = 0;
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      if (!pointerDown) targetRotationY += 0.0018;
      laptop.rotation.y = THREE.MathUtils.lerp(laptop.rotation.y, targetRotationY, 0.06);
      laptop.rotation.x = THREE.MathUtils.lerp(laptop.rotation.x, targetRotationX + Math.sin(elapsed * 1.2) * 0.015, 0.06);
      ring.rotation.z = elapsed * 0.08;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      mount.removeEventListener('pointerdown', onPointerDown);
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerup', onPointerUp);
      mount.removeEventListener('pointercancel', onPointerUp);
      mount.removeEventListener('pointerleave', onPointerUp);
      terminalTexture.dispose();
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={`laptop-scene ${className}`} ref={mountRef} data-dragging={isDragging}>
      {hasError ? <div className="laptop-fallback">WebGL preview unavailable</div> : null}
      <div className="laptop-scene-badge">
        <span className="laptop-scene-dot" />
        <span>{isDragging ? 'Release to inspect' : 'Drag to rotate'}</span>
      </div>
    </div>
  );
}
