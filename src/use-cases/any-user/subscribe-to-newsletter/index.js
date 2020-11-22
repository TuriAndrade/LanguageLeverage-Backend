import buildSubscribeToNewsletter from "./subscribe-to-newsletter";
import buildSubscribeToNewsletterController from "./subscribe-to-newsletter-controller";
import { Subscriber } from "../../../database/models";
import createSubscriber from "../../../entities/subscriber";

const subscribeToNewsletter = buildSubscribeToNewsletter({
  Subscriber,
  createSubscriber,
});

const subscribeToNewsletterController = buildSubscribeToNewsletterController({
  subscribeToNewsletter,
});

module.exports = {
  subscribeToNewsletter,
  subscribeToNewsletterController,
};
