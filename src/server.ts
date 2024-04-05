import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { generateSLug } from "./utils/generate-slug";

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

 const {
  title,
  details,
  maximumAttendees
 } = createEventsSchema.parse(request.body)
const slug = generateSLug(data.title)
const eventWithSameSlug = await.prisma.event.findUnique({
  where: {
    slug,
  }
})

if(eventWithSameSlug !== null){
  throw new Error('Another event with same title already exist')
}
 const event = await prisma.event.create({
  data:{ 
    title,
    details,
    maximumAttendees,
    slug
  
  },
 })

 return {eventId: event.id}
})


app.listen({ port: 4333}).then(() => console.log("It's Running"))