const {
  convertTimestampToDate, formatData,
  createRef
} = require("../db/seeds/utils");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe('formatData', () => {
  test('returns a array', () => {
    const testData = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
      {
        username: "icellusedkars",
        name: "sam",
        avatar_url: "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      },
      {
        username: "rogersop",
        name: "paul",
        avatar_url: "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
      },
      {
        username: "lurker",
        name: "do_nothing",
        avatar_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      },
    ]
    expect(Array.isArray(formatData(testData))).toEqual(true)
  })
  test('returns array has equal length as the the passed on data', () => {
    const testData = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
      {
        username: "icellusedkars",
        name: "sam",
        avatar_url: "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      },
      {
        username: "rogersop",
        name: "paul",
        avatar_url: "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
      },
      {
        username: "lurker",
        name: "do_nothing",
        avatar_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      },
    ]
    expect(formatData(testData).length).toEqual(4)
  })
  test('return array with correct values', () => {
    const testData = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "fdas",
      },
      {
        username: "icellusedkars",
        name: "sam",
        avatar_url: "fdas",
      },
      {
        username: "rogersop",
        name: "paul",
        avatar_url: "321",
      },
      {
        username: "lurker",
        name: "do_nothing",
        avatar_url:
          "321",
      },
    ]
    expect(formatData(testData)).toEqual([
      ["butter_bridge", "jonny", "fdas"],
      ["icellusedkars", "sam", "fdas"],
      ["rogersop", "paul", "321"],
      ["lurker", "do_nothing", "321"]
    ])
  })
  test('', () => { })
})

describe('createRef', () => {
  test('return empty object when pass on empty array', () => {
    expect(createRef([])).toEqual({})
  })
  test('return one reference when pass on one object', () => {
    const input = [{
      article_id: 10,
      title: 'Seven inspirational thought leaders from Manchester UK',
      topic: 'mitch',
      author: 'rogersop',
      body: "Who are we kidding, there is only one, and it's Mitch!",
      created_at: '2020-05-14T04:15:00.000Z',
      votes: 0,
      article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
    }]
    expect(createRef(input)).toEqual({"Seven inspirational thought leaders from Manchester UK": 10 })
  })
  test('return multiple references when pass on morethan one object', () => {
    const input =  [
    {
      article_id: 11,
      title: 'Am I a cat?',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
      created_at: '2020-01-15T22:21:00.000Z',
      votes: 0,
      article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
    },
    {
      article_id: 12,
      title: 'Moustache',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'Have you seen the size of that thing?',
      created_at: '2020-10-11T11:24:00.000Z',
      votes: 0,
      article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
    },
    {
      article_id: 13,
      title: 'Another article about Mitch',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'There will never be enough articles about Mitch!',
      created_at: '2020-10-11T11:24:00.000Z',
      votes: 0,
      article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
    }]
    expect(createRef(input)).toEqual(
      {'Am I a cat?':11 ,'Moustache':12, 'Another article about Mitch':13}
    )
  })
})