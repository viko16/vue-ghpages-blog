<template>

    <div class="list-view">

        <!-- loading -->
        <h2 v-if="!items.length">Loading...🐹</h2>

        <!-- loaded -->
        <ol v-if="items.length">
            <li v-for="item in items | orderBy 'name' -1" transition>
                <a v-link="{ name: 'post', params: { title: encodeURI(item.name) }}">
                    {{ item.name | onlyTitle }}
                </a>
                <span class="publish-date">{{ item.name | onlyPublishDate }}</span>
            </li>
        </ol>

    </div>

</template>

<script>

    import store from '../store';
    import { onlyTitle, onlyPublishDate } from '../filters';

    export default {

        name: 'ListView',

        filters: {
            onlyTitle,
            onlyPublishDate
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

<style lang="less">

    .list-view {
        li {
            margin-bottom: 1rem;

            a {
                font-size: 1.2rem;
            }
        }
    }

    @media(max-width: 600px) {
        .publish-date {
            display: none;
        }
    }

</style>