<template>
  <div id="app">
    <section class="restaurantMenu">
      <Header />
      <ProductCard />
    </section>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import ProductCard from "./components/ProductCard.vue";

export default {
  name: "App",
  components: {
    Header,
    ProductCard,
  },
};
</script>
