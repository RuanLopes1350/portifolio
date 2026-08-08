import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import About from '@/lib/models/About';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const about = await About.findOne();
    return NextResponse.json(about || {});
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    let about = await About.findOne();
    if (about) {
      Object.assign(about, body);
      await about.save();
    } else {
      about = await About.create(body);
    }

    return NextResponse.json(about);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update profile' }, { status: 500 });
  }
}
