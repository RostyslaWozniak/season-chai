export const getMonth = (numOfMonths: number) => {
  const months = [];
  const date = new Date();

  // Get the current month (0-based index)
  const currentMonth = date.getMonth();

  for (let i = 0; i < numOfMonths; i++) {
    // Calculate the next month by adding i and using modulo 12 to wrap around the year
    const nextMonth = (currentMonth - i) % 12;

    // Set the month of the date object
    date.setMonth(nextMonth);

    // Push the short month name into the array
    months.push(date.toLocaleString("en-US", { month: "short" }));
  }
  return months;
};
