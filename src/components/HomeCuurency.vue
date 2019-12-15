<template>
    <div class="col s12 m6 l8">
        <div class="card green lighten-2 bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">Курс валют</span>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Валюта</th>
                        <th>Курс</th>
                        <th>Дата</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr v-for="cur of currencies" :key="cur">
                        <td>{{cur}}</td>
                        <td>{{rates[cur].toFixed(5)}}</td>
                        <td>{{date | date('date')}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeCuurency",
        props: ['date', 'rates'],
        data: () => ({
            currencies: ['RUB', 'USD', 'EUR']
        }),
    }
</script>

<style scoped>

</style>