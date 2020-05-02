export const getRandomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const splitAString = (string, delimiter) => string.split(delimiter);

export const returnRandomArray = (array, min, max) => {
  const random = [];
  let newArrayLength = (getRandomIntegerInRange(min, max));
  while (newArrayLength > min) {
    let randomArrayElement = array[getRandomIntegerInRange(min, max - 1)];
    if (!random.includes(randomArrayElement)) {
      random.push(randomArrayElement);
      newArrayLength--;
    }
  }
  return random;
};

export const returnRandomElementInArray = (array) => array[getRandomIntegerInRange(0, array.length - 1)];
