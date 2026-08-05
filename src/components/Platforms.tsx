import { Typography, Row, Col, Card, Tag, Button } from 'antd';
import { AppleOutlined, DesktopOutlined, CodeOutlined, CheckCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { useInView } from '@/hooks/useScroll';
import type { ReactNode } from 'react';

const { Title, Paragraph, Text } = Typography;

const platforms: { icon: ReactNode; name: string; desc: string }[] = [
  { icon: <AppleOutlined />, name: 'macOS', desc: 'Universal binary for Apple Silicon and Intel.' },
  { icon: <CodeOutlined />, name: 'Linux', desc: 'Flatpak and Snap packages available.' },
  { icon: <DesktopOutlined />, name: 'Windows', desc: 'Native build with full feature parity.' },
];

export default function Platforms() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="platforms" style={{ position: 'relative', paddingTop: 96, paddingBottom: 96 }}>
      <div className="mx-auto max-w-6xl px-6">
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <Text style={{ color: '#34d399', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Platform Support
          </Text>
          <Title level={2} style={{ color: '#fff', marginTop: 12, fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Runs everywhere you do
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: 16, marginTop: 16 }}>
            Portix ships as a native desktop app on all major operating systems.
          </Paragraph>
        </div>

        <div ref={ref}>
          <Row gutter={[20, 20]} style={{ marginTop: 56 }}>
            {platforms.map((p, i) => (
              <Col xs={24} sm={8} key={p.name}>
                <Card
                  className={inView ? 'animate-fade-up' : 'opacity-0'}
                  style={{
                    height: '100%',
                    background: '#0b1018',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 12,
                    transition: 'all 0.5s ease',
                    animationDelay: `${i * 100}ms`,
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
                      {p.icon}
                    </div>
                    <Tag
                      icon={<CheckCircleOutlined />}
                      color="success"
                      style={{ borderRadius: 999, padding: '2px 10px', fontSize: 12 }}
                    >
                      Supported
                    </Tag>
                  </div>
                  <Title level={4} style={{ color: '#fff', marginTop: 16, marginBottom: 6, fontSize: 18, fontWeight: 600 }}>
                    {p.name}
                  </Title>
                  <Paragraph style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                    {p.desc}
                  </Paragraph>
                  <Button
                    type="link"
                    href="#download"
                    icon={<DownloadOutlined />}
                    style={{ marginTop: 16, padding: 0, color: '#34d399', fontWeight: 500, fontSize: 14 }}
                  >
                    Download for {p.name}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          {['Flatpak', 'Snap', 'Packaging assets'].map((pkg) => (
            <Tag key={pkg} style={{ borderRadius: 999, padding: '4px 16px', fontSize: 14, color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}>
              {pkg}
            </Tag>
          ))}
        </div>
      </div>
    </section>
  );
}
