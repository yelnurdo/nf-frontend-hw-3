import dotenv from 'dotenv';

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_USERNAME: process.env.NEXT_PUBLIC_USERNAME,
    NEXT_PUBLIC_PASSWORD: process.env.NEXT_PUBLIC_PASSWORD,
  },
};

export default nextConfig;
