function isEqual(value1: any, value2: any) {
  // Check if the values are strictly equal (handles primitive values and references)
  if (value1 === value2) {
    return true;
  }

  // Check if both values are objects
  if (
    typeof value1 === "object" &&
    typeof value2 === "object" &&
    value1 !== null &&
    value2 !== null
  ) {
    // Check if the objects have the same number of properties
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);
    if (keys1.length !== keys2.length) {
      return false;
    }

    // Check if each property in value1 is deeply equal to the corresponding property in value2
    for (const key of keys1) {
      if (!isEqual(value1[key], value2[key])) {
        return false;
      }
    }

    return true;
  }

  // Not deeply equal
  return false;
}

export class DeepSet extends Array {
  add(value: Object) {
    const existingValue = this.findEqualValue(value);
    if (!existingValue) {
      this.push(value);
    }
  }

  has(value: Object) {
    return this.findEqualValue(value) !== undefined;
  }

  findEqualValue(value: Object) {
    for (const existingValue of this) {
      if (isEqual(existingValue, value)) {
        return existingValue;
      }
    }
    return undefined;
  }

  get size() {
    return this.length;
  }

  // Other methods you want to expose from the Set object

  // For example:
  // forEach(callbackFn, thisArg) {
  //   this.set.forEach(callbackFn, thisArg);
  // }
}
