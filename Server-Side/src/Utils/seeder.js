export const seedFakeProducts = (count = 10) => {
    const products = [];
    const names = ["Laptop", "Phone", "Keyboard", "Mouse", "Monitor", "Tablet", "Speaker", "Camera", "Printer", "Watch"];
    const descriptions = [
      "High-quality device",
      "Latest model with advanced features",
      "Compact and reliable",
      "Durable and affordable",
      "Top-rated product by users",
    ];
  
    for (let i = 0; i < count; i++) {
      const name = names[i % names.length] + ` ${Math.floor(Math.random() * 1000)}`;
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];
      const price = (Math.random() * 500 + 50).toFixed(2);
      const stock = Math.floor(Math.random() * 100 + 1);
  
      products.push({
        name,
        description,
        price,
        stock,
      });
    }
  
    return products;
  };