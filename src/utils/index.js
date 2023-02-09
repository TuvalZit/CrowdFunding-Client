export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const compareCampaigns = (c1, c2) => {
  let remainingDays1 = daysLeft(c1.deadline);
  let remainingDays2 = daysLeft(c2.deadline);
  return remainingDays1 - remainingDays2;
};

export const descendCompareCampaigns = (c1, c2) => {
  let remainingDays1 = daysLeft(c1.deadline);
  let remainingDays2 = daysLeft(c2.deadline);
  return remainingDays2 - remainingDays1;
};
export const sortCampaigns = (data) => {
  let negativeArr = [],
    positiveArr = [];
  let remainingDays;
  data.map((camp) => {
    remainingDays = daysLeft(camp.deadline);
    remainingDays > 0 ? positiveArr.push(camp) : negativeArr.push(camp);
  });
  let sortedArr = [
    ...positiveArr.sort(compareCampaigns),
    ...negativeArr.sort(descendCompareCampaigns),
  ];
  return sortedArr;
};
export const getMinimumDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  return today;
};
