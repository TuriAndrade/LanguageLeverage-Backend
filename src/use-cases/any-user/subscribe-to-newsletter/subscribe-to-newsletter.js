export default function buildSubscribeToNewsletter({
  Subscriber,
  createSubscriber,
}) {
  return async function subscribeToNewsletter({ name, email }) {
    const alreadyExists = await Subscriber.findOne({
      where: {
        email,
      },
    });

    if (alreadyExists) {
      throw new Error("You are already a subscriber!");
    }

    const subscriber = createSubscriber({
      name,
      email,
    });

    const createdSubscriber = await Subscriber.create({
      name: subscriber.getName(),
      email: subscriber.getEmail(),
    });

    return {
      subscriberId: createdSubscriber.id,
    };
  };
}
