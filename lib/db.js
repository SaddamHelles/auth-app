import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://seraj:yjSXpR0So4iPkj6y@cluster0.olqa2q4.mongodb.net/auth-nextjs?retryWrites=true&w=majority'
  );

  return client;
}
