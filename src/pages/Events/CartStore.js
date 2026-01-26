import { OrigamiIcon } from "lucide-react"

const CART_KEY = "novus-event-cart"

export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || []
}

export const addToCart = (event) => {
  const cart = getCart()

  if (cart.find(e => e.id === event.id)) return

  const discounted = {
    ...event,
    originalFee: extractPrice(event.fee) * 0.25 + extractPrice(event.fee),
    discountedFee: applyDiscount(extractPrice(event.fee)),
  }

  localStorage.setItem(
    CART_KEY,
    JSON.stringify([...cart, discounted])
  )
}

export const removeFromCart = (id) => {
  const cart = getCart().filter(e => e.id !== id)
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

const extractPrice = (fee) => {
  const match = fee.match(/\d+/)
  return match ? Number(match[0]) : 0
}

const applyDiscount = (price) => {
  if (!price) return 0
  return Math.round(price) // 25% discount
}
