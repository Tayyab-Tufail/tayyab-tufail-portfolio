import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { CardForm, useConfirmPayment } from "@stripe/stripe-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../api";
import StarRating from "react-native-star-rating-widget";

const PaymentDetailScreen = () => {
  const navigation = useNavigation();
  const { confirmPayment } = useConfirmPayment();
  const route = useRoute();
  const { orderId } = route.params;

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);

  const handlePayment = async () => {
    if (!amount) {
      Alert.alert("Error", "Please enter the amount.");
      return;
    }

    if (!cardComplete) {
      Alert.alert("Error", "Please complete all card details.");
      return;
    }

    setLoading(true);

    try {
      // Create Payment Intent
      const response = await api.post(`/orders/${orderId}/complete`, {
        price: parseFloat(amount),
        paymentMethodType: "card",
      });

      const { clientSecret, paymentIntentId } = response.data;

      // Confirm the payment
      const billingDetails = {
        email: "email@stripe.com",
      };

      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
        billingDetails,
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else if (paymentIntent) {
        // Update order status after successful payment
        try {
          await api.post(`/orders/${orderId}/payment-complete`, {
            paymentIntentId,
          });

          setRatingModalVisible(true); // Show rating modal
        } catch (updateError) {
          Alert.alert(
            "Warning",
            "Payment was successful but there was an error updating the order status. Please contact support."
          );
        }
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error processing your payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async () => {
    try {
      await api.post(`/orders/${orderId}/rate`, { rating });
      setRatingModalVisible(false);
      Alert.alert("Thank you!", "Rating submitted successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting rating:", error);
      Alert.alert("Error", "Failed to submit rating.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.label}>Card Information</Text>
        <CardForm
          style={styles.cardForm}
          onFormComplete={(details) => {
            setCardComplete(details.complete);
          }}
          cardStyle={styles.cardField}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.payButton,
          (!cardComplete || loading) && styles.disabledButton,
        ]}
        onPress={handlePayment}
        disabled={!cardComplete || loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.payButtonText}>
            Pay ${parseFloat(amount || 0).toFixed(2)}
          </Text>
        )}
      </TouchableOpacity>

      <Text style={styles.testCardText}>
        Test Card: 4242 4242 4242 4242{"\n"}
        Exp: Any future date (e.g., 12/34){"\n"}
        CVC: Any 3 digits
      </Text>

      <Modal
        visible={ratingModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.ratingModalContent}>
            <Text style={styles.ratingModalTitle}>Rate Your Experience</Text>
            <StarRating rating={rating} onChange={setRating} />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitRating}
            >
              <Text style={styles.submitButtonText}>Submit Rating</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontFamily: "MontserratBold",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: "MontserratMedium",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    fontFamily: "MontserratMedium",
  },
  cardContainer: {
    marginBottom: 30,
  },
  cardForm: {
    height: 200,
    marginVertical: 10,
  },
  cardField: {
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    borderRadius: 8,
    fontSize: 14,
    placeholderColor: "#999999",
  },
  payButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#999999",
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
  },
  testCardText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 20,
    fontFamily: "MontserratMedium",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  ratingModalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  ratingModalTitle: {
    fontSize: 20,
    fontFamily: "MontserratBold",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
  },
});

export default PaymentDetailScreen;
