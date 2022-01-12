import initStripe from "stripe";
import { buffer } from "micro";
import { getServiceSupabase } from "../lib/supabase";

export const config = { api: { bodyParser: false } };

const handler = async (req, res) => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.STRIPE_PRODUCTS_SIGNING_SECRET;
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  const supabase = getServiceSupabase();

  switch (event.type) {
    case "product.created":
      await supabase
        .from("eventos")
        .update({
          //is_subscribed: true,
          //interval: event.data.object.items.data[0].plan.interval,
          product_id: event.data.object.id
        })
        //
      break;
    case "product.deleted":
      await supabase
        .from("eventos")
        .update({
          product_id: "null"
          //is_subscribed: false,
          //interval: null,
        })
        //.eq("stripe_customer", event.data.object.customer);
      break;
  }

  console.log({ event });

  res.send({ received: true });
};

export default handler;
