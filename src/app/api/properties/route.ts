export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "properties.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "fellipe2024";

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    // Copia os dados iniciais
    const initial = require("@/lib/properties").properties;
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2));
  }
}

export async function GET() {
  try {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const { password, properties } = await req.json();
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(properties, null, 2));
  return NextResponse.json({ ok: true });
}
