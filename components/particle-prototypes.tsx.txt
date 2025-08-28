import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeJSParticleSystems = () => {
  const mountRef = useRef(null);
  const [currentDemo, setCurrentDemo] = useState('network');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a0b, 1);
    mountRef.current.appendChild(renderer.domElement);

    // Mouse tracking
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let hoveredNode = null;

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Network Mesh System
    const createNetworkMesh = () => {
      const networkGroup = new THREE.Group();
      const nodes = [];
      const connectionLines = [];

      // Create main skill nodes with different sizes/colors
      const skills = [
        { name: 'TypeScript', color: 0x3178c6, size: 1.2 },
        { name: 'React', color: 0x61dafb, size: 1.0 },
        { name: 'Node.js', color: 0x339933, size: 1.1 },
        { name: 'GraphQL', color: 0xe10098, size: 0.9 },
        { name: 'Three.js', color: 0x00ff88, size: 1.3 },
        { name: 'WebGL', color: 0xff6b35, size: 0.8 },
        { name: 'GSAP', color: 0x88ce02, size: 0.7 },
        { name: 'PostgreSQL', color: 0x336791, size: 0.9 }
      ];

      // Create main skill nodes
      skills.forEach((skill, index) => {
        let geometry;
        if (index % 3 === 0) {
          geometry = new THREE.SphereGeometry(skill.size * 0.5, 16, 16);
        } else if (index % 3 === 1) {
          geometry = new THREE.OctahedronGeometry(skill.size * 0.4);
        } else {
          geometry = new THREE.TetrahedronGeometry(skill.size * 0.6);
        }

        const material = new THREE.MeshBasicMaterial({
          color: skill.color,
          transparent: true,
          opacity: 0.9
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Position main nodes in organized clusters
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 10;
        mesh.position.x = Math.cos(angle) * radius + (Math.random() - 0.5) * 4;
        mesh.position.y = Math.sin(index * 0.7) * 6 + (Math.random() - 0.5) * 3;
        mesh.position.z = Math.sin(angle) * radius + (Math.random() - 0.5) * 4;

        mesh.userData = {
          skill: skill.name,
          originalColor: skill.color,
          originalScale: mesh.scale.clone(),
          originalPosition: mesh.position.clone(),
          floatOffset: index * 0.5,
          type: 'main',
          isInteractive: true
        };

        nodes.push(mesh);
        networkGroup.add(mesh);
      });

      // Create smaller connecting nodes to fill the mesh
      for (let i = 0; i < 25; i++) {
        const geometry = new THREE.SphereGeometry(0.15, 8, 8);
        const material = new THREE.MeshBasicMaterial({
          color: 0x00ff88,
          transparent: true,
          opacity: 0.4
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Scatter connecting nodes throughout the space
        mesh.position.x = (Math.random() - 0.5) * 35;
        mesh.position.y = (Math.random() - 0.5) * 20;
        mesh.position.z = (Math.random() - 0.5) * 35;

        mesh.userData = {
          originalPosition: mesh.position.clone(),
          floatOffset: i * 0.3 + Math.random() * 2,
          type: 'connector',
          isInteractive: false,
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.008,
            (Math.random() - 0.5) * 0.01
          )
        };

        nodes.push(mesh);
        networkGroup.add(mesh);
      }

      // Create dynamic connection lines between nodes
      const createConnectionLine = (nodeA, nodeB, opacity = 0.4) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(6); // 2 points * 3 coordinates
        geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(positions, 3)
        );

        const material = new THREE.LineBasicMaterial({
          color:
            nodeA.userData.type === 'main' && nodeB.userData.type === 'main'
              ? 0x00ff88
              : 0x666666,
          transparent: true,
          opacity: opacity
        });

        const line = new THREE.Line(geometry, material);
        line.userData = { nodeA, nodeB, baseOpacity: opacity };

        return line;
      };

      // Create connections between nodes with different rules
      for (let i = 0; i < nodes.length; i++) {
        let connectionCount = 0;
        const maxConnections = nodes[i].userData.type === 'main' ? 6 : 3;

        for (let j = i + 1; j < nodes.length; j++) {
          if (connectionCount >= maxConnections) break;

          const nodeA = nodes[i];
          const nodeB = nodes[j];
          const distance = nodeA.position.distanceTo(nodeB.position);

          // Connection rules based on node types
          let shouldConnect = false;
          let opacity = 0.4;

          if (
            nodeA.userData.type === 'main' &&
            nodeB.userData.type === 'main'
          ) {
            // Main to main - only connect if reasonably close
            shouldConnect = distance < 16;
            opacity = 0.6;
          } else if (
            nodeA.userData.type === 'main' &&
            nodeB.userData.type === 'connector'
          ) {
            // Main to connector - connect if close
            shouldConnect = distance < 12;
            opacity = 0.3;
          } else if (
            nodeA.userData.type === 'connector' &&
            nodeB.userData.type === 'connector'
          ) {
            // Connector to connector - only very close ones
            shouldConnect = distance < 8;
            opacity = 0.2;
          }

          if (shouldConnect) {
            const line = createConnectionLine(nodeA, nodeB, opacity);
            connectionLines.push(line);
            networkGroup.add(line);
            connectionCount++;
          }
        }
      }

      // Function to update all connection lines
      const updateConnections = () => {
        connectionLines.forEach((line) => {
          const { nodeA, nodeB, baseOpacity } = line.userData;
          const positions = line.geometry.attributes.position.array;

          // Update line endpoints to match node positions
          positions[0] = nodeA.position.x;
          positions[1] = nodeA.position.y;
          positions[2] = nodeA.position.z;

          positions[3] = nodeB.position.x;
          positions[4] = nodeB.position.y;
          positions[5] = nodeB.position.z;

          line.geometry.attributes.position.needsUpdate = true;

          // Adjust opacity based on distance and type
          const distance = nodeA.position.distanceTo(nodeB.position);
          const maxDistance =
            nodeA.userData.type === 'main' && nodeB.userData.type === 'main'
              ? 20
              : 15;
          const distanceOpacity = Math.max(0.05, 1 - distance / maxDistance);
          line.material.opacity = baseOpacity * distanceOpacity;
        });
      };

      return { group: networkGroup, nodes, connectionLines, updateConnections };
    };

    // Code Particles System
    const createCodeParticles = () => {
      const particleGroup = new THREE.Group();
      const particles = [];
      const symbols = [
        '{',
        '}',
        '(',
        ')',
        '[',
        ']',
        '<',
        '>',
        ';',
        '=',
        '+',
        '-'
      ];

      symbols.forEach((symbol, index) => {
        for (let i = 0; i < 3; i++) {
          // Create text geometry
          const geometry = new THREE.PlaneGeometry(2, 2);
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = 128;
          canvas.height = 128;

          context.fillStyle = '#00ff88';
          context.font = 'bold 80px JetBrains Mono';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(symbol, 64, 64);

          const texture = new THREE.CanvasTexture(canvas);
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            alphaTest: 0.1
          });

          const mesh = new THREE.Mesh(geometry, material);

          // Random position
          mesh.position.x = (Math.random() - 0.5) * 50;
          mesh.position.y = (Math.random() - 0.5) * 30;
          mesh.position.z = (Math.random() - 0.5) * 30;

          // Random rotation
          mesh.rotation.x = Math.random() * Math.PI;
          mesh.rotation.y = Math.random() * Math.PI;

          // Store velocity
          mesh.userData = {
            velocity: new THREE.Vector3(
              (Math.random() - 0.5) * 0.02,
              (Math.random() - 0.5) * 0.02,
              (Math.random() - 0.5) * 0.02
            ),
            symbol
          };

          particles.push(mesh);
          particleGroup.add(mesh);
        }
      });

      return { group: particleGroup, particles };
    };

    // Geometric Shapes System
    const createGeometricShapes = () => {
      const shapesGroup = new THREE.Group();
      const shapes = [];
      const geometries = [
        new THREE.TetrahedronGeometry(1),
        new THREE.OctahedronGeometry(1),
        new THREE.DodecahedronGeometry(1),
        new THREE.IcosahedronGeometry(1)
      ];

      for (let i = 0; i < 20; i++) {
        const geometry =
          geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
          wireframe: Math.random() > 0.5,
          transparent: true,
          opacity: 0.6
        });

        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = (Math.random() - 0.5) * 40;
        mesh.position.y = (Math.random() - 0.5) * 40;
        mesh.position.z = (Math.random() - 0.5) * 40;

        mesh.userData = {
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
          }
        };

        shapes.push(mesh);
        shapesGroup.add(mesh);
      }

      return { group: shapesGroup, shapes };
    };

    // Initialize systems
    let activeSystem = null;

    const initializeSystem = (type) => {
      // Clear previous system
      if (activeSystem) {
        scene.remove(activeSystem.group);
      }

      switch (type) {
        case 'network':
          activeSystem = createNetworkMesh();
          camera.position.set(0, 0, 30);
          break;
        case 'code':
          activeSystem = createCodeParticles();
          camera.position.set(0, 0, 25);
          break;
        case 'geometric':
          activeSystem = createGeometricShapes();
          camera.position.set(0, 0, 35);
          break;
      }

      scene.add(activeSystem.group);
    };

    initializeSystem(currentDemo);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (activeSystem) {
        // Network mesh interactions
        if (currentDemo === 'network' && activeSystem.nodes) {
          // Raycasting for mouse interaction (only with main nodes)
          raycaster.setFromCamera(mouse, camera);
          const mainNodes = activeSystem.nodes.filter(
            (node) => node.userData.isInteractive
          );
          const intersects = raycaster.intersectObjects(mainNodes);

          // Reset previous hover
          if (
            hoveredNode &&
            !intersects.find((i) => i.object === hoveredNode)
          ) {
            hoveredNode.material.color.setHex(
              hoveredNode.userData.originalColor
            );
            hoveredNode.scale.copy(hoveredNode.userData.originalScale);
            hoveredNode = null;
            setIsHovering(false);
          }

          if (intersects.length > 0) {
            const newHovered = intersects[0].object;
            if (newHovered !== hoveredNode) {
              hoveredNode = newHovered;
              hoveredNode.material.color.setHex(0x00ff88);
              hoveredNode.scale.multiplyScalar(1.5);
              setIsHovering(true);
            }
          }

          // Animate nodes with different behaviors
          const time = Date.now() * 0.001;
          activeSystem.nodes.forEach((node, index) => {
            if (node.userData.type === 'main') {
              // Main nodes: gentle floating around original position
              node.rotation.x += 0.008;
              node.rotation.y += 0.012;

              const floatY =
                Math.sin(time * 0.7 + node.userData.floatOffset) * 1.5;
              const floatX =
                Math.cos(time * 0.5 + node.userData.floatOffset) * 0.8;

              node.position.x = node.userData.originalPosition.x + floatX;
              node.position.y = node.userData.originalPosition.y + floatY;
              node.position.z =
                node.userData.originalPosition.z +
                Math.sin(time * 0.3 + index) * 0.5;
            } else {
              // Connector nodes: more dynamic movement creating organic mesh flow
              node.rotation.x += 0.005;
              node.rotation.y += 0.003;

              // Drift movement with boundaries
              node.position.add(node.userData.velocity);

              // Boundary bouncing
              if (Math.abs(node.position.x) > 20) {
                node.userData.velocity.x *= -0.8;
                node.position.x = Math.sign(node.position.x) * 20;
              }
              if (Math.abs(node.position.y) > 15) {
                node.userData.velocity.y *= -0.8;
                node.position.y = Math.sign(node.position.y) * 15;
              }
              if (Math.abs(node.position.z) > 20) {
                node.userData.velocity.z *= -0.8;
                node.position.z = Math.sign(node.position.z) * 20;
              }

              // Add slight random movement to keep it organic
              const randomForce = 0.0002;
              node.userData.velocity.add(
                new THREE.Vector3(
                  (Math.random() - 0.5) * randomForce,
                  (Math.random() - 0.5) * randomForce,
                  (Math.random() - 0.5) * randomForce
                )
              );

              // Apply gentle friction
              node.userData.velocity.multiplyScalar(0.995);

              // Pulsing opacity for connector nodes
              const pulse =
                Math.sin(time * 2 + node.userData.floatOffset) * 0.2 + 0.6;
              node.material.opacity = pulse * 0.4;
            }
          });

          // Update mesh connections to follow nodes
          if (activeSystem.updateConnections) {
            activeSystem.updateConnections();
          }

          // Animate camera orbit
          const cameraTime = Date.now() * 0.0002;
          camera.position.x = Math.sin(cameraTime) * 28;
          camera.position.z = Math.cos(cameraTime) * 28;
          camera.position.y = 8 + Math.sin(cameraTime * 0.7) * 4;
          camera.lookAt(0, 0, 0);
        }

        // Code particles animation
        if (currentDemo === 'code' && activeSystem.particles) {
          activeSystem.particles.forEach((particle) => {
            // Mouse attraction
            const mousePos = new THREE.Vector3(mouse.x * 25, mouse.y * 15, 0);

            const distance = particle.position.distanceTo(mousePos);
            if (distance < 10) {
              const direction = mousePos
                .clone()
                .sub(particle.position)
                .normalize();
              particle.userData.velocity.add(direction.multiplyScalar(0.001));
            }

            // Update position
            particle.position.add(particle.userData.velocity);

            // Boundary check
            ['x', 'y', 'z'].forEach((axis) => {
              if (Math.abs(particle.position[axis]) > 25) {
                particle.userData.velocity[axis] *= -1;
              }
            });

            // Rotation
            particle.rotation.x += 0.01;
            particle.rotation.y += 0.01;

            // Always face camera
            particle.lookAt(camera.position);
          });
        }

        // Geometric shapes animation
        if (currentDemo === 'geometric' && activeSystem.shapes) {
          activeSystem.shapes.forEach((shape) => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;

            // Float up and down
            const time = Date.now() * 0.001;
            shape.position.y += Math.sin(time + shape.position.x * 0.1) * 0.02;
          });

          // Rotate camera around
          const time = Date.now() * 0.0003;
          camera.position.x = Math.sin(time) * 35;
          camera.position.z = Math.cos(time) * 35;
          camera.lookAt(0, 0, 0);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [currentDemo]);

  return (
    <div className="relative w-full h-screen bg-[#0a0a0b] overflow-hidden cursor-none">
      {/* Three.js mount point */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Title */}
        <div className="absolute top-8 left-8 z-10">
          <h1 className="text-6xl font-black text-white mb-4">
            <span
              className="bg-gradient-to-r from-white to-[#00ff88] bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              THREE.JS PARTICLES
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-mono">
            {currentDemo === 'network' &&
              'Interactive skill network • Hover nodes to explore'}
            {currentDemo === 'code' &&
              'Code symbols in 3D space • Mouse attracts particles'}
            {currentDemo === 'geometric' &&
              'Floating geometric primitives • Smooth camera movement'}
          </p>
        </div>

        {/* Controls */}
        <div className="absolute top-8 right-8 z-10 space-y-4">
          <button
            onClick={() => setCurrentDemo('network')}
            className={`block px-4 py-2 font-mono text-sm border transition-all pointer-events-auto ${
              currentDemo === 'network'
                ? 'border-[#00ff88] text-[#00ff88] bg-[#00ff88]/10'
                : 'border-gray-600 text-gray-400 hover:border-[#00ff88] hover:text-[#00ff88]'
            }`}
          >
            Network Mesh
          </button>
          <button
            onClick={() => setCurrentDemo('code')}
            className={`block px-4 py-2 font-mono text-sm border transition-all pointer-events-auto ${
              currentDemo === 'code'
                ? 'border-[#00ff88] text-[#00ff88] bg-[#00ff88]/10'
                : 'border-gray-600 text-gray-400 hover:border-[#00ff88] hover:text-[#00ff88]'
            }`}
          >
            Code Particles
          </button>
          <button
            onClick={() => setCurrentDemo('geometric')}
            className={`block px-4 py-2 font-mono text-sm border transition-all pointer-events-auto ${
              currentDemo === 'geometric'
                ? 'border-[#00ff88] text-[#00ff88] bg-[#00ff88]/10'
                : 'border-gray-600 text-gray-400 hover:border-[#00ff88] hover:text-[#00ff88]'
            }`}
          >
            Geometric Shapes
          </button>
        </div>

        {/* Hover info */}
        {isHovering && currentDemo === 'network' && (
          <div className="absolute bottom-8 left-8 bg-black/80 border border-[#00ff88] p-4 rounded">
            <p className="text-[#00ff88] font-mono">Skill node selected</p>
            <p className="text-gray-400 text-sm">Click to learn more</p>
          </div>
        )}

        {/* Performance indicator */}
        <div className="absolute bottom-8 right-8 bg-black/80 border border-gray-600 p-3 rounded font-mono text-sm">
          <div className="text-[#00ff88]">WebGL Renderer</div>
          <div className="text-gray-400">60 FPS • GPU Accelerated</div>
        </div>
      </div>

      {/* Custom cursor */}
      <div
        className="fixed top-0 left-0 w-4 h-4 bg-[#00ff88] rounded-full pointer-events-none z-50 mix-blend-mode-difference transform -translate-x-2 -translate-y-2"
        style={{
          left: 'var(--mouse-x, 0)',
          top: 'var(--mouse-y, 0)'
        }}
      />
    </div>
  );
};

export default ThreeJSParticleSystems;
