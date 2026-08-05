import { useState } from 'react';
import { Typography, Card, Button, Steps, List, Tag, message } from 'antd';
import {
  CodeOutlined,
  ControlOutlined,
  ReloadOutlined,
  CopyOutlined,
  CheckOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';

const { Title, Paragraph, Text } = Typography;

type Block = {
  id: string;
  label: string;
  icon: ReactNode;
  code: string;
};

const blocks: Block[] = [
  {
    id: 'flutter',
    label: 'Run the Flutter UI',
    icon: <CodeOutlined />,
    code: `cd portix_app

flutter run -d macos`,
  },
  {
    id: 'frb',
    label: 'Regenerate FRB bindings',
    icon: <ReloadOutlined />,
    code: `cargo install flutter_rust_bridge_codegen --version 2.11.1

flutter_rust_bridge_codegen generate \\
  --rust-root ../portix_serv \\
  --rust-input crate::api \\
  --dart-output lib/src/rust \\
  --rust-output ../portix_serv/src/frb_generated.rs \\
  --no-web`,
  },
  {
    id: 'lib',
    label: 'Rust library path',
    icon: <ControlOutlined />,
    code: `# The FRB loader expects the Rust dynamic library at:
portix_serv/target/release/libportix_serv.dylib`,
  },
];

const steps = [
  'Develop the Flutter UI inside portix_app.',
  'Develop the Rust backend inside portix_serv.',
  'If the Rust public API changes, regenerate the FRB bindings.',
  'Build the Rust library.',
  'Run the Flutter application.',
];

const repoStructure: [string, string][] = [
  ['portix_app/', 'Flutter desktop app'],
  ['portix_serv/', 'Rust SSH backend'],
  ['flatpak/', 'Flatpak packaging'],
  ['snap/', 'Snapcraft packaging'],
  ['packaging/', 'Additional resources'],
];

function CodeBlock({ block }: { block: Block }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(block.code);
    setCopied(true);
    message.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Card
      style={{
        background: '#0b1018',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
      styles={{ body: { padding: 0 } }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: '#0f1620',
          padding: '12px 16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#cbd5e1', fontSize: 14, fontWeight: 500 }}>
          <span style={{ color: '#34d399' }}>{block.icon}</span>
          {block.label}
        </div>
        <Button
          type="text"
          size="small"
          icon={copied ? <CheckOutlined style={{ color: '#34d399' }} /> : <CopyOutlined />}
          onClick={copy}
          style={{ color: '#94a3b8', fontSize: 12, fontWeight: 500 }}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: 16,
          overflowX: 'auto',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          lineHeight: 1.7,
          color: '#cbd5e1',
        }}
      >
        <code>{block.code}</code>
      </pre>
    </Card>
  );
}

export default function GettingStarted() {
  return (
    <section id="getting-started" style={{ position: 'relative', paddingTop: 96, paddingBottom: 96 }}>
      <div className="mx-auto max-w-6xl px-6">
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <Text style={{ color: '#22d3ee', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Getting Started
          </Text>
          <Title level={2} style={{ color: '#fff', marginTop: 12, fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Up and running in minutes
          </Title>
          <Paragraph style={{ color: '#94a3b8', fontSize: 16, marginTop: 16 }}>
            Clone the monorepo, run the Flutter app, and connect the Rust backend.
          </Paragraph>
        </div>

        <div className="grid gap-8 lg:grid-cols-2" style={{ marginTop: 56 }}>
          {/* Code blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {blocks.map((b) => (
              <CodeBlock key={b.id} block={b} />
            ))}
          </div>

          {/* Workflow + repo structure */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card
              style={{
                background: '#0b1018',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 12,
              }}
              styles={{ body: { padding: 24 } }}
            >
              <Title level={4} style={{ color: '#fff', margin: 0, fontSize: 16, fontWeight: 600 }}>
                Development Workflow
              </Title>
              <Steps
                direction="vertical"
                size="small"
                current={steps.length}
                style={{ marginTop: 20 }}
                items={steps.map((step, i) => ({
                  title: <Text style={{ color: '#cbd5e1', fontSize: 14 }}>{step}</Text>,
                  icon: <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399', fontSize: 13, fontWeight: 600 }}>{i + 1}</span>,
                }))}
              />
            </Card>

            <Card
              style={{
                background: '#0b1018',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 12,
              }}
              styles={{ body: { padding: 24 } }}
            >
              <Title level={4} style={{ color: '#fff', margin: 0, fontSize: 16, fontWeight: 600 }}>
                Repository Structure
              </Title>
              <List
                style={{ marginTop: 16 }}
                dataSource={repoStructure}
                renderItem={([dir, desc]) => (
                  <List.Item style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', padding: '8px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, fontFamily: '"JetBrains Mono", monospace', fontSize: 14 }}>
                      <FolderOutlined style={{ color: '#34d399', marginRight: 4 }} />
                      <span style={{ color: '#34d399' }}>{dir}</span>
                      <span style={{ color: '#475569' }}>—</span>
                      <span style={{ color: '#64748b' }}>{desc}</span>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
