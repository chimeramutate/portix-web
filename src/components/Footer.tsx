import { Typography, Divider, Space, Button } from 'antd';
import { GithubOutlined, HeartOutlined } from '@ant-design/icons';

const { Text, Title, Paragraph } = Typography;

const footerLinks = [
  {
    title: 'Project',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Architecture', href: '#architecture' },
      { label: 'Platforms', href: '#platforms' },
      { label: 'Download', href: '#download' },
      { label: 'Getting Started', href: '#getting-started' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Releases', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'License', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#070a0f' }}>
      <div className="mx-auto max-w-6xl px-6" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <img
                src="/portix_launcher.png"
                alt="Portix logo"
                style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }}
              />
              <Text strong style={{ color: '#fff', fontSize: 18 }}>Portix</Text>
            </a>
            <Paragraph style={{ marginTop: 16, maxWidth: 320, color: '#64748b', fontSize: 14, lineHeight: 1.7, margin: '16px 0 0' }}>
              A modern, cross-platform SSH client built with Flutter and a high-performance Rust backend.
            </Paragraph>
            <Space style={{ marginTop: 20 }}>
              <Button
                type="text"
                href="#"
                icon={<GithubOutlined />}
                style={{ color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, width: 36, height: 36 }}
              />
            </Space>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <Title level={5} style={{ color: '#fff', margin: 0, fontSize: 14, fontWeight: 600 }}>
                {col.title}
              </Title>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    style={{ color: '#64748b', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#34d399')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Divider style={{ borderColor: 'rgba(255,255,255,0.05)', margin: '24px 0 16px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: 8 }} className="sm:flex-row">
          <Text style={{ color: '#475569', fontSize: 12 }}>© 2026 Portix. All rights reserved.</Text>
          <Text style={{ color: '#475569', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Built with <HeartOutlined style={{ color: '#10b981' }} /> using Flutter &amp; Rust
          </Text>
        </div>
      </div>
    </footer>
  );
}
