import { useEffect, useState } from 'react';

function readPath(): string {
  const hashPath = window.location.hash.replace(/^#/, '');
  if (hashPath.startsWith('/')) return hashPath;

  // Support direct browser URLs such as /cms in addition to the site's
  // existing hash URLs (for example, #/history).
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  return pathname.startsWith('/') ? pathname : '/';
}

export function useHashPath(): string {
  const [path, setPath] = useState(readPath);

  useEffect(() => {
    const handleChange = () => setPath(readPath());
    window.addEventListener('hashchange', handleChange);
    return () => window.removeEventListener('hashchange', handleChange);
  }, []);

  return path;
}
