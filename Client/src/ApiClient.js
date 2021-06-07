const url = "http://localhost:3000/api"; //Rest API URL

//Asynchronous Client using Javascript Fetch APIs
class ApiClient {
  // Retrieve products and return JSON data
  static retrieveProducts() {
    return new Promise((resolve, reject) => {
      fetch(`${url}/products`)
        .then((response) => {
          if (!response.ok) {
            return reject(response.status);
          } else {
            resolve(response.json());
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  // Add new product to the menu
  static addProduct(title, price, imageUrl) {
    return new Promise((resolve, reject) => {
      fetch(`${url}/product`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          price: price,
          imageUrl: imageUrl,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return reject(response.status);
          } else {
            resolve(response.json());
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  // Delete product from menu
  static deleteProduct(id) {
    return new Promise((resolve, reject) => {
      fetch(`${url}/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            return reject(response.status);
          } else {
            resolve(response);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
}

export default ApiClient;
