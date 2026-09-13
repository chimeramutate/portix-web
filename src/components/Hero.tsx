import { Button, Typography, Tag, Space } from 'antd';
import {
  ArrowRightOutlined,
  DownloadOutlined,
  CodeOutlined,
  BranchesOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import LaptopScene from '@/components/LaptopScene';

const { Title, Paragraph } = Typography;

export default function Hero() {
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
              Native Rust · Flutter Desktop
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
              Portix — the native SSH client
              <br />
              <span className="text-gradient">built with Rust, powered by Flutter.</span>
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

<<<<<<< HEAD
          {/* Right: interactive laptop */}
          <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <LaptopScene className="hero-laptop" />
=======
          {/* Right: terminal image */}
          <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div style={{ position: 'relative', maxWidth: 448, margin: '0 auto' }}>
              <img
                src="/ssh/ssh.png"
                alt="Terminal"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                }}
              />
            </div>
>>>>>>> 454f219 (Add images for SFTP and SSH components; update GettingStarted and Hero components for improved workflow presentation)
          </div>
        </div>
      </div>
    </section>
  );
}
