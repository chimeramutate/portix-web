import { Typography, Row, Col, Card, Button, Dropdown, Tag, message } from 'antd';
import {
  AppleOutlined,
  DesktopOutlined,
  CodeOutlined,
  DownloadOutlined,
  FileZipOutlined,
  CheckCircleOutlined,
  AppstoreOutlined,
  KeyOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useInView } from '@/hooks/useScroll';
import type { ReactNode } from 'react';

const { Title, Paragraph, Text } = Typography;

type Platform = {
  icon: ReactNode;
  name: string;
  desc: string;
  primary: { label: string; href: string };
  options: { label: string; href: string }[];
};

const PORTIX_VERSION = 'v1.0.0';
const KEEWEB_VERSION = 'v1.18.7';

const PORTIX_SHA256 = {
  macos: '6e9c819384d6dc4907bebaf4cf3b6cd04d9015f80c95a70616d6228b02f79220',
  linux: '9ee18b56efd0522ecfea2f2ef0eadaef9970a92ade558c2dfed56ec2f0b02f24',
  windows: 'b6a21bf99aa69359f0697f9a2aa0e269f5daf2d8af6cadd3ee7ca52a6693e167',
};

const platforms: Platform[] = [
  {
    icon: <AppleOutlined />,
    name: 'macOS',
    desc: 'Universal binary for Apple Silicon & Intel',
    primary: { label: `Download ${PORTIX_VERSION} (.zip)`, href: `https://github.com/chimeramutate/portix/releases/download/${PORTIX_VERSION}/portix-macos-${PORTIX_VERSION}.zip` },
    options: [
      { label: `.zip (${PORTIX_VERSION})`, href: `https://github.com/chimeramutate/portix/releases/download/${PORTIX_VERSION}/portix-macos-${PORTIX_VERSION}.zip` },
      { label: 'View release notes', href: `https://github.com/chimeramutate/portix/releases/tag/${PORTIX_VERSION}` },
    ],
  },
  {
    icon: <CodeOutlined />,
    name: 'Linux',
    desc: 'Flatpak and Snap packages available',
    primary: { label: `Download ${PORTIX_VERSION} (.tar.gz)`, href: `https://github.com/chimeramutate/portix/releases/download/${PORTIX_VERSION}/portix-linux-${PORTIX_VERSION}.tar.gz` },
    options: [
      { label: `.tar.gz (${PORTIX_VERSION})`, href: `https://github.com/chimeramutate/portix/releases/download/${PORTIX_VERSION}/portix-linux-${PORTIX_VERSION}.tar.gz` },
      { label: 'Snap package', href: 'https://snapcraft.io/portix' },
      { label: 'View release notes', href: `https://github.com/chimeramutate/portix/releases/tag/${PORTIX_VERSION}` },
    ],
  },
  {
    icon: <DesktopOutlined />,
    name: 'Windows',
    desc: 'Native build with full feature parity',
    primary: { label: `Download ${PORTIX_VERSION} (.zip)`, href: `https://github.com/chimeramutate/portix/releases/download/${PORTIX_VERSION}/portix-windows-${PORTIX_VERSION}.zip` },
    options: [
      { label: `.zip (${PORTIX_VERSION})`, href: `https://github.com/chimeramutate/portix/releases/download/${PORTIX_VERSION}/portix-windows-${PORTIX_VERSION}.zip` },
      { label: 'View release notes', href: `https://github.com/chimeramutate/portix/releases/tag/${PORTIX_VERSION}` },
    ],
  },
];

function DownloadCard({ platform, index }: { platform: Platform; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const menuItems = platform.options.map((opt) => ({
    key: opt.label,
    label: (
      <a
        href={opt.href}
        style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}
      >
        <FileZipOutlined style={{ color: '#34d399' }} />
        {opt.label}
      </a>
    ),
  }));

  return (
    <Col xs={24} sm={8} key={platform.name}>
      <div ref={ref}>
        <Card
          className={inView ? 'animate-fade-up' : 'opacity-0'}
          style={{
            height: '100%',
            background: '#0b1018',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 12,
            transition: 'all 0.5s ease',
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'forwards',
          }}
          styles={{ body: { padding: 24 } }}
          hoverable
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.1))',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: 24,
                color: '#e2e8f0',
              }}
            >
              {platform.icon}
            </div>
            <Tag
              icon={<CheckCircleOutlined />}
              color="success"
              style={{ borderRadius: 999, padding: '2px 10px', fontSize: 12 }}
            >
              Stable
            </Tag>
          </div>

          <Title level={4} style={{ color: '#fff', marginTop: 16, marginBottom: 6, fontSize: 18, fontWeight: 600 }}>
            {platform.name}
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            {platform.desc}
          </Paragraph>

          <Button
            type="primary"
            block
            size="large"
            href={platform.primary.href}
            icon={<DownloadOutlined />}
            style={{ marginTop: 20, height: 44, fontWeight: 600 }}
          >
            {platform.primary.label}
          </Button>

          <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
            placement="bottomCenter"
          >
            <Button
              block
              size="large"
              style={{
                marginTop: 8,
                height: 44,
                borderColor: 'rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: '#cbd5e1',
                fontWeight: 500,
              }}
              icon={<AppstoreOutlined />}
            >
              All downloads
            </Button>
          </Dropdown>
        </Card>
      </div>
    </Col>
  );
}

export default function Download() {
  return (
    <section id="download" style={{ position: 'relative', paddingTop: 96, paddingBottom: 96 }}>
      <div className="grid-bg radial-fade" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <Text style={{ color: '#34d399', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Download
          </Text>
          <Title level={2} style={{ color: '#fff', marginTop: 12, fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Get Portix for your platform
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: 16, marginTop: 16 }}>
            Free and open-source. Choose your operating system and start managing servers in seconds.
          </Paragraph>
          <div style={{ marginTop: 20, display: 'inline-flex', gap: 12, flexWrap: 'wrap' }}>
            <Tag
              icon={<span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#10b981', marginRight: 6 }} />}
              style={{ borderRadius: 999, padding: '4px 16px', fontSize: 14, color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
            >
              Portix {PORTIX_VERSION}
            </Tag>
            <Tag
              icon={<span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', marginRight: 6 }} />}
              style={{ borderRadius: 999, padding: '4px 16px', fontSize: 14, color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
            >
              KeWeb {KEEWEB_VERSION}
            </Tag>
          </div>
        </div>

        <Row gutter={[20, 20]} style={{ marginTop: 56 }}>
          {platforms.map((p, i) => (
            <DownloadCard key={p.name} platform={p} index={i} />
          ))}
        </Row>

        <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <Button
            type="link"
            icon={<KeyOutlined />}
            style={{ color: '#64748b', fontSize: 14 }}
            onClick={() => {
              const checksums = `SHA256 Checksums for Portix ${PORTIX_VERSION}

macOS (portix-macos-${PORTIX_VERSION}.zip):
${PORTIX_SHA256.macos}

Linux (portix-linux-${PORTIX_VERSION}.tar.gz):
${PORTIX_SHA256.linux}

Windows (portix-windows-${PORTIX_VERSION}.zip):
${PORTIX_SHA256.windows}

Download: https://github.com/chimeramutate/portix/releases/tag/${PORTIX_VERSION}`;
              message.info({
                content: (
                  <pre style={{ fontSize: 13, fontFamily: 'monospace', lineHeight: 1.5, textAlign: 'left' }}>
{checksums}
                  </pre>
                ),
                duration: 30000,
              });
            }}
          >
            SHA256 checksums
          </Button>
          <span style={{ color: '#334155' }}>·</span>
          <Button type="link" icon={<AppstoreOutlined />} style={{ color: '#64748b', fontSize: 14 }} href={`https://github.com/chimeramutate/portix/releases`}>
            All releases
          </Button>
          <span style={{ color: '#334155' }}>·</span>
          <Button type="link" icon={<FileTextOutlined />} style={{ color: '#64748b', fontSize: 14 }} href="https://github.com/chimeramutate/portix/blob/main/LICENSE">
            View license
          </Button>
        </div>
      </div>
    </section>
  );
}
