import { useEffect, useState } from 'react';
import { Layout, Button, Typography, Space, Drawer } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Platforms', href: '#platforms' },
  { label: 'Download', href: '#download' },
  { label: 'Getting Started', href: '#getting-started' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 64,
        background: scrolled ? 'rgba(7, 10, 15, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        maxWidth: '100%',
      }}
    >
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <img
          src="/portix_launcher.png"
          alt="Portix logo"
          style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }}
        />
        <Text strong style={{ color: '#fff', fontSize: 18, margin: 0 }}>Portix</Text>
      </a>

      {/* Desktop nav */}
      <Space size="small" className="hidden md:flex" align="center">
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{
              padding: '8px 14px',
              color: '#94a3b8',
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 6,
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          >
            {l.label}
          </a>
        ))}
        <Button type="primary" href="#download" style={{ marginLeft: 8, fontWeight: 600 }}>
          Download
        </Button>
      </Space>

      {/* Mobile trigger */}
      <Button
        type="text"
        className="md:hidden"
        icon={open ? <CloseOutlined /> : <MenuOutlined />}
        onClick={() => setOpen(true)}
        style={{ color: '#cbd5e1' }}
      />
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/portix_launcher.png" alt="Portix" style={{ width: 28, height: 28, borderRadius: 6 }} />
            <span>Portix</span>
          </div>
        }
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={260}
        styles={{
          body: { padding: 0 },
          header: { borderBottom: '1px solid rgba(255,255,255,0.06)' },
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 0' }}>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                padding: '12px 24px',
                color: '#94a3b8',
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ padding: '16px 24px' }}>
            <Button type="primary" block href="#download" onClick={() => setOpen(false)}>
              Download
            </Button>
          </div>
        </div>
      </Drawer>
    </Header>
  );
}
