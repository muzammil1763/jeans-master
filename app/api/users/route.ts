import { NextRequest, NextResponse } from "next/server";

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;
const collectionName = process.env.MONGODB_COLLECTION_USERS!;

export async function POST(request: Request) {
  
  const client = new MongoClient(uri);
  const body = await request.json();
  console.log(body);
  try {
    const database = client.db(dbName);
    const users = database.collection(collectionName);
    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const user = await users.insertOne(body);

    return NextResponse.json({ user });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
