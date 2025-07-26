import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const incidents = await prisma.incident.findMany({
    where: { resolved: false },
    include: { camera: true },
    orderBy: { tsStart: 'desc' }, // updated field name
  });

  return NextResponse.json(incidents);
}




// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function PATCH(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const id = parseInt(params.id);

//   if (isNaN(id)) {
//     return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
//   }

//   try {
//     const updatedIncident = await prisma.incident.update({
//       where: { id },
//       data: { resolved: true },
//     });

//     return NextResponse.json(updatedIncident, { status: 200 });
//   } catch (error) {
//     console.error("Error updating incident:", error);
//     return NextResponse.json(
//       { error: "Failed to resolve incident" },
//       { status: 500 }
//     );
//   }
// }
