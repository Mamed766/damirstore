const StripePayment = ({
  priceCents,
  orderId,
  clientSecret,
}: {
  priceInCents: number;
  orderId: string;
  clientSecret: string;
}) => {
  return <>Stripe Form</>;
};

export default StripePayment;
