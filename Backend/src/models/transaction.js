

async function runTransaction(client) {

  try {
    await client.connect();
    const session = client.startSession();

    // Define the transaction options
    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' }
    };

    // Start the transaction
    const transactionResults = await session.withTransaction(async () => {
      const usersCollection = client.db('your_database').collection('users');
      const reviewsCollection = client.db('your_database').collection('reviews');

      // Example operations within the transaction
      await usersCollection.updateOne({ _id: userId }, { $set: { balance: newBalance } }, { session });
      await reviewsCollection.insertOne({ userId, reviewText, rating }, { session });

    }, transactionOptions);

    if (transactionResults) {
      console.log('Transaction successfully committed.');
    } else {
      console.log('Transaction intentionally aborted.');
    }
  } catch (error) {
    console.error('Transaction aborted due to an unexpected error: ', error);
  } finally {
    await client.close();
  }
}
