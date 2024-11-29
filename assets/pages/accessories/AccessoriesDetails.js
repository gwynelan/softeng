import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Linking,
  ScrollView,
} from 'react-native';

const AccessoriesDetails = ({ route, navigation }) => {
  const { accessory } = route.params;

  const [cart, setCart] = useState({ quantity: 1 });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    barangay: '',
    street: '',
  });
  const [modals, setModals] = useState({
    quantity: false,
    payment: false,
    shipping: false,
    checkout: false,
    success: false,
  });

  const toggleModal = (modalName, value) => {
    setModals((prev) => ({ ...prev, [modalName]: value }));
  };

  const proceedToNext = (currentModal, nextModal) => {
    toggleModal(currentModal, false);
    toggleModal(nextModal, true);
  };

  const contactSeller = (method) => {
    const contacts = {
      phone: 'tel:+1234567890',
      email: 'mailto:seller@example.com',
      facebook: 'https://www.facebook.com/sellerprofile',
    };
    Linking.openURL(contacts[method]);
  };

  const handleConfirmOrder = () => {
    toggleModal('checkout', false);
    toggleModal('success', true);
  };

  const handleBackToHome = () => {
    toggleModal('success', false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Accessory image and details */}
      <Image source={accessory.imageUrl} style={styles.accessoryImage} />
      <Text style={styles.accessoryName}>{accessory.name}</Text>
      <Text style={styles.accessoryPrice}>₱{accessory.price}</Text>
      <Text style={styles.accessoryDescription}>{accessory.description}</Text>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => toggleModal('quantity', true)}>
        <Text style={styles.addToCartButtonText}>ORDER NOW</Text>
      </TouchableOpacity>

      {/* Contact seller section */}
      <Text style={styles.contactHeader}>Seller's Contact Information</Text>
      {['phone', 'email', 'facebook'].map((method) => (
        <TouchableOpacity
          key={method}
          onPress={() => contactSeller(method)}
          style={styles.contactButton}>
          <Text style={styles.contactButtonText}>
            {method === 'phone'
              ? 'Call Seller'
              : method === 'email'
              ? 'Email Seller'
              : 'Message on Facebook'}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Modals */}
      {/* Quantity Modal */}
      <Modal visible={modals.quantity} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            <Text style={styles.modalHeader}>Choose Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  setCart((prev) => ({
                    ...prev,
                    quantity: Math.max(1, prev.quantity - 1),
                  }))
                }>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{cart.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  setCart((prev) => ({ ...prev, quantity: prev.quantity + 1 }))
                }>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => proceedToNext('quantity', 'payment')}>
              <Text style={styles.primaryButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => toggleModal('quantity', false)}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Payment Method Modal */}
      <Modal visible={modals.payment} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            <Text style={styles.modalHeader}>Select Payment Method</Text>
            {['Gcash', 'PayMaya', 'GoTyme'].map((method) => (
              <TouchableOpacity
                key={method}
                style={styles.optionButton}
                onPress={() => {
                  setPaymentMethod(method);
                  proceedToNext('payment', 'shipping');
                }}>
                <Text style={styles.optionButtonText}>{method}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => toggleModal('payment', false)}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Shipping Information Modal */}
      <Modal visible={modals.shipping} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            <Text style={styles.modalHeader}>Shipping Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={shippingInfo.fullName}
              onChangeText={(text) =>
                setShippingInfo((prev) => ({ ...prev, fullName: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Barangay"
              value={shippingInfo.barangay}
              onChangeText={(text) =>
                setShippingInfo((prev) => ({ ...prev, barangay: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Street"
              value={shippingInfo.street}
              onChangeText={(text) =>
                setShippingInfo((prev) => ({ ...prev, street: text }))
              }
            />
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => proceedToNext('shipping', 'checkout')}>
              <Text style={styles.primaryButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => toggleModal('shipping', false)}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Checkout Modal */}
      <Modal visible={modals.checkout} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            <Text style={styles.modalHeader}>Checkout Details</Text>
            <ScrollView>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Accessory:</Text>{' '}
                {accessory.name}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Quantity:</Text>{' '}
                {cart.quantity}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Total Price:</Text> ₱
                {accessory.price * cart.quantity}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Payment Method:</Text>{' '}
                {paymentMethod}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Shipping Address:</Text>
              </Text>
              <Text style={styles.detailSubText}>
                {shippingInfo.fullName}, {shippingInfo.street},{' '}
                {shippingInfo.barangay}
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleConfirmOrder}>
              <Text style={styles.primaryButtonText}>Confirm Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => toggleModal('checkout', false)}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={modals.success} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            <Text style={styles.modalHeader}>Order Successful!</Text>
            <Text style={styles.successMessage}>
              Your order has been placed successfully.
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleBackToHome}>
              <Text style={styles.primaryButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  accessoryImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 16,
  },
  accessoryName: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  accessoryPrice: { fontSize: 20, color: '#1b5e20', marginBottom: 8 },
  accessoryDescription: { fontSize: 16, marginBottom: 16 },
  addToCartButton: {
    backgroundColor: '#1b5e20',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  addToCartButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  contactHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 24,
  },
  contactButton: {
    backgroundColor: '#0288d1',
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    backgroundColor: '#0288d1',
    padding: 10,
    borderRadius: 8,
  },
  quantityButtonText: { color: '#fff', fontSize: 18 },
  quantityText: { fontSize: 24, marginHorizontal: 16, alignSelf: 'center' },
  primaryButton: {
    backgroundColor: '#1b5e20',
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  secondaryButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    marginTop: 8,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  optionButton: {
    backgroundColor: '#0288d1',
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center', // This ensures the text is centered
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  detailLabel: { fontWeight: 'bold' },
  detailSubText: { fontSize: 14, color: '#757575' },
  successMessage: { fontSize: 18, color: '#388e3c', marginBottom: 16 },
});

export default AccessoriesDetails;
