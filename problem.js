function isPalindrome(string) {
  const newString = string.split("").reverse().join("").toLowerCase();
  if (string.toLowerCase() === newString) {
    return true;
  } else {
    return false;
  }
}

console.log(isPalindrome('bob')); //true
console.log(isPalindrome('hello')); //false