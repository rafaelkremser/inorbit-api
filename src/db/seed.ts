import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Criar a primeira meta', desiredWeeklyFrequency: 1 },
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Me exercitar', desiredWeeklyFrequency: 2 },
    ])
    .returning()

  await db
    .insert(goalCompletions)
    .values([{ goalId: result[0].id }])
    .returning()
}

seed().finally(() => {
  client.end()
})
