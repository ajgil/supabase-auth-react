import initStripe from "stripe";
import { getServiceSupabase } from "../lib/supabase";

const handler = async (req, res) => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  //const customer = await stripe.customers.create({
  //  email: req.body.record.email,
  //});

  const product = await stripe.products.create({
    name: 'Gold Special',
  });

  const supabase = getServiceSupabase();

  // https://fa84-83-44-233-80.ngrok.io/api/stripe-create-product
  // insertamos en tabla odes el id recibido desde stripe
  await supabase
    .from("eventos")
    .update({
      product_id: product.id,
    })
    .eq("id", req.body.record.id);

  res.send({ message: `stripe product created: ${product.id}` });
};

export default handler;