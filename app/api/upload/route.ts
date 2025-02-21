import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as Blob;

  if (!file) return NextResponse.json({ message: "No file uploaded" }, { status: 400 });

  console.log(`Received file: ${file.name}`);
  return NextResponse.json({ message: `File uploaded successfully: ${file.name}` });
}
