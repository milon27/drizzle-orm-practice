function getAllKeys(obj) {
  const keys = [];
  function traverse(obj, prefix = "") {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fullPath = prefix ? `${prefix}.${key}` : key;
        keys.push(fullPath);

        if (typeof obj[key] === "object" && obj[key] !== null) {
          traverse(obj[key], fullPath);
        }
      }
    }
  }

  traverse(obj);
  return keys;
}

function getValueByPath(obj, pathStr) {
  const keys = (pathStr + "").split(".");
  let value = obj;

  for (const key of keys) {
    if (value && typeof value === "object") {
      value = value[key];
    } else {
      value = undefined;
      break;
    }
  }

  return value;
}

function isEqual(value1, value2) {
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
  add(value) {
    const existingValue = this.findEqualValue(value);
    if (!existingValue) {
      this.push(value);
    }
  }

  has(value) {
    return this.findEqualValue(value) !== undefined;
  }

  findEqualValue(value) {
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

const list = [
  {
    user: {
      id: "gew3qnxtqnx0asnxdodltyrj",
      fullName: "Johnathan.OConner",
      email: "Gregg_White@yahoo.com",
      password: "N4Uws9XJRaumqwX",
      isEmailVerified: false,
      role: "user",
      createdAt: "2023-05-19T15:05:55.000Z",
      updatedAt: "2023-05-19T15:05:55.000Z",
    },
    blog: {
      slug: "reiciendis-tenetur-ullam-nihil-sint-quisquam.",
      title: "Reiciendis tenetur ullam nihil sint quisquam.",
      content:
        "Dolorem explicabo ut aliquam deserunt laboriosam maiores. Quisquam commodi unde mollitia non veritatis officiis nam. Officiis itaque laborum fuga eum recusandae. Natus architecto doloremque facilis quos. Corporis laboriosam molestias cumque distinctio asperiores fuga adipisci adipisci quisquam.",
      userId: "gew3qnxtqnx0asnxdodltyrj",
      createdAt: "2023-05-19T15:05:55.000Z",
      updatedAt: "2023-05-19T15:05:55.000Z",
    },
    category: {
      slug: "development",
      title: "Development",
      parentSlug: null,
      userId: "i9r5wcsk9sd24o9cnnf9wh36",
      createdAt: "2023-05-19T15:05:23.000Z",
    },
  },
  {
    user: {
      id: "gew3qnxtqnx0asnxdodltyrj",
      fullName: "Johnathan.OConner",
      email: "Gregg_White@yahoo.com",
      password: "N4Uws9XJRaumqwX",
      isEmailVerified: false,
      role: "user",
      createdAt: "2023-05-19T15:05:55.000Z",
      updatedAt: "2023-05-19T15:05:55.000Z",
    },
    blog: {
      slug: "reiciendis-tenetur-ullam-nihil-sint-quisquam.",
      title: "Reiciendis tenetur ullam nihil sint quisquam.",
      content:
        "Dolorem explicabo ut aliquam deserunt laboriosam maiores. Quisquam commodi unde mollitia non veritatis officiis nam. Officiis itaque laborum fuga eum recusandae. Natus architecto doloremque facilis quos. Corporis laboriosam molestias cumque distinctio asperiores fuga adipisci adipisci quisquam.",
      userId: "gew3qnxtqnx0asnxdodltyrj",
      createdAt: "2023-05-19T15:05:55.000Z",
      updatedAt: "2023-05-19T15:05:55.000Z",
    },
    category: {
      slug: "web-development",
      title: "Web Development",
      parentSlug: "development",
      userId: "i9r5wcsk9sd24o9cnnf9wh36",
      createdAt: "2023-05-19T15:05:23.000Z",
    },
  },
  {
    user: {
      id: "i9r5wcsk9sd24o9cnnf9wh36",
      fullName: "Hanna19",
      email: "Randall.Predovic@gmail.com",
      password: "bbUN7pJzp1e6CP3",
      isEmailVerified: false,
      role: "user",
      createdAt: "2023-05-19T15:05:23.000Z",
      updatedAt: "2023-05-19T15:05:23.000Z",
    },
    blog: null,
    category: null,
  },
  {
    user: {
      id: "gew3qnxtqnx0asnxdodltyrj",
      fullName: "Johnathan.OConner",
      email: "Gregg_White@yahoo.com",
      password: "N4Uws9XJRaumqwX",
      isEmailVerified: false,
      role: "user",
      createdAt: "2023-05-19T15:05:55.000Z",
      updatedAt: "2023-05-19T15:05:55.000Z",
    },
    blog: {
      slug: "blog2u1",
      title: "blog2u1",
      content: "blog2u1",
      userId: "gew3qnxtqnx0asnxdodltyrj",
      createdAt: "2023-05-19T15:05:55.000Z",
      updatedAt: "2023-05-19T15:05:55.000Z",
    },
    category: {
      slug: "web-development",
      title: "Web Development",
      parentSlug: "development",
      userId: "i9r5wcsk9sd24o9cnnf9wh36",
      createdAt: "2023-05-19T15:05:23.000Z",
    },
  },
];

const get = (obj) => {
  const keyList = getAllKeys(obj); // [  "user",  "user.blog",  "user.blog.category",  "user.category"]
  const mainObjKey = keyList[0];
  console.log(keyList);
  let mainList = new DeepSet();
  list.forEach((item) => {
    const single = item[mainObjKey]; // user object
    for (let i = 1; i <= keyList.length; i++) {
      const path = keyList[i];
      if (path) {
        const child = getValueByPath(item, path);
        console.log(child);
      }
      // get value by pth use that
    }
    mainList.add(single);
  });
  console.log(mainObjKey);
  return mainList;
  // generate a list of mainObject-[user]
};

// we will pass something like this
const newData = get({
  user: {
    blog: {
      category: true,
    },
    category: true,
  },
});
console.log(newData.length);
