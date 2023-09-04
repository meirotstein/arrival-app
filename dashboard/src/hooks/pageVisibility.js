import { useEffect } from 'react';

export function usePageVisibility(onForeground, onBackground) {
  useEffect(() => {
    if (typeof document.hidden !== 'undefined') {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          onBackground();
        } else {
          onForeground();
        }
      };

      const handleBackground = () => {
        onBackground();
      };

      const handleForeground = () => {
        onForeground();
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      if ('freeze' in document) {
        document.addEventListener('freeze', handleBackground);
        document.addEventListener('resume', handleForeground);
      }

      window.addEventListener('focus', handleForeground);
      window.addEventListener('blur', handleBackground);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        document.removeEventListener('freeze', handleBackground);
        document.removeEventListener('resume', handleForeground);

        window.removeEventListener('focus', handleForeground);
        window.removeEventListener('blur', handleBackground);
      };
    }
  }, [onBackground, onForeground]);
}
