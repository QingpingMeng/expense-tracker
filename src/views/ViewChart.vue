<template>
  <v-container>
    <v-row>
      <v-col cols="12" style="padding-top:0">
       <expense-trend></expense-trend>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import ExpenseTrend from '../components/Charts/ExpenseTrend.vue'
@Component({
  components: {
    ExpenseTrend
  }
})
export default class ViewChart extends Vue {
}
</script>