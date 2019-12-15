<template>
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <Loader v-if="loading" />
        <p v-else-if="!records.length" class="center">Записей нет. <router-link to="/records">Добавить новую запись</router-link></p>
        <div class="history-chart" v-else>
            <canvas ref="canvas"></canvas>
        </div>

        <section>
            <HistoryTable :records="items" />
            <Paginate
                    v-model="page"
                    :page-count="pageCount"
                    :click-handler="pageChangeHandrler"
                    :prev-text="'Назад'"
                    :next-text="'Вперед'"
                    :container-class="'pagination'"
                    :page-class="'green lighten-3'"
            />
        </section>
    </div>
</template>

<script>
    import paginationMixin from '../mixins/pagination.mixin'
    import HistoryTable from "../components/HistoryTable";
    import {Pie} from 'vue-chartjs'

    export default {
        name: "History",
        extend: Pie,
        mixins: [paginationMixin],
        data: () => ({
            loading: true,
            records: []
        }),
        async mounted() {
            this.records = await this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')

            this.setUp(categories)
            this.loading = false
        },
        components: {
            HistoryTable
        },
        methods: {
            setUp(categories) {
                this.setupPagination(this.records.map(record => {
                    return {
                        ...record,
                        categoryName: categories.find(c => c.id === record.categoryId).title,
                        typeClass: record.type === 'income' ? 'green lighten-2' : 'deep-orange accent-4',
                        typeText: record.type === 'income' ? 'Доход' : 'Расход'
                    }
                }))

                // this.renderChart({
                //     labels: categories.map(c => c.title),
                //     datasets: [{
                //         label: 'Расходы по категориям',
                //         data: categories.map(c => {
                //             return this.records.reduce((total, r) => {
                //                 if(r.categoryId === c.id && r.type === 'outcome') total += +r.amount
                //                 return total
                //             }, 0)
                //         }),
                //         backgroundColor: [
                //             'rgba(164,65,225, 0.2)',
                //             'rgba(164,65,225, 0.2)',
                //             'rgba(164,65,225, 0.2)',
                //             'rgba(164,65,225, 0.2)',
                //         ]
                //     }]
                // })
            }
        }
    }
</script>

<style>
    .pagination a{
        outline: none;
    }
</style>