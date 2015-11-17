<template>

	<div class="list-view">

		<ul>
			<li v-for="item in items | orderBy 'name' -1">
				<a v-link="{ name: 'post', params: { title: item.name } }">{{ item.name | cleanTitle }}</a>
			</li>
		</ul>

		<!-- <nav v-show="items.length > 0">
			<a v-if="page > 1" :href="'#/list/' + (page - 1)">上一页</a>
			<a v-if="page" :href="'#/list/' + (page + 1)">下一页</a>
		</nav> -->

	</div>

</template>

<script>

	import store from '../store';
	import { cleanTitle } from '../filters';

	export default {

		name: 'ListView',

		filters: {
			cleanTitle: cleanTitle
		},

		data () {
			return {
				items: [
					{ name: 'Loading..'}
				]
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