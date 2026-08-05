import { useEffect, useState } from 'react';
import { Button, Typography, Tag, Space } from 'antd';
import {
  ArrowRightOutlined,
  DownloadOutlined,
  CodeOutlined,
  BranchesOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const bootLines = [
  { text: '$ portix connect user@prod-server', color: '#34d399' },
  { text: '→ establishing ssh connection...', color: '#64748b' },
  { text: '✓ authenticated (ed25519)', color: '#34d399' },
  { text: '✓ pty allocated — xterm-256color', color: '#34d399' },
  { text: '✓ shell session active', color: '#34d399' },
  { text: 'user@prod:~$ ', color: '#cbd5e1', cursor: true },
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= bootLines.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), visibleLines === 0 ? 500 : 380);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <section
      id="top"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 128,
        paddingBottom: 80,
      }}
    >
      {/* Background */}
      <div className="grid-bg radial-fade" style={{ position: 'absolute', inset: 0 }} aria-hidden />
      <div
        style={{
          position: 'absolute',
          top: -96,
          left: '25%',
          width: 288,
          height: 288,
          borderRadius: '50%',
          background: 'rgba(16,185,129,0.18)',
          filter: 'blur(120px)',
        }}
        aria-hidden
      />
      <div
        style={{
          position: 'absolute',
          top: 80,
          right: '25%',
          width: 288,
          height: 288,
          borderRadius: '50%',
          background: 'rgba(6,182,212,0.12)',
          filter: 'blur(120px)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <div className="animate-fade-up">
            <Tag
              style={{
                marginBottom: 20,
                padding: '4px 14px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: '#cbd5e1',
                fontSize: 12,
              }}
            >
              v2.0 · Rust + Flutter
            </Tag>

            <Title
              level={1}
              style={{
                color: '#fff',
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: 0,
                fontWeight: 700,
              }}
            >
              The SSH client
              <br />
              <span className="text-gradient">built for speed.</span>
            </Title>

            <Paragraph
              style={{
                marginTop: 24,
                maxWidth: 460,
                fontSize: 18,
                lineHeight: 1.7,
                color: '#94a3b8',
              }}
            >
              Portix is a modern, cross-platform SSH client with a native Rust engine,
              multi-tab terminals, split workspaces, and a built-in SFTP file manager.
            </Paragraph>

            <Space size="middle" wrap style={{ marginTop: 32 }}>
              <Button
                type="primary"
                size="large"
                href="#download"
                icon={<DownloadOutlined />}
                style={{ fontWeight: 600, height: 48, paddingInline: 24, boxShadow: '0 0 40px -8px rgba(16,185,129,0.4)' }}
              >
                Download
              </Button>
              <Button
                size="large"
                href="#getting-started"
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                style={{
                  height: 48,
                  paddingInline: 24,
                  borderColor: 'rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontWeight: 600,
                }}
              >
                Get Started
              </Button>
            </Space>

            <Space size="large" style={{ marginTop: 40 }} split={<span style={{ color: '#475569' }}>·</span>}>
              <span style={{ color: '#64748b', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CodeOutlined /> Multi-tab
              </span>
              <span style={{ color: '#64748b', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <BranchesOutlined /> Split view
              </span>
              <span style={{ color: '#64748b', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <DatabaseOutlined /> Rust engine
              </span>
            </Space>
          </div>

          {/* Right: terminal mockup */}
          <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div style={{ position: 'relative', maxWidth: 448, margin: '0 auto' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(6,182,212,0.15))',
                  opacity: 0.6,
                  filter: 'blur(16px)',
                }}
                aria-hidden
              />
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: '#0b1018',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                }}
              >
                {/* Title bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    background: '#0f1620',
                    padding: '12px 16px',
                  }}
                >
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(248,113,113,0.8)' }} />
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(250,204,21,0.8)' }} />
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(74,222,128,0.8)' }} />
                  <span style={{ marginLeft: 8, fontSize: 12, color: '#64748b' }}>portix — bash</span>
                </div>
                {/* Tabs */}
                <div
                  style={{
                    display: 'flex',
                    gap: 4,
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    background: '#0b1018',
                    padding: '8px 12px',
                  }}
                >
                  <span style={{ borderRadius: 6, background: 'rgba(255,255,255,0.05)', padding: '4px 12px', fontSize: 12, color: '#fff' }}>prod-server</span>
                  <span style={{ borderRadius: 6, padding: '4px 12px', fontSize: 12, color: '#64748b' }}>staging</span>
                  <span style={{ borderRadius: 6, padding: '4px 12px', fontSize: 12, color: '#64748b' }}>db-1</span>
                  <span style={{ marginLeft: 4, color: '#475569' }}>+</span>
                </div>
                {/* Body */}
                <div
                  className="font-mono"
                  style={{
                    padding: 16,
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 12,
                    lineHeight: 1.6,
                    minHeight: 220,
                  }}
                >
                  {bootLines.slice(0, visibleLines).map((line, i) => (
                    <div key={i} style={{ color: line.color }}>
                      {line.text}
                      {line.cursor && (
                        <span
                          style={{
                            display: 'inline-block',
                            marginLeft: 2,
                            width: 8,
                            height: 14,
                            background: '#34d399',
                            verticalAlign: 'middle',
                            animation: 'blink 1.1s step-end infinite',
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
