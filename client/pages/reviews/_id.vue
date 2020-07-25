<template>
  <!--MAIN-->
  <main>
    <!--REVIEW ADDRESS-->
    <div class="reviewPage mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
            <div class="a-spacing-top-medium">
              <h1 class="a-spacing-base">
                <b>Create Review</b>
              </h1>
              <div class="row">
                <!-- Product Photo -->
                <div class="col-md-2 col-sm-3 col-3">
                  <img :src="product.photo" style="width: 80px" />
                </div>
                <!-- Product Title -->
                <div class="col-md-10 col-sm-9 col-9 m-auto">
                  <h4>
                    <b>{{ product.title }}</b>
                  </h4>
                </div>
              </div>
              <div class="a-spacing-top-medium"></div>
              <hr />
              <h2 class="a-spacing-base">Overall Rating</h2>
              <div class="a-row">
                <!-- Rating -->
                <no-ssr>
                  <star-rating v-model="rating"></star-rating>
                </no-ssr>
              </div>
              <div class="a-row a-spacing-top-large">
                <h2>Add photo or video</h2>
                <p style="font-size: 14px; font-weight: 700;">
                  Shoppers find images and videos more helpful than text alone.
                </p>
              </div>
              <div class="headline a-spacing-large">
                <h2 class="a-spacing-base">Add a photo or video link</h2>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 70%;"
                  placeholder="Link to a photo or a video"
                  v-model="photo"
                />
              </div>
              <div class="a-spacing-top-large"></div>
              <hr />
              <!-- Headline -->
              <div class="headline a-spacing-large">
                <h2 class="a-spacing-base">Add a headline</h2>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 70%;"
                  placeholder="What's most important to know?"
                  v-model="headline"
                />
              </div>
              <!-- Body -->
              <div class="a-spacing-base">
                <h2 class="a-spacing-base">Write your review</h2>
                <textarea
                  placeholder="What do you like or dislike? What did you see this product for?"
                  style="height:6em; width: 100%;"
                  v-model="body"
                ></textarea>
              </div>
            </div>
            <br />
            <br />
            <hr />
            <div class="a-spacing-top-medium">
              <p style="font-size: 14px; font-weight: 700;">
                This is how you'll appear to other customers:
              </p>
              <div class="media a-spacing-top-large">
                <div class="media-left">
                  <img
                    src="/img/avatar.png"
                    class="img-fluid"
                    style="width: 50px;"
                  />
                </div>
                <div class="media-body pl-3 pt-2">
                  <input
                    type="text"
                    class="a-input-text"
                    style="width: 100%;"
                    :value="$auth.$state.user.name"
                  />
                </div>
              </div>
            </div>
            <div class="a-row a-spacing-top-medium">
              <span class="a-color-tertiary"
                >Don't worry, you can always change this on your profile</span
              >
            </div>
            <div class="a-row text-right a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span @click="onAddReview" class="a-button-text">Submit</span>
                </span>
              </span>
            </div>
          </div>
          <div class="col-sm-2"></div>
        </div>
        <div class="a-spacing-large pb-5"></div>
        <hr />
      </div>
    </div>
    <!--/REVIEW ADDRESS-->
  </main>
  <!--/MAIN-->
</template>
<script>
import StarRating from "vue-star-rating";
export default {
  components: {
    StarRating
  },

  async asyncData({ $axios, params }) {
    try {
      let response = await $axios.$get(`/api/products/${params.id}`);

      return {
        product: response.product
      };
    } catch (err) {
      console.log(err);
    }
  },

  data() {
    return {
      rating: 0,
      body: "",
      headline: "",
      photo: ""
    };
  },

  methods: {
    async onAddReview() {
      try {
        let data = {
          rating: this.rating,
          body: this.body,
          headline: this.headline,
          photo: this.photo
        };

        console.log(this.$route.params.id);

        let response = await this.$axios.$post(
          `http://localhost:3000/api/reviews/${this.$route.params.id}`,
          data
        );

        console.log(response);

        if (response.success) {
          this.$router.push(`/products/${this.$route.params.id}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
