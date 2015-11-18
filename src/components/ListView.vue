<template>

    <div class="list-view">

        <!-- loading -->
        <h2 v-if="!items.length">Loading...🐹</h2>

        <!-- loaded -->
        <ul v-if="items.length">
            <li v-for="item in items | orderBy 'name' -1" transition>
                <a v-link="{ name: 'post', params: { title: encodeURI(item.name) }}">
                    {{ item.name | cleanTitle }}
                </a>
            </li>
        </ul>

    </div>

</template>

<script>

    import store from '../store';
    import { cleanTitle } from '../filters';

    export default {

        name: 'ListView',

        filters: {
            cleanTitle
        },

        data () {
            return {
                items: []
            }
        },

        route: {
            data ({ to }) {
                const page = to.params.page;
                document.title = to.setting.blogTitle;

                return {
                    items: store.getListByPage(page).then(items => items)
                };
            }
        }

    }

</script>