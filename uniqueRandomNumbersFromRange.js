const uniqueRandNumsFromRange = (function() {
  /**
   * Return a unique, random number from a specified range
   *
   * @param {Number} lower the starting number
   * @param {Number} upper the ending number
   * @param {Array} pool the pool of numbers to draw from
   * @param {Number} remove the number to remove from the array
   *
   * @return {Object} the random number and the pool of remaining numbers
   */
  function uniqueRandNumFromRange(lower = 1, upper = 20, pool, remove) {
    let numbers = pool || [];

    // fill the array with the range of numbers
    if (! numbers.length || ! numbers) {
      for (let i = lower; i <= upper; i++) {
        numbers.push(i);
      }
    }

    // search array for number to remove
    if (remove) {
      let index = numbers.indexOf(remove);
      if (index !== -1) {
        numbers.splice(index, 1);
      }
    }

    // get a random index from the array
    let randIndex = getRandomIntInclusive(0, numbers.length - 1);

    return {
      numbersPool: numbers,
      randomNumber: numbers[randIndex]
    };
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate The Numbers
   *
   * @param {Number} amount the amount of numbers to generate
   * @param {Function} cbEach callback called each iteration
   * @param {Function} cbEnd callback called after all iterations
   *
   * @return {Array} an array of the generated numbers
   */
  function generateNumbers(amount, cbEach, cbEnd) {
    let numbers      = [];
    let numbersData  = null;
    let randomNumber = null;
    let numbersPool  = null;

    for (let i = 0; i < amount; i++) {
      // get random number data
      numbersData = uniqueRandNumFromRange(1, amount, numbersPool, randomNumber);

      // save random number data
      randomNumber = numbersData.randomNumber;
      numbersPool  = numbersData.numbersPool;
      numbers.push(randomNumber);

      // optional callback each
      if (typeof cbEach !== 'undefined' && cbEach) {
        cbEach(randomNumber);
      }
    }

    // optional callback end
    if (typeof cbEnd !== 'undefined' && cbEnd) {
      cbEnd(numbers);
    }

    return numbers;
  }

  return {
    generate: generateNumbers
  };
})();
