<template>
    <nav class="navbar grey darken-4">
        <div class="nav-wrapper">
            <div class="navbar-left">
                <a href="#" @click.prevent="$emit('click')"> <!--Передаем название собития клик наверх. То есть в MainLayout будем его слушать-->
                    <i class="material-icons white-text">dehaze</i>
                </a>
                <span class="white-text">{{date | date('datetime')}}</span>
            </div>

            <ul class="right hide-on-small-and-down">
                <li>
                    <a
                            class="dropdown-trigger white-text"
                            href="#"
                            data-target="dropdown"
                            ref="dropdown"
                    >
                        {{name}}
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>

                    <ul id='dropdown' class='dropdown-content'>
                        <li>
                            <router-link to="/profile" class="black-text">
                                <i class="material-icons">account_circle</i>Профиль
                            </router-link>
                        </li>
                        <li class="divider" tabindex="-1"></li>
                        <li>
                            <a href="#" class="black-text" @click.prevent="logout">
                                <i class="material-icons">assignment_return</i>Выйти
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Navbar.vue",
        data: () => ({
            date: new Date(),
            interval: null,
            dropdown: null
        }),
        computed: {
            name() {
                return this.$store.getters.info.name
            }
        },
        mounted() {//вызовится когда DOM дерево уж готово
            this.interval = setInterval(() => {
                this.date = new Date()
            }, 1000)
            this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
                constrainWidth: false
            })
        },
        beforeDestroy() { //чтобы избежать утечки памяти например при смене layout, нужно очищать setinterval и плагин от materialize, desftory произойдет, если поменять окмоненот, на Emptylayout
            clearInterval(this.interval)
            //в случае с dropdown может возникнуть проблема, если мы слишком быстро отркоем лэйаут и слишком быстро его тут же закроем, то плагин может не успеть инициализирроваться, поэтому сначала надо проверить если ли что то в свойстве dropdown
            if(this.dropdown && this.dropdown.destroy) {
                this.dropdown.destroy
            }
        },
        methods: {
            async logout() {
                await this.$store.dispatch('logout') //возвращает промис
                this.$router.push('/login?message=logout')
            }
        }
    }
</script>

<style scoped>

</style>