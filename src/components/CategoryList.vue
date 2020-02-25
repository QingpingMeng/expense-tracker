<template>
    <v-container fluid class="category-list-layout fill-height">
        <div v-for="(item, index) in categories" :key="index">
            <v-btn x-large tile>
                  <v-icon large="true" x-large>home</v-icon>
                  <div>{{ item.name }}</div>
            </v-btn>
        </div>
    </v-container>
</template>

<style scoped>
.category-list-layout{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr))
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";
import { State } from 'vuex-class';
import Category from '../models/category';

@Component
export default class CategoryList extends Vue {
    @State('localCategories') private categories!: Array<Category>;
}
</script>