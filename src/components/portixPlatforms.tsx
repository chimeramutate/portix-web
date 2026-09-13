import {
  AppleOutlined,
  CodeOutlined,
  DesktopOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';

export type Platform = {
  icon: ReactNode;
  name: string;
  desc: string;
  primary: { label: string; href: string };
  options: { label: string; href: string }[];
};

export function getPortixPlatforms(version: string): Platform[] {
  const platforms: Platform[] = [
    {
      icon: <AppleOutlined />,
      name: 'macOS',
      desc: 'Universal binary for Apple Silicon & Intel',
      primary: { label: `Download ${version} (.zip)`, href: `https://github.com/chimeramutate/portix/releases/download/${version}/portix-macos-${version}.zip` },
      options: [
        { label: `.zip (${version})`, href: `https://github.com/chimeramutate/portix/releases/download/${version}/portix-macos-${version}.zip` },
        { label: 'View release notes', href: `https://github.com/chimeramutate/portix/releases/tag/${version}` },
      ],
    },
    {
      icon: <CodeOutlined />,
      name: 'Linux',
      desc: 'Flatpak and Snap packages available',
      primary: { label: `Download ${version} (.tar.gz)`, href: `https://github.com/chimeramutate/portix/releases/download/${version}/portix-linux-${version}.tar.gz` },
      options: [
        { label: `.tar.gz (${version})`, href: `https://github.com/chimeramutate/portix/releases/download/${version}/portix-linux-${version}.tar.gz` },
        { label: 'Snap package', href: 'https://snapcraft.io/portix' },
        { label: 'View release notes', href: `https://github.com/chimeramutate/portix/releases/tag/${version}` },
      ],
    },
    {
      icon: <DesktopOutlined />,
      name: 'Windows',
      desc: 'Native build with full feature parity',
      primary: { label: `Download ${version} (.zip)`, href: `https://github.com/chimeramutate/portix/releases/download/${version}/portix-windows-${version}.zip` },
      options: [
        { label: `.zip (${version})`, href: `https://github.com/chimeramutate/portix/releases/download/${version}/portix-windows-${version}.zip` },
        { label: 'View release notes', href: `https://github.com/chimeramutate/portix/releases/tag/${version}` },
      ],
    },
  ];
  return platforms;
}