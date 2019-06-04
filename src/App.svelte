<script>
import '../assets/css/tailwind.css'
import InfiniteScroller from './atoms/InfiniteScroller.svelte'

export let name;
</script>

<style lang="sass">
h1 {
  font-family: ShortStack;
}
</style>

<div class="bg-grey-lightest p-4 gra-br-red">
  <h1 class="px-8">CSGT</h1>
  <InfiniteScroller></InfiniteScroller>
</div>