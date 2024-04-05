import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
  log: ['query'],
})

const app = fastify()
app.post('/events', async (request, reply) => {
 const createEventsSchema = z.object({
  title: z.string().min(4),
  details: z.string().nullable(),
  maximumAttendees: z.number().int().positive().nullable()
 })

 const data = createEventsSchema.parse(request.body)

 const event = await prisma.event.create({
  data:{ 
    title: data.title,
    details: data.details,
    maximumAttendees: data.maximumAttendees,
    slug: new Date().toISOString()
  
  },
 })

 return {eventId: event.id}
})


app.listen({ port: 4333}).then(() => console.log("It's Running"))