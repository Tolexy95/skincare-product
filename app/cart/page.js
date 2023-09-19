import { CartItems } from "../components/CartItems"
import { CartSummary } from "../components/CartSummary"


export default function Page() {
  return (
    <div className="mt-24 mx-auto max-w-7xl">
      <main className="mx-auto  px-4 pb-24 pt-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Shopping Cart
        </h1>

        <form className="mt-12 grid grid-cols-2 items-start gap-x-48 sm:grid-cols-1 lg:gap-x-24 ">
          <section aria-labelledby="cart-heading" className="">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            {/* Cart Items */}
            <CartItems/>
          </section>
          {/* Cart Summary */}
          <CartSummary/>
        </form>
      </main>
    </div>
  )
}
