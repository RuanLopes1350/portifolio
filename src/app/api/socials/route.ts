import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import SocialLink from '@/lib/models/SocialLink';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const socials = await SocialLink.find().sort({ order: 1 });
    return NextResponse.json(socials);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch social links' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    const newSocial = await SocialLink.create(body);

    return NextResponse.json(newSocial, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create social link' }, { status: 500 });
  }
}
