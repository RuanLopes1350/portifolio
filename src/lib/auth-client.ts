import { createAuthClient } from 'better-auth/react';

function getClientBaseURL() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  let url = process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL;
  if (!url && process.env.NEXT_PUBLIC_VERCEL_URL) {
    url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  if (!url) {
    return 'http://localhost:3000';
  }
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

export const authClient = createAuthClient({
  baseURL: getClientBaseURL(),
});
