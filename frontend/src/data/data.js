export const books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 10.99,
    quantity: 20,
    image: "https://example.com/to-kill-a-mockingbird.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    price: 9.99,
    quantity: 15,
    image: "https://example.com/1984.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    quantity: 25,
    image: "https://example.com/the-great-gatsby.jpg",
  },
  // Repeat the above objects to have a total of 40 objects
  // You can modify the details as needed or generate more diverse data
];

// Replicate the existing data to reach a total of 40 objects
for (let i = 0; i < 150; i++) {
  books.push({
    title: `Title ${i + 4}`,
    author: `Author ${i + 4}`,
    price: Math.floor(Math.random() * 20) + 5,
    quantity: Math.floor(Math.random() * 30) + 10,
    image: `https://example.com/image${i + 4}.jpg`,
  });
}
