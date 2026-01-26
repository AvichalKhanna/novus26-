import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function Arena({ scene, camera }) {
  const animationIdRef = useRef(null);
  const stagesRef = useRef([]);
  const robotsRef = useRef([]);
  const spaceshipsRef = useRef([]);
  const planetsRef = useRef([]);

  useEffect(() => {
    if (!scene || !camera) return;

    console.log("Arena loading...");

    const fbxLoader = new FBXLoader();

    // ===== MOON SURFACE =====
    const moonGeometry = new THREE.SphereGeometry(500, 64, 64);
    const moonMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      roughness: 0.9,
      metalness: 0.1,
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.y = -500;
    moon.receiveShadow = true;
    scene.add(moon);

    // ===== STARFIELD =====
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // ===== SUN =====
    const sunGeometry = new THREE.SphereGeometry(50, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      emissive: 0xffd700,
      emissiveIntensity: 1,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(500, 300, -800);
    scene.add(sun);

    const sunLight = new THREE.PointLight(0xffd700, 2, 1500);
    sunLight.position.copy(sun.position);
    scene.add(sunLight);

    // ===== PLANETS =====
    const createPlanet = (radius, color, x, y, z) => {
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.3,
        roughness: 0.7,
      });
      const planet = new THREE.Mesh(geometry, material);
      planet.position.set(x, y, z);
      scene.add(planet);
      return planet;
    };

    planetsRef.current = [
      createPlanet(30, 0xff6347, -600, 200, -700),
      createPlanet(40, 0x4169e1, 700, 150, -600),
      createPlanet(25, 0x9370db, -500, -100, -900),
      createPlanet(35, 0x32cd32, 800, 250, -500),
    ];

    // ===== EVENT STAGES =====
    const stagePositions = [
      { x: 20, z: 30, color: 0xff0000, name: "CTF" },
      { x: -30, z: 40, color: 0x00ff00, name: "BUILD" },
      { x: 40, z: -20, color: 0x0000ff, name: "UI/UX" },
      { x: -40, z: -30, color: 0xffff00, name: "PROMPT" },
      { x: 0, z: 50, color: 0xff00ff, name: "SENTINEL" },
      { x: 50, z: 0, color: 0x00ffff, name: "ALICE" },
      { x: -50, z: 0, color: 0xff6600, name: "MYSTERY" },
      { x: 0, z: -50, color: 0x6600ff, name: "ESCAPE" },
    ];

    const createFallbackStage = (stageData) => {
      const stageGroup = new THREE.Group();

      const baseGeometry = new THREE.CylinderGeometry(8, 10, 1, 6);
      const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.8,
        roughness: 0.2,
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.castShadow = true;
      stageGroup.add(base);

      const pillarGeometry = new THREE.BoxGeometry(0.5, 8, 0.5);
      const pillarMaterial = new THREE.MeshStandardMaterial({
        color: stageData.color,
        metalness: 0.9,
        roughness: 0.1,
        emissive: stageData.color,
        emissiveIntensity: 0.5,
      });

      const positions = [
        { x: -6, z: -6 },
        { x: 6, z: -6 },
        { x: -6, z: 6 },
        { x: 6, z: 6 },
      ];

      positions.forEach((pos) => {
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
        pillar.position.set(pos.x, 4.5, pos.z);
        pillar.castShadow = true;
        stageGroup.add(pillar);
      });

      const topGeometry = new THREE.BoxGeometry(14, 0.5, 14);
      const topMaterial = new THREE.MeshStandardMaterial({
        color: stageData.color,
        metalness: 0.7,
        roughness: 0.3,
        emissive: stageData.color,
        emissiveIntensity: 0.3,
      });
      const top = new THREE.Mesh(topGeometry, topMaterial);
      top.position.y = 9;
      top.castShadow = true;
      stageGroup.add(top);

      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = `#${stageData.color.toString(16).padStart(6, "0")}`;
      ctx.font = "bold 60px Arial";
      ctx.textAlign = "center";
      ctx.fillText(stageData.name, 256, 80);

      const texture = new THREE.CanvasTexture(canvas);
      const textMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });
      const textGeometry = new THREE.PlaneGeometry(12, 3);
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.y = 12;
      stageGroup.add(textMesh);

      const stageLight = new THREE.PointLight(stageData.color, 3, 30);
      stageLight.position.y = 10;
      stageGroup.add(stageLight);

      stageGroup.position.set(stageData.x, 0, stageData.z);
      stageGroup.userData.stageName = stageData.name;
      return stageGroup;
    };

    stagePositions.forEach((stageData) => {
      fbxLoader.load(
        "/low-poly-sci-fi-fighting-stage/source/010_Stage.fbx",
        (fbx) => {
          fbx.scale.set(0.05, 0.05, 0.05);
          fbx.position.set(stageData.x, 0, stageData.z);

          fbx.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              child.material.color.setHex(stageData.color);
              child.material.emissive.setHex(stageData.color);
              child.material.emissiveIntensity = 0.3;
            }
          });

          const canvas = document.createElement("canvas");
          canvas.width = 512;
          canvas.height = 128;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = `#${stageData.color.toString(16).padStart(6, "0")}`;
          ctx.font = "bold 60px Arial";
          ctx.textAlign = "center";
          ctx.fillText(stageData.name, 256, 80);

          const texture = new THREE.CanvasTexture(canvas);
          const textMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide,
          });
          const textGeometry = new THREE.PlaneGeometry(12, 3);
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.y = 15;
          fbx.add(textMesh);

          const stageLight = new THREE.PointLight(stageData.color, 3, 30);
          stageLight.position.y = 15;
          fbx.add(stageLight);

          fbx.userData.stageName = stageData.name;
          scene.add(fbx);
          stagesRef.current.push(fbx);
        },
        undefined,
        () => {
          const fallbackStage = createFallbackStage(stageData);
          scene.add(fallbackStage);
          stagesRef.current.push(fallbackStage);
        }
      );
    });

    // ===== AI EXPLORERS =====
    const createRobot = (x, z, name) => {
      const robotGroup = new THREE.Group();

      const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 0.8);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        metalness: 0.8,
        roughness: 0.2,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 1.5;
      body.castShadow = true;
      robotGroup.add(body);

      const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const headMaterial = new THREE.MeshStandardMaterial({
        color: 0x0099ff,
        metalness: 0.9,
        roughness: 0.1,
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 2.6;
      head.castShadow = true;
      robotGroup.add(head);

      const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const eyeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
      });
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      leftEye.position.set(-0.2, 2.7, 0.4);
      robotGroup.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      rightEye.position.set(0.2, 2.7, 0.4);
      robotGroup.add(rightEye);

      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#00ff00";
      ctx.font = "bold 40px Arial";
      ctx.textAlign = "center";
      ctx.fillText(name, 128, 45);

      const texture = new THREE.CanvasTexture(canvas);
      const nameMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const nameGeometry = new THREE.PlaneGeometry(3, 0.8);
      const nameMesh = new THREE.Mesh(nameGeometry, nameMaterial);
      nameMesh.position.y = 3.5;
      robotGroup.add(nameMesh);

      robotGroup.position.set(x, 0, z);
      scene.add(robotGroup);
      return robotGroup;
    };

    const aiNames = [
      "NEXUS",
      "CIPHER",
      "PIXEL",
      "BYTE",
      "QUANTUM",
      "NOVA",
      "ECHO",
      "ORBIT",
    ];
    robotsRef.current = aiNames.map((name, i) => {
      const angle = (i / aiNames.length) * Math.PI * 2;
      const radius = 60;
      return createRobot(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        name
      );
    });

    // ===== SPACESHIPS =====
    const createSpaceship = (x, y, z) => {
      const shipGroup = new THREE.Group();

      const bodyGeometry = new THREE.ConeGeometry(1, 4, 4);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.9,
        roughness: 0.1,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.rotation.x = Math.PI / 2;
      body.castShadow = true;
      shipGroup.add(body);

      const wingGeometry = new THREE.BoxGeometry(4, 0.1, 1);
      const wingMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.8,
        roughness: 0.2,
      });
      const wings = new THREE.Mesh(wingGeometry, wingMaterial);
      wings.castShadow = true;
      shipGroup.add(wings);

      const engineGeometry = new THREE.SphereGeometry(0.3, 8, 8);
      const engineMaterial = new THREE.MeshBasicMaterial({
        color: 0xff4400,
        emissive: 0xff4400,
      });
      const engine = new THREE.Mesh(engineGeometry, engineMaterial);
      engine.position.z = 2;
      shipGroup.add(engine);

      shipGroup.position.set(x, y, z);
      shipGroup.rotation.y = Math.random() * Math.PI * 2;
      scene.add(shipGroup);
      return shipGroup;
    };

    spaceshipsRef.current = [
      createSpaceship(-20, 15, 60),
      createSpaceship(30, 12, -40),
      createSpaceship(-50, 18, -30),
      createSpaceship(45, 20, 20),
    ];

    // ===== ANIMATION LOOP =====
    let time = 0;
    const animate = () => {
      time += 0.01;

      planetsRef.current.forEach((planet, i) => {
        planet.rotation.y += 0.001 * (i + 1);
      });

      stagesRef.current.forEach((stage, i) => {
        if (stage) {
          stage.rotation.y += 0.003;
          stage.traverse((child) => {
            if (child.geometry && child.geometry.type === "PlaneGeometry") {
              child.rotation.y = -stage.rotation.y;
              child.position.y = 12 + Math.sin(time * 2 + i) * 0.3;
            }
          });
        }
      });

      robotsRef.current.forEach((robot, i) => {
        if (robot) {
          const angle = time * 0.1 + (i / robotsRef.current.length) * Math.PI * 2;
          const radius = 60 + Math.sin(time + i) * 10;
          robot.position.x = Math.cos(angle) * radius;
          robot.position.z = Math.sin(angle) * radius;
          robot.rotation.y = angle + Math.PI / 2;

          const nameMesh = robot.children[4];
          if (nameMesh && camera) {
            nameMesh.lookAt(camera.position);
          }
        }
      });

      spaceshipsRef.current.forEach((ship, i) => {
        if (ship) {
          ship.position.y = 15 + Math.sin(time * 2 + i) * 3;
          ship.rotation.z = Math.sin(time + i) * 0.1;
        }
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    console.log("✓ Arena loaded successfully!");

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      scene.remove(moon);
      planetsRef.current.forEach((p) => scene.remove(p));
      stagesRef.current.forEach((s) => scene.remove(s));
      robotsRef.current.forEach((r) => scene.remove(r));
      spaceshipsRef.current.forEach((s) => scene.remove(s));
      scene.remove(stars);
      scene.remove(sun);
      scene.remove(sunLight);
    };
  }, [scene, camera]);

  return null;
}
