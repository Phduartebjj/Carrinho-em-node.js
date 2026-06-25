function thereIsInput(input) {
  if (input === null) return false;
  if (typeof input !== "string") return false;
  return input.trim() !== "";
}

function numIsValid(num) {
  return (Number.isFinite(num) && num > 0);
}

export { thereIsInput, numIsValid };
