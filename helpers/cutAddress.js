export const cutAddress = (address) => {
  return (
    address?.substring(0, 6) +
    "..." +
    address?.substring(address.length - 4, address.length)
  );
};
