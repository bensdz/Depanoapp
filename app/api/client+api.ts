// /* eslint-disable prettier/prettier */
// import { PrismaClient } from "@prisma/client";
// import jwt from "jsonwebtoken";

// const prisma = new PrismaClient();

// // to create a client
// export async function POST(request: Request) {
//   try {
//     const { name, email, clerkId, emailStatus, token, clientPwd } =
//       await request.json();

//     if (!name || !email || !clerkId || !emailStatus || !token || !clientPwd) {
//       return new Response(
//         JSON.stringify({ error: "Missing required fields" }),
//         {
//           status: 400,
//         }
//       );
//     }
//     const secret = process.env.JWT_SECRET;
//     if (!secret) {
//       return new Response(JSON.stringify({ error: "Internal Error" }), {
//         status: 500,
//       });
//     }
//     jwt.verify(token, secret, (err: any) => {
//       if (err) {
//         return new Response(JSON.stringify({ error: "Invalid token" }), {
//           status: 401,
//         });
//       }
//     });
//     const response = await prisma.client.create({
//       data: {
//         fullName: name,
//         email,
//         clerkId,
//         emailStatus,
//         clientPwd: crypto.createHash("sha256").update(clientPwd).digest("hex"),
//       },
//     });

//     return new Response(JSON.stringify({ data: response }), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error creating client:", error);
//     return Response.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// // to get a client by clerkId and email
// export async function GET(request: Request) {
//   try {
//     const { clerkId, email, token } = await request.json();
//     if (!clerkId && !email && !token) {
//       return new Response(
//         JSON.stringify({ error: "Missing required fields" }),
//         {
//           status: 400,
//         }
//       );
//     }
//     const secret = process.env.JWT_SECRET;
//     if (!secret) {
//       throw new Error("Internal Error");
//     }
//     jwt.verify(token, secret, (err: any) => {
//       if (err) {
//         return new Response(JSON.stringify({ error: "Invalid token" }), {
//           status: 401,
//         });
//       }
//     });
//     const response = await prisma.client.findFirst({
//       where: {
//         clerkId,
//         email,
//       },
//     });
//     // return everything except the password
//     if (!response) {
//       return new Response(JSON.stringify({ error: "Client not found" }), {
//         status: 404,
//       });
//     }
//     const { clientPwd, ...res } = response;
//     return new Response(JSON.stringify({ data: res }), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error fetching client:", error);
//     return Response.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// // to update a client by clerkId and email
// export async function PUT(request: Request) {
//   try {
//     const { clerkId, email, token, ...data } = await request.json();
//     if (!clerkId && !email && !token) {
//       return new Response(
//         JSON.stringify({ error: "Missing required fields" }),
//         {
//           status: 400,
//         }
//       );
//     }
//     const secret = process.env.JWT_SECRET;
//     if (!secret) {
//       throw new Error("Internal Error");
//     }
//     jwt.verify(token, secret, (err: any) => {
//       if (err) {
//         return new Response(JSON.stringify({ error: "Invalid token" }), {
//           status: 401,
//         });
//       }
//     });
//     const response = await prisma.client.update({
//       where: {
//         clerkId,
//         email,
//       },
//       data,
//     });
//     return new Response(JSON.stringify({ data: response }), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error updating client:", error);
//     return Response.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// // export async function POST(request: Request) {
// //   try {
// //     const { name, email, clerkId } = await request.json();
// //     if (!name || !email || !clerkId) {
// //       return new Response(
// //         JSON.stringify({ error: "Missing required fields" }),
// //         {
// //           status: 400,
// //         }
// //       );
// //     }
// //     const response = await prisma.user.create({
// //       data: {
// //         name,
// //         email,
// //         clerkId,
// //       },
// //     });

// //     return new Response(JSON.stringify({ data: response }), {
// //       status: 200,
// //     });
// //   } catch (error) {
// //     console.error("Error creating user:", error);
// //     return Response.json({ error: "Internal Server Error" }, { status: 500 });
// //   }
// // }

// // export async function GET(request: Request) {
// //   try {
// //     const { clerkId, email } = await request.json();
// //     if (!clerkId && !email) {
// //       return new Response(
// //         JSON.stringify({ error: "Missing required fields" }),
// //         {
// //           status: 400,
// //         }
// //       );
// //     }
// //     const response = await prisma.user.findMany({
// //       where: {
// //         clerkId,
// //         email,
// //       },
// //     });
// //     return new Response(JSON.stringify({ data: response }), {
// //       status: 200,
// //     });
// //   } catch (error) {
// //     console.error("Error fetching user:", error);
// //     return Response.json({ error: "Internal Server Error" }, { status: 500 });
// //   }
// // }
