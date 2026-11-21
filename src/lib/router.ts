import { useEffect, useState } from 'react';

function readPath(): string {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  if (pathname !== '/') return pathname.startsWith('/') ? pathname : '/';

  // Keep old shared hash URLs working while clean links are phased in.
  const hashPath = window.location.hash.replace(/^#/, '');
  return hashPath.startsWith('/') ? hashPath : '/';
}

export function useHashPath(): string {
  const [path, setPath] = useState(readPath);

  useEffect(() => {
    const handleChange = () => setPath(readPath());
    window.addEventListener('hashchange', handleChange);
    window.addEventListener('popstate', handleChange);
    return () => {
      window.removeEventListener('hashchange', handleChange);
      window.removeEventListener('popstate', handleChange);
    };
  }, []);

  return path;
}
