<script>
import { onMount } from 'svelte'
import axios from 'axios'

$: posts = []
let busy = false
const limit = 10
let infinite = null

const loadMore = () => {
	if (!busy) {
		busy = true
		axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
			const append = response.data.slice(
				posts.length,
				posts.length + limit
			).map((el) => {
				return { ...el, description: el.body }
			})
			posts = posts.concat(append)
			busy = false
			console.log("Adding 10 more data results")
		})
	}
}

const onScroll = () => {
	const scrolled = document.documentElement.offsetHeight
	+ infinite.offsetHeight
	const scrollBottom = document.documentElement.scrollTop + document.documentElement.offsetHeight
	console.log('onScroll: ',
		scrollBottom,
		scrolled
	) // eslint-disable-line scrolled
  let bottomOfWindow = scrollBottom > infinite.offsetHeight
	bottomOfWindow ? loadMore(): ''
}

onMount(() => {
	loadMore()
})

</script>

<style>
.card-shadow {
	box-shadow: 1px 3px 5px 1px #CBD5DF
}
.infinite-scroll {
  font-family: Daniela;
}
</style>

<svelte:window
	on:scroll={onScroll} />

<div class="infinite-scroll p-8"
		 bind:this={infinite}>
	{#each posts as post}
		<div class="card-shadow mb-4 transition">
			<header class="text-xl font-bold p-4 border-b border-solid border-grey-dark">
				<p class="">
					{post.title}
				</p>
			</header>
			<div class="p-4">
				<div class="">
					<p>{post.description}</p>
				</div>
			</div>
		</div>
	{/each}
</div>