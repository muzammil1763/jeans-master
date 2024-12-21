import { NextRequest, NextResponse } from "next/server";

import { MongoClient,ObjectId } from "mongodb";
const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;
const collectionName = process.env.MONGODB_COLLECTION_JEANS!;

export async function GET(request: Request) {
  const uri =
    "mongodb+srv://muzammilk1763:hsZWo6W5BrHCsGND@product1.wk37e.mongodb.net/";
  const client = new MongoClient(uri);

    const url = new URL(request.url);
    const pathname = url.pathname;
    const id = pathname.split("/").pop(); 
  console.log(id);

  try {
     const database = client.db(dbName);
     const jeans = database.collection(collectionName);
    // Query for a movie that has the title 'Back to the Future'
     const query = { _id: new ObjectId(id) };
    const jean = await jeans.findOne(query);
  
    return NextResponse.json({ jean });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
