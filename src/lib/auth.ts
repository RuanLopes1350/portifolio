import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
const client = new MongoClient(uri);

function getBaseURL() {
  let url = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL;

  if (!url && process.env.VERCEL_URL) {
    url = `https://${process.env.VERCEL_URL}`;
  }

  if (!url) {
    url = 'http://localhost:3000';
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  return url;
}

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET || 'fallback-secret-for-dev-only-min-32-chars!!',
  baseURL: getBaseURL(),
});
