export const findMatchingObjects = (arr1, arr2) => {
  return arr1.filter((obj1) => {
    // Check if the ID exists in array2
    return arr2.some((obj2) => obj2._id === obj1._id);
  });
};
