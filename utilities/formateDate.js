export const FormattedDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const getNextDay = (dateString) => {
  const selectedDate = new Date(dateString);
  selectedDate.setDate(selectedDate.getDate() + 1);

  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
  const day = String(selectedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
