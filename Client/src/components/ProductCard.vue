<template>
  <section class="main">
    <form class="mb-3">
      <div class="header-info container">
        <label class="header-info__title">Название</label>
        <input
          class="header-info__value"
          autofocus
          autocomplete="off"
          placeholder="Введите название блюда"
          type="text"
          v-model="newTitle"
        />
      </div>
      <div class="header-info container">
        <label class="header-info__title">Цена</label>
        <input
          class="header-info__value"
          autofocus
          autocomplete="off"
          placeholder="Введите цену"
          type="number"
          v-model="newPrice"
        />
      </div>
      <div class="header-info container">
        <label class="header-info__title">Фото</label>
        <input
          class="header-info__value"
          autofocus
          autocomplete="off"
          placeholder="Введите ссылку"
          type="text"
          v-model="newImageUrl"
        />
      </div>
      <button
        class="header-info-btn"
        type="button"
        @click="addProduct(newTitle, newPrice, newImageUrl)"
      >
        Добавить
      </button>
    </form>

    <div class="restaurant-menu" v-if="products.length > 0" v-cloak>
      <ul class="menu-group">
        <li class="product-list" v-for="product in products" :key="product._id">
          <label class="zxc">
            {{ product.title }}<br />
            Цена: {{ product.price }} ₴
            <a href="#"
              ><img class="card-img-top" :src="product.imageUrl" alt=""
            /></a>
          </label>
          <button
            class="list-btn"
            type="button"
            @click="deleteProduct(product._id, $event.target)"
          >
            <span aria-hidden="true">Удалить</span>
          </button>
        </li>
      </ul>
    </div>
    <p v-else class="footer-text">Меню пустое</p>
  </section>
</template>

<script>
import ApiClient from "../ApiClient";

export default {
  name: "Product",
  data() {
    return {
      products: [],
      newTitle: "",
      newPrice: null,
      newImageUrl: "",
    };
  },
  methods: {
    // Retrieve tasks from API and save in products array
    retrieveProducts: async function () {
      await ApiClient.retrieveProducts()
        .then((thisProduct) => {
          this.products = thisProduct;
        })
        .catch((err) => this.$toastr.e(`An error occurred : ${err}`));
    },
    // Add product to products
    addProduct: async function (title, price, imageUrl) {
      if (!/\S/.test(title) || !/\S/.test(imageUrl)) return;
      await ApiClient.addProduct(title, price, imageUrl)
        .then(() => {
          this.newTitle = ""; // Clear input field
          this.newPrice = null;
          this.newImageUrl = "";
          this.retrieveProducts(); // Reload the array
        })
        .catch((err) => this.$toastr.e(`An error occurred : ${err}`));
    },
    // Delete product from products
    deleteProduct: async function (id, el = null) {
      if (el) el.parentElement.disabled = true; // Disable button after click to prevent 404 error
      await ApiClient.deleteProduct(id)
        .then(() => {
          this.retrieveProducts(); // Reload the array
        })
        .catch((err) => this.$toastr.e(`An error occurred : ${err}`));
    },
  },
  // Retrieve tasks when the page is loaded
  async beforeMount() {
    await this.retrieveProducts();
  },
  // Custom directive to focus on input field when the DOM is updated
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>
