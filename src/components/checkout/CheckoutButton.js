import React from "react"
import { API } from "aws-amplify"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe('pk_test_51K9SOrEXK2ZVYO77dAUljO0OOiALGlNngJy7plFyi76fTZAU2A31Gtlz1m7I45lLx6PI5s0U6klFcW9jKO0iFPh700SNRjqX17')

const CheckoutButton = () => {
  const redirectToCheckout = async () => {
    const fetchSession = async () => {
      const apiName = "stripeAPI"
      const apiEndpoint = "/checkout"
      const body = {
        quantity: 1,
        priceId: "price_1KC1QgEXK2ZVYO77ZmMK0Hew",
      }
      const session = await API.post(apiName, apiEndpoint, { body })
      return session
    }

    const session = await fetchSession()
    const sessionId = session.id
    const stripe = await stripePromise
    stripe.redirectToCheckout({ sessionId })
  }

  return <button onClick={redirectToCheckout}>Continue to payment</button>
}

export default CheckoutButton