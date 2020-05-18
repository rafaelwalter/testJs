'use strict';

const soap = [
  ['p', 'e', 'r', 'r'],
  ['f', 'a', 't', 'o'],
  ['e', 'f', 'g', 'p'],
  ['n', 'm', 'w', 'o'],
];

const words = 'pago gato perro ropa';

const positionsByLetters = new Map();

const getHighestProximityHorizontal = (wordLetters, soapLetters, wordStartIndex, soapStartIndex) => {
  let proximityRight = [];
  let wordIndex = wordStartIndex

  for (let i = soapStartIndex; i < soapLetters.length; i += 1) {
    if (soapLetters[i] !== wordLetters[wordIndex]) {
      break;
    }
    proximityRight.push(soapLetters[i]);
    wordIndex += 1;
  }

  if (proximityRight.length === wordLetters.length - wordStartIndex) {
    return proximityRight;
  }

  wordIndex = wordStartIndex;
  let proximityLeft = [];
  for (let i = soapStartIndex; i >= 0; i -= 1) {
    if (soapLetters[i] !== wordLetters[wordIndex]) {
      break;
    }
    proximityLeft.push(soapLetters[i]);
    wordIndex += 1;
  }

  return proximityRight.length > proximityLeft.length ? proximityRight : proximityLeft;
};

const getHighestProximityVertical = (wordLetters, soapLetters, wordStartIndex, soapStartIndexI, soapStartIndexJ) => {
  let proximityLower = [];
  let wordIndex = wordStartIndex

  // +iy
  for (let i = soapStartIndexI; i < soapLetters.length; i += 1) {
    if (soapLetters[i][soapStartIndexJ] !== wordLetters[wordIndex]) {
      break;
    }
    proximityLower.push(soapLetters[i][soapStartIndexJ]);
    wordIndex += 1;
  }

  if (proximityLower.length === wordLetters.length - wordStartIndex) {
    return proximityLower;
  }

  // -iy
  wordIndex = wordStartIndex;
  let proximityUpper = [];
  for (let i = soapStartIndexI; i >= 0; i -= 1) {
    if (soapLetters[i][soapStartIndexJ] !== wordLetters[wordIndex]) {
      break;
    }
    proximityUpper.push(soapLetters[i][soapStartIndexJ]);
    wordIndex += 1;
  }

  return proximityLower.length > proximityUpper.length ? proximityLower : proximityUpper;
};

const getHighestProximityDiagonal = (wordLetters, soapLetters, wordStartIndex, soapStartIndexI, soapStartIndexJ) => {
  let proximityUpperRight = [];
  let wordIndex = wordStartIndex
  let soapIndexJ = soapStartIndexJ;

  // +i+y
  for (let i = soapStartIndexI; i < soapLetters.length; i += 1) {
    if (soapLetters[i][soapIndexJ] !== wordLetters[wordIndex]) {
      break;
    }
    proximityUpperRight.push(soapLetters[i][soapIndexJ]);
    soapIndexJ += 1;
    wordIndex += 1;
  }

  if (proximityUpperRight.length === wordLetters.length - wordStartIndex) {
    return proximityUpperRight;
  }

  // +i-y
  soapIndexJ = soapStartIndexJ;
  wordIndex = wordStartIndex;
  let proximityLowerRight = [];
  for (let i = soapStartIndexI; i < soapLetters.length; i += 1) {
    if (soapLetters[i][soapIndexJ] !== wordLetters[wordIndex]) {
      break;
    }
    proximityLowerRight.push(soapLetters[i][soapIndexJ]);
    soapIndexJ -= 1;
    wordIndex += 1;
  }

  return proximityUpperRight.length > proximityLowerRight.length ? proximityUpperRight : proximityLowerRight;
};

soap.forEach((array, i) => {
  array.forEach((letter, y) => {
    if (!positionsByLetters.has(letter)) {
      positionsByLetters.set(letter, []);
    }
    positionsByLetters.get(letter).push([i, y]);
  });
});

const results = new Map();

words.split(' ').forEach((word) => {
  const wordLetters = word.split('');

  let highest = '';

  wordLetters.some((letter, wordLetterIndex) => {
    if (!positionsByLetters.has(letter)) {
      return false;
    }

    const positions = positionsByLetters.get(letter);

    return positions.some(([i, y]) => {
      const proxHorizontal = getHighestProximityHorizontal(wordLetters, soap[i], wordLetterIndex, y).join('');
      if (proxHorizontal.length === wordLetters.length - wordLetterIndex && proxHorizontal.length > highest.length) {
        highest = proxHorizontal;
        return true;
      }
      const proxVertical = getHighestProximityVertical(wordLetters, soap, wordLetterIndex, i, y).join('');
      if (proxVertical.length === wordLetters.length - wordLetterIndex && proxVertical.length > highest.length) {
        highest = proxVertical;
        return true;
      }
      const proxDiagonal = getHighestProximityDiagonal(wordLetters, soap, wordLetterIndex, i, y).join('');
      if (proxDiagonal.length === wordLetters.length - wordLetterIndex && proxDiagonal.length > highest.length) {
        highest = proxDiagonal;
        return true;
      }
      const max = Math.max(proxHorizontal.length, proxVertical.length, proxDiagonal.length);
      if (max > highest.length) {
        if (proxHorizontal.length === max) {
          highest = proxHorizontal;
        } else if (proxVertical.length === max) {
          highest = proxVertical;
        } else if (proxDiagonal.length === max) {
          highest = proxDiagonal;
        }
      }
    });
  });

  results.set(word, highest);
});

console.log(results);