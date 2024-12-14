import moment from "moment";

export const formatDate = (dateTime) => {
  const formattedDateTime = moment(dateTime).format("dddd, MMM D YYYY");
  return `${formattedDateTime}`;
};

export const isContestEnd = (deadline) => moment(deadline).isBefore(moment());

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );
