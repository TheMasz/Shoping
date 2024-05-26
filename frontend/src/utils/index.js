export function formatNumber(number) {
  if (typeof number !== "number" || isNaN(number)) {
    return ""; 
  }

  const fixedNumber = number.toFixed(2);
  const [integerPart, decimalPart] = fixedNumber.split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  return decimalPart === "00"
    ? formattedIntegerPart
    : `${formattedIntegerPart}.${decimalPart}`;
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US");
  const formattedTime = date.toLocaleTimeString("en-US");
  return `${formattedDate} at ${formattedTime}`;
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex =
    /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s.-]{7,14}$/;
  return phoneRegex.test(phoneNumber);
};
