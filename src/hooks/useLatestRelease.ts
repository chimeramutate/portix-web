import { useEffect, useState } from 'react';

type Release = {
  tag_name: string;
  name: string;
  html_url: string;
  draft: boolean;
  prerelease: boolean;
};

type UseLatestReleaseResult = {
  release: Release | null;
  version: string;
  loading: boolean;
  error: Error | null;
};

const PORTIX_REPO = 'chimeramutate/portix';

export function useLatestRelease(repo: string = PORTIX_REPO): UseLatestReleaseResult {
  const [release, setRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'portix-web',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch release: ${response.status} ${response.statusText}`);
        }

        const data: Release = await response.json();
        setRelease(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        // Fallback to a default version on error
        setRelease({
          tag_name: 'v1.0.0',
          name: 'v1.0.0',
          html_url: `https://github.com/${repo}/releases/tag/v1.0.0`,
          draft: false,
          prerelease: false,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRelease();
  }, [repo]);

  return {
    release,
    version: release?.tag_name ?? 'v1.0.0',
    loading,
    error,
  };
}