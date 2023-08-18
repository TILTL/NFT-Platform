import React, { useContext } from "react";
import { Button, List, Divider, Modal } from "antd";
import { CartContext } from "./CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51NCqDyAUfLXvfS1rCdJSvbQDY5qO2HvCnaAlK9xEbEnGCFHPhVYFFGcTmgnjibf7SxcMbP9Y75RnqZd8AYRhlHsY00hTa1Yqu0');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { totalAmount } = useContext(CartContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error); // Handle it accordingly
    } else {
      // TODO: Send paymentMethod.id to server
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="primary" htmlType="submit" style={{ marginTop: "28px" }}>
        Pay ${totalAmount}
      </Button>
    </form>
  );
};

const Checkout = ({ imageUrl, visible, onCancel }) => {
  //const { cart } = useContext(CartContext);

  const imageStyle = {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'contain'
  };

  return (
    <Modal
      title="Checkout"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <img src={imageUrl} alt="NFT" style={imageStyle} />
      <List
        itemLayout="horizontal"
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={`Price: $${item.price}`}
            />
          </List.Item>
        )}
      />
      <Divider />
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </Modal>
  );
};

export default Checkout;
