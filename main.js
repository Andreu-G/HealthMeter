const { createApp } = Vue

createApp({
  data() {
    return {
      gender: true,
      bmi: 0,
      fat: 0,
      muscle: 0,
      water: 0,
      lbm: 0
    }
  },
  methods: {
    CalculateEverything() {

      this.SaveLocalStorage();
      if (this.$refs.age.value >= 1 && this.$refs.weight.value >= 1 && this.$refs.height.value >= 1)
      {
        this.bmi = this.CalculateBMI();
        this.water = this.CalculateWaterPercentage();
        this.lbm = this.CalculateLBM();
        this.fat = this.CalculateFat();
        this.muscle = this.CalculateMuscle();
      }
    },

    SetGender() {

      this.gender = !this.gender;
      this.CalculateEverything();

    },

    CalculateBMI() {
      return Math.round((this.$refs.weight.value / Math.pow(this.$refs.height.value, 2)) * 10) / 10;
    },

    CalculateWaterPercentage() {
      if (this.gender)
      {
        return Math.round((2.447 - 0.09156 * this.$refs.age.value + 0.1074 * (this.$refs.height.value * 100) + 0.3362 * this.$refs.weight.value) * 10) / 10;
      } else {
        return Math.round((-2.097 + 0.1069 * this.$refs.height.value + 0.2466 * this.$refs.weight.value) * 10) / 10;
      }
    },

    CalculateLBM() {
      if (this.gender)
      {
        return Math.round((0.407 * this.$refs.weight.value + 0.267 * (this.$refs.height.value * 100) - 19.2) * 10) / 10;
      } else {
        return Math.round((0.252 * this.$refs.weight.value + 0.473 * (this.$refs.height.value * 100) - 48.3) * 10) / 10;
      }
    },

    CalculateFat() {
      if (this.gender)
      {
        return Math.round((this.$refs.weight.value * 0.241) * 10) / 10;
        } else {
        return Math.round((this.$refs.weight.value * 0.209) * 10) / 10;
      }
    },

    CalculateMuscle()
    {
      return Math.round((this.$refs.weight.value - (this.fat / 100)) * 10) / 10;
    },
    SaveLocalStorage() {

      let localData = {
        gender: this.$refs.gender.value,
        age: this.$refs.age.value,
        weight: this.$refs.weight.value,
        height: this.$refs.height.value
      }
      localStorage.setItem('userData', JSON.stringify(localData)); 
    }

  }
}).mount('#app');