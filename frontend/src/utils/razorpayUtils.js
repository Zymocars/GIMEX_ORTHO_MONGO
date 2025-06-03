const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Function to dynamically load Razorpay script
export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount, currency, token) => {
  const response = await fetch(`${API_URL}api/payment/create-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount, currency }),
  });

  const data = await response.json();
  console.log("Razorpay Order Response:", data);
  return data;
};
