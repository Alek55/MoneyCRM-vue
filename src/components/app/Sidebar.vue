<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">
<!--        Чтобы не было ошибки, нужно создать динамический параметр key, чтобы vue смог итерировать корректно этот массив-->
<!--        У страниц счет в качестве ссылки является слеш(/), а например на странице /categoreis, в состав тоже входит слеш, поэтому страница счет и страница категории будут подсвечиваться активным. Чтобы это избежать, используется exact-->
        <router-link
                v-for="link in links"
                :key="link.url"
                tag="li"
                active-class="active"
                :to="link.to"
                :exact="link.exact">
            <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
        </router-link>
    </ul>
</template>

<script>
    import localizeFilter from "../../filters/localize.filter";

    export default {
        props: ['value'], //value будет соответствовать состоянию isOpen, который мы передали из родительского компонента через v-model
        name: "Sidebar",
        data: () => ({ //через такие круглые скобки мы возвращаем объект
            links: [
                {title: localizeFilter('Bill'), to: '/', exact: true},
                {title: localizeFilter('History'), to: '/history'},
                {title: localizeFilter('Planning'), to: '/planning'},
                {title: localizeFilter('New_record'), to: '/record'},
                {title: localizeFilter('Categories'), to: '/categories'},
            ]
        })
    }
</script>

<style scoped>

</style>