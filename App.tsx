import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import mermaid from 'mermaid';
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ExternalLink,
  X,
  ArrowRight,
  Palette,
  Terminal,
  Cpu,
  Globe,
  ChevronDown,
  Calendar,
  BookOpen,
  Loader,
  FileText,
  GraduationCap
} from 'lucide-react';
import { getResourcePath, getPublicPath } from './utils/pathUtils';

import {
  blogData,
  type BlogPost,
} from './data/blogData';

import {
  EXPERIENCE,
  EDUCATION,
  PUBLICATIONS,
  type Experience,
  type Education,
  type Publication
} from './data/profileData';

import { updatesData, type Update } from './data/updates';

// --- Utilities ---

// --- Components ---

// 1. Neon Cursor
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailingRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const trailing = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      // Main dot follows instantly
      cursor.current.x += (mouse.current.x - cursor.current.x) * 0.9;
      cursor.current.y += (mouse.current.y - cursor.current.y) * 0.9;

      // Trailing glow follows lazily
      trailing.current.x += (mouse.current.x - trailing.current.x) * 0.15;
      trailing.current.y += (mouse.current.y - trailing.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0)`;
      }
      if (trailingRef.current) {
        trailingRef.current.style.transform = `translate3d(${trailing.current.x - 16}px, ${trailing.current.y - 16}px, 0)`;
      }
      requestAnimationFrame(animate);
    };
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] mix-blend-screen hidden md:block">
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_#F2D500]"
      />
      <div
        ref={trailingRef}
        className="absolute top-0 left-0 w-10 h-10 border border-gold/30 rounded-full bg-gold/5 blur-[2px]"
      />
    </div>
  );
};

// 2. Magnetic Button
const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = "", onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// 3. Spotlight Card (for Blog/Projects)
const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = "", onClick }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!divRef.current) return;
    const { left, top } = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - left, y: e.clientY - top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 group cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-gold/10 ${className}`}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(242, 213, 0, 0.15), transparent 40%)`,
        }}
      />
      {/* Border Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(242, 213, 0, 0.4), transparent 40%)`,
          maskImage: 'linear-gradient(black, black), content-box',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px'
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

// 4. Earth Canvas (Enhanced)
interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
}

const EarthCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const pointsRef = useRef<Point3D[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const connectionDistance = 28;
    const rotationSpeed = 0.001;

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Scroll handler
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Mouse handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left - canvas.width / 2,
        y: e.clientY - rect.top - canvas.height / 2
      };
    };
    // Global listener for better interaction
    window.addEventListener('mousemove', handleMouseMove);

    // World Map Binary Mask
    const worldMapData = [
      "00000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000",
      "00000000000000000000000000000000000000011100000011111111000000000000000000000000001111110000000000000000000000000000000000000000",
      "00000000000000000001111111111111111111000011000011110000000000000111111011111111111111111111111111111111111110000000000000000000",
      "00000000000000001100011111111111110000011100000000000000000000001100111111111111111111111111111111111111001110000000000000000000",
      "00000000000000000000000111111111111111111110000000000000000000111111111111111111111111111111111111111110000000000000000000000000",
      "00000000000000000000001111111111111111110000000000000000000011111111111111111111111111111111111111111111000000000000000000000000",
      "00000000000000000000111111111111111100000000000000000000001100000001111111110011111111111111111111111100000000000000000000000000",
      "00000000000000000000011111111111110000000000000000000000001111110000000011111111111111111111111111110000000000000000000000000000",
      "00000000000000000000001111100000000000000000000000000000111111111111111111111111111111111111111111111000000000000000000000000000",
      "00000000000000000000000011100000000000000000000000000001111111111111111110111111000001111110111111100000000000000000000000000000",
      "00000000000000000000000000000000000000000000000000000001111111111111111111011100000000111000001111000000000000000000000000000000",
      "00000000000000000000000000000000011111100000000000000000111111111111111111111100000000000000000000000000000000000000000000000000",
      "00000000000000000000000000000000011111111100000000000000000000001111111111110000000000000000000010001000000000000000000000000000",
      "00000000000000000000000000000000111111111111110000000000000000001111111111100000000000000000000010000000000001100000000000000000",
      "00000000000000000000000000000000011111111111111000000000000000000111111111000000000000000000000000000000000000000000000000000000",
      "00000000000000000000000000000000001111111111111000000000000000000111111111000000000000000000000000000000111100100000000000000000",
      "00000000000000000000000000000000000011111111110000000000000000000111111100001000000000000000000000000111111111110000000000000000",
      "00000000000000000000000000000000000011111110000000000000000000000011111000000000000000000000000000001111111111111000000000000000",
      "00000000000000000000000000000000000011111100000000000000000000000000000000000000000000000000000000000000001111100000000000000000",
      "00000000000000000000000000000000000001110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "00000000000000000000000000000000000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "00000000000000000000000000000000000000000001100000000000000111111111111111111111111111111111111111111000000000000000000000000000",
      "00000000000000000000000000001111111111111111110000000001111111111111111111111111111111111111111111000000000000000000000000000000",
      "00000000000000000000000000000111111111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000",
    ];

    const isLand = (lat: number, lon: number): boolean => {
      // Map lat (90 to -90) to row (0 to length-1)
      const normalizedLat = (90 - lat) / 180;
      const row = Math.floor(normalizedLat * (worldMapData.length - 1));

      // Map lon (-180 to 180) to col (0 to width-1)
      const normalizedLon = (lon + 180) / 360;
      const col = Math.floor(normalizedLon * (worldMapData[0].length - 1));

      if (row >= 0 && row < worldMapData.length && col >= 0 && col < worldMapData[0].length) {
        return worldMapData[row][col] === '1';
      }
      return false;
    };

    // Initialize points
    const initPoints = () => {
      const points: Point3D[] = [];
      const R = 300; // Globe radius
      const targetCount = 3500;

      let attempts = 0;
      while (points.length < targetCount && attempts < 100000) {
        attempts++;

        const u = Math.random();
        const v = Math.random();

        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);

        const lat = 90 - (phi * 180 / Math.PI);
        let lon = (theta * 180 / Math.PI) - 180;

        if (isLand(lat, lon)) {
          // Convert Spherical to Cartesian
          const px = R * Math.sin(phi) * Math.cos(theta);
          const py = -R * Math.cos(phi);
          const pz = R * Math.sin(phi) * Math.sin(theta);

          points.push({
            x: px,
            y: py,
            z: pz,
            baseX: px,
            baseY: py,
            baseZ: pz,
            radius: Math.random() < 0.2 ? 1.8 : 1.0
          });
        }
      }

      // Add faint ocean particles
      for (let i = 0; i < 50; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);

        const lat = 90 - (phi * 180 / Math.PI);
        let lon = (theta * 180 / Math.PI) - 180;

        if (!isLand(lat, lon)) {
          const px = R * Math.sin(phi) * Math.cos(theta);
          const py = -R * Math.cos(phi);
          const pz = R * Math.sin(phi) * Math.sin(theta);

          points.push({
            x: px, y: py, z: pz,
            baseX: px, baseY: py, baseZ: pz,
            radius: 0.3
          });
        }
      }

      pointsRef.current = points;
    };

    initPoints();

    // Animation Loop
    let angleX = 0;
    let angleY = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      angleX += rotationSpeed * 0.5;
      angleY += rotationSpeed;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const projectedPoints: { x: number; y: number; z: number; r: number; opacity: number }[] = [];

      pointsRef.current.forEach(point => {
        // Rotation
        let x1 = point.baseX * Math.cos(angleY) - point.baseZ * Math.sin(angleY);
        let z1 = point.baseX * Math.sin(angleY) + point.baseZ * Math.cos(angleY);
        let y1 = point.baseY;

        let y2 = y1 * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = y1 * Math.sin(angleX) + z1 * Math.cos(angleX);
        let x2 = x1;

        // Projection
        const fov = 800;
        const scale = fov / (fov + z2);

        const px = x2 * scale + centerX;
        const py = y2 * scale + centerY;

        // Interaction
        const dx = (px - centerX) - mx;
        const dy = (py - centerY) - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let finalX = px;
        let finalY = py;

        if (dist < 150) {
          const force = (150 - dist) / 150;
          finalX += dx * force * 0.5;
          finalY += dy * force * 0.5;
        }

        const alpha = Math.max(0.1, (scale - 0.5) * 1.5);
        const scrollOpacity = Math.max(0, 1 - scrollRef.current / 800);

        if (scale > 0 && scrollOpacity > 0.05) {
          projectedPoints.push({
            x: finalX,
            y: finalY,
            z: z2,
            r: point.radius * scale,
            opacity: alpha * scrollOpacity
          });
        }
      });

      ctx.lineWidth = 0.5;

      projectedPoints.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
        ctx.fill();

        // Connections
        for (let j = 1; j < 6; j++) {
          const p2 = projectedPoints[(i + j) % projectedPoints.length];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < connectionDistance * connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 215, 0, ${p.opacity * p2.opacity * 0.4})`;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  );
};

// 5. Blog Modal (Markdown Renderer)
const BlogModal: React.FC<{ post: BlogPost | null; onClose: () => void }> = ({ post, onClose }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (post) {
      setLoading(true);
      setError(false);
      fetch(post.markdownFile)
        .then(res => {
          if (!res.ok) throw new Error("Failed to load post");
          return res.text();
        })
        .then(text => {
          // Replace {{PUBLIC_URL}} placeholder with actual path
          const publicPath = getPublicPath();
          const processedContent = text.replace(/{{PUBLIC_URL}}/g, publicPath);
          setContent(processedContent);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(true);
          setLoading(false);
        });
    }
  }, [post]);

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-full overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col">
        <button
          onClick={onClose}
          className="fixed md:absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-black/50 rounded-full backdrop-blur-sm z-50 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="relative h-64 md:h-80 w-full shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-gold font-mono text-xs tracking-wider uppercase border border-gold/30 px-2 py-1 rounded bg-black/50 backdrop-blur-sm">
                {post.category}
              </span>
              <span className="text-neutral-400 font-mono text-xs flex items-center gap-1">
                <Calendar size={12} /> {post.date}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">{post.title}</h2>
          </div>
        </div>

        <div className="p-8 md:p-12 overflow-y-auto min-h-[300px]">
          {loading ? (
            <div className="flex justify-center items-center h-full py-20">
              <Loader className="animate-spin text-gold" size={48} />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-20">
              Failed to load content. Please try again later.
            </div>
          ) : (
            <article className="markdown-content max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    if (!inline && match && match[1] === 'mermaid') {
                      return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                    }
                    return !inline && match ? (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </article>
          )}

          <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
            <p className="text-neutral-600 text-sm font-mono">Article ID: {post.id}</p>
            <div className="flex gap-4">
              <button className="text-neutral-400 hover:text-white transition-colors"><Twitter size={20} /></button>
              <button className="text-neutral-400 hover:text-white transition-colors"><Linkedin size={20} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Expandable Experience Item
const ExperienceItem: React.FC<{ experience: Experience }> = ({ experience }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`group relative pl-8 border-l transition-all duration-300 cursor-pointer ${isOpen ? 'border-gold bg-white/5 rounded-r-xl' : 'border-white/10 hover:border-gold/50'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full transition-colors duration-300 ${isOpen ? 'bg-gold' : 'bg-neutral-800 group-hover:bg-gold/50'}`} />

      <div className="py-4 pr-4">
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-start">
            <img
              src={experience.logo}
              alt={experience.company}
              className="w-12 h-12 rounded-lg object-cover bg-white/5 border border-white/10"
            />
            <div>
              <h3 className={`text-2xl font-bold transition-colors ${isOpen ? 'text-white' : 'text-neutral-200'}`}>
                {experience.role}
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-sm font-mono text-gold mt-1 mb-2">
                <span>{experience.company}</span>
                <span className="text-neutral-600">|</span>
                <span>{experience.period}</span>
              </div>
            </div>
          </div>
          <ChevronDown className={`text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold' : ''}`} />
        </div>

        <p className="text-neutral-400 mb-2 text-sm md:text-base mt-2">{experience.description}</p>

        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2 mb-2">
              {experience.achievements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                  <span className="text-gold mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-gold/50" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. Update Item Component
const UpdateItem: React.FC<{ update: Update }> = ({ update }) => {
  return (
    <div className="relative group">
      <div className="absolute -left-[41px] md:-left-[73px] top-0 w-3 h-3 bg-neutral-800 rounded-full border border-white/20 group-hover:bg-gold group-hover:shadow-[0_0_10px_#F2D500] transition-all" />
      <div className="glass p-6 rounded-xl transform transition-all duration-300 group-hover:translate-x-2">
        <span className="text-xs text-neutral-500 font-mono">{update.date}</span>
        <h4 className="text-xl font-bold mt-2">{update.title}</h4>
        {update.image && (
          <div className="mt-4 mb-2 overflow-hidden rounded-lg">
            <img src={update.image} alt={update.title} className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        <p
          className="text-neutral-400 mt-2 text-sm"
          dangerouslySetInnerHTML={{ __html: update.description }}
        />
      </div>
    </div>
  );
};

// 8. Mermaid Component
const Mermaid: React.FC<{ chart: string }> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'dark',
        securityLevel: 'loose',
        fontFamily: 'JetBrains Mono'
      });

      const id = `mermaid-${Date.now()}`;
      mermaid.render(id, chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      });
    }
  }, [chart]);

  return <div ref={ref} className="mermaid flex justify-center my-8" />;
};

// --- Main App Component ---

const App: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [showAllPublications, setShowAllPublications] = useState(false);

  // Typewriter Effect State
  const [text, setText] = useState('');
  const fullText = "Engineering intelligence, from atoms to planets.";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Typewriter
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-dark text-white selection:bg-gold/30 font-sans">
      <CustomCursor />
      <EarthCanvas />

      {/* Top Gradient/Glow */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-gold/5 to-transparent blur-3xl pointer-events-none z-10" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference bg-gradient-to-b from-black/50 to-transparent">
        <div className="text-2xl font-bold tracking-tighter font-mono cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          AP<span className="text-gold">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-mono tracking-wide text-neutral-400">
          {['About', 'Experience', 'Blog', 'Publications'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-gold transition-colors focus:outline-none uppercase text-xs tracking-widest"
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center z-10 px-4">
        <div
          className="text-center space-y-6"
          style={{ opacity: Math.max(0, 1 - scrollY / 500), transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 text-glow select-none">
            ANYANG PENG
          </h1>
          <p className="font-mono text-gold text-sm md:text-lg h-6">
            {text}<span className="animate-pulse">_</span>
          </p>
        </div>

        <div
          className="absolute bottom-10 animate-bounce cursor-pointer p-4 hover:text-gold transition-colors"
          onClick={() => scrollToSection('about')}
        >
          <ArrowRight className="rotate-90 text-neutral-500" />
        </div>
      </section>

      <main className="relative z-20 bg-dark/80 backdrop-blur-sm border-t border-white/10">

        {/* About Section */}
        <section id="about" className="container mx-auto px-4 py-32 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sticky Sidebar */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32 space-y-8">
                <div className="group relative w-48 h-48 mx-auto lg:mx-0 overflow-hidden rounded-full border-2 border-white/10">
                  <img
                    src={getResourcePath('/static/images/about.png')}
                    alt="Anyang Peng"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">Anyang Peng</h2>
                  <p className="text-gold font-mono text-sm mb-6">ML Research Scientist @ AISI</p>
                  <p className="text-neutral-400 leading-relaxed font-mono text-sm">
                    Trained as a chemical engineer with a strong background in both experimental and computational chemistry. Brings over six years of experience in machine learning and data science across both academic and industry settings. Skilled across the full ML stack—from data pipeline development to model deployment. Currently focused on developing large-scale foundation models to accelerate scientific discovery in physics, chemistry, and materials science.
                  </p>
                </div>
                <div className="flex gap-4">
                  <a href="https://scholar.google.com/citations?user=pDRtjREAAAAJ&hl=en&oi=ao" target="_blank" rel="noopener noreferrer">
                    <MagneticButton className="p-3 glass rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all">
                      <GraduationCap size={18} />
                    </MagneticButton>
                  </a>
                  <a href="https://github.com/anyangml" target="_blank" rel="noopener noreferrer">
                    <MagneticButton className="p-3 glass rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all">
                      <Github size={18} />
                    </MagneticButton>
                  </a>
                  <a href="https://www.linkedin.com/in/anyangpeng/" target="_blank" rel="noopener noreferrer">
                    <MagneticButton className="p-3 glass rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all">
                      <Linkedin size={18} />
                    </MagneticButton>
                  </a>
                  <a href="mailto:anyangpeng.nu@gmail.com">
                    <MagneticButton className="p-3 glass rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all">
                      <Mail size={18} />
                    </MagneticButton>
                  </a>
                </div>
              </div>
            </div>

            {/* Timeline Right */}
            <div className="lg:col-span-8 space-y-12 border-l border-white/10 pl-8 md:pl-16">
              <h3 className="text-gold font-mono uppercase tracking-widest text-sm mb-8 flex items-center gap-2">
                <Globe size={16} /> Latest Updates
              </h3>
              {updatesData.map((item) => (
                <UpdateItem key={item.id} update={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section id="experience" className="bg-neutral-900/20 py-32 scroll-mt-28">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Experience Column */}
              <div>
                <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
                  <span className="text-gold">01.</span> Experience
                </h2>
                <div className="space-y-6">
                  {EXPERIENCE.map(exp => (
                    <ExperienceItem key={exp.id} experience={exp} />
                  ))}
                </div>
              </div>

              {/* Education Column (Sticky-ish feel) */}
              <div>
                <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
                  <span className="text-gold">02.</span> Education
                </h2>
                <div className="space-y-8">
                  {EDUCATION.map((edu, i) => (
                    <div key={i} className="glass p-8 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={edu.logo}
                          alt={edu.school}
                          className="w-12 h-12 rounded-lg object-cover bg-white/5 border border-white/10"
                        />
                        <div>
                          <h3 className="text-xl font-bold">{edu.degree}</h3>
                          <p className="text-gold font-mono text-sm">{edu.school}</p>
                        </div>
                      </div>
                      <p className="text-neutral-500 text-xs mt-1 mb-4">{edu.year}</p>
                      <p className="text-neutral-300 text-sm">{edu.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="container mx-auto px-4 py-32 scroll-mt-28">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Blog & Insights</h2>
              <p className="text-neutral-400 max-w-md">
                Deep dives into technical challenges, architecture decisions, and the future of digital intelligence.
              </p>
            </div>
            <MagneticButton className="hidden md:flex items-center gap-2 px-6 py-3 border border-gold text-gold rounded-full hover:bg-gold hover:text-black transition-colors mt-8 md:mt-0">
              <BookOpen size={18} /> Read All Articles
            </MagneticButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogData.map((post) => (
              <SpotlightCard
                key={post.id}
                className="h-[400px] md:h-[500px]"
                onClick={() => setSelectedPost(post)}
              >
                <div className="h-full flex flex-col justify-between p-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-gold border border-gold/30 px-2 py-1 rounded">
                        {post.category}
                      </span>
                    </div>
                    <ArrowRight className="text-white/30 group-hover:text-gold group-hover:-rotate-45 transition-all duration-300" />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                      {post.title}
                    </h3>
                    <p className="text-neutral-400 line-clamp-3 text-sm leading-relaxed">
                      {post.summary}
                    </p>
                    <div className="mt-4 text-xs font-mono text-neutral-500">
                      {post.date}
                    </div>
                  </div>

                  {/* Background Image with Parallax-ish feel via CSS opacity */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="container mx-auto px-4 pb-32 pt-32 scroll-mt-28">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
            <FileText className="text-gold" /> Publications
          </h2>
          <div className="space-y-6">
            {(showAllPublications ? PUBLICATIONS : PUBLICATIONS.slice(0, 3)).map((pub, idx) => (
              <a
                key={idx}
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block glass p-8 rounded-xl relative overflow-hidden transition-all duration-300 hover:border-gold/30 hover:bg-white/5"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="text-gold" size={20} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                  {pub.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-400 leading-relaxed mb-4">
                  {pub.authors.map((author, i) => (
                    <span key={i}>
                      {author === "Anyang Peng" ? (
                        <span className="text-white font-semibold underline decoration-gold/50">{author}</span>
                      ) : (
                        author
                      )}
                      {i < pub.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <div className="flex items-center gap-4 text-xs md:text-sm font-mono text-gold/80">
                  <span className="bg-gold/10 px-2 py-1 rounded border border-gold/20">{pub.journal}</span>
                  <span className="text-neutral-500">{pub.date}</span>
                </div>
              </a>
            ))}
          </div>

          {PUBLICATIONS.length > 3 && (
            <div className="flex justify-center mt-12">
              <MagneticButton
                onClick={() => setShowAllPublications(!showAllPublications)}
                className="flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all duration-300 group"
              >
                {showAllPublications ? (
                  <>Show Less <ChevronDown className="rotate-180 transition-transform duration-300" size={16} /></>
                ) : (
                  <>Show More <ChevronDown className="transition-transform duration-300 group-hover:translate-y-1" size={16} /></>
                )}
              </MagneticButton>
            </div>
          )}
        </section>

        {/* Contact / Footer */}
        <section id="contact" className="relative py-24 border-t border-white/10 overflow-hidden scroll-mt-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent opacity-50 pointer-events-none" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-5xl md:text-8xl font-black text-white/5 tracking-tighter mb-8 select-none">
              ANYANG PENG
            </h2>
            <p className="text-neutral-600 font-mono text-xs">
              © 2024 Anyang Peng. Engineered with React & Tailwind.
            </p>
          </div>
        </section>

      </main>

      {/* Fullscreen Blog Modal */}
      {selectedPost && (
        <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default App;