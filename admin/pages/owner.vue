<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>

        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2>Add a new Owner</h2>

          <form action="">
            <div class="a-spacing-top-medium">
              <label for="">Name</label>
              <input type="a-input-text" style="width: 100%" v-model="name" />
            </div>

            <div class="a-spacing-top-medium">
              <label for="">About</label>
              <input type="a-input-text" style="width: 100%" v-model="about" />
            </div>

            <div class="a-spacing-top-medium">
              <label for="">Photo URL</label>
              <input type="a-input-text" style="width: 100%" v-model="photo" />
            </div>

            <hr />
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onAddOwner"
                    >Add Owner</span
                  >
                </span>
              </span>
            </div>
          </form>

          <br />
          <ul class="list-group-item">
            <li v-for="owner in owners" :key="owner._id">
              {{ owner.name }}
            </li>
          </ul>
        </div>

        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3000/api/owners");

      return {
        owners: response.owners
      };
    } catch (err) {
      console.log(er);
    }
  },

  data() {
    return {
      name: "",
      about: "",
      photo: ""
    };
  },

  methods: {
    async onAddOwner() {
      try {
        let data = { name: this.name, about: this.about, photo: this.photo };
        let response = await this.$axios.$post(
          "http://localhost:3000/api/owners",
          data
        );

        this.owners.push(data);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
