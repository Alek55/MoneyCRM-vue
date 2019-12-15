<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <Loader v-if="loading" />
            <div class="row" v-else>
                <CategoryCreate @created="addNewCategory" />
                <CategoryEdit
                        v-if="categories.length"
                        :categories="categories"
                        @updated="updateCategories"
                        :key="categories.length + updateCount"
                />
                <p class="center" v-else>Нет ни одной категории для редактирования</p>
            </div>
        </section>
    </div>
</template>

<script>
    import CategoryCreate from '@/components/CategoryCreate'
    import CategoryEdit from '@/components/CategoryEdit'
    export default {
        name: "Categories",
        components: {
            CategoryCreate, CategoryEdit
        },
        data: () => ({
            categories: [],
            loading: true,
            updateCount: 0
        }),
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories')
            this.loading = false
        },
        methods: {
            addNewCategory(category) {
                this.categories.push(category) //после добавления новой категории изменится длина массив и обнвоится весь окмпонент edit благодаря :key
            },
            updateCategories(category) {
                const idx = this.categories.findIndex(c => c.id === category.id)
                this.categories[idx].title = category.title
                this.categories[idx].limit = category.limit
                this.updateCount++ //после увеличения счетчика обнвоится весь окмпонент edit благодаря :key. Так как ключ изменяется, vue вынужден перерисовывать компонент
            }
        }
    }
</script>

<style scoped>

</style>