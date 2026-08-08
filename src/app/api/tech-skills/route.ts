import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import TechSkill from '@/lib/models/TechSkill';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const skills = await TechSkill.find().sort({ order: 1 });
    return NextResponse.json(skills);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch tech skills' }, { status: 500 });
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
    const newSkill = await TechSkill.create(body);

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create tech skill' }, { status: 500 });
  }
}
