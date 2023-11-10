<script>
  import { onDestroy, onMount } from "svelte";
  import GameCards from "../lib/game-cards.svelte";
  import {getgames} from '../lib/api/server';


  let response 
	async function apicall(){
		// let res = await fetch("/api")
		let res =  getgames() //no need for fetching as not using any endpoints 

		return await res
	}
	


	let games = { 
		currents:[],
		nexts:[]
	};
	onMount(()=>{
	 games = apicall();
	})
	onDestroy(()=>{
		games = { 
		currents:[],
		nexts:[]
	};
	})
</script>
<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE ( please don't ) -->

<div class="container h-full mx-auto flex justify-center items-center my-5">
	
		
	{#await games}
		<h1 class="text-5xl font-bold text-center">Loading...</h1>
	{:then games} 
		<div class="h-full  grid lg:grid-cols-3 gap-5 sm:grid-cols-2 grid-cols-1">
			{#each games.currents as game }
				<GameCards gameName={game.name} gameDesc={game.desc} gameIcon={game.img} gameLink={game.link}></GameCards>
			{/each}
			{#each games.nexts as game }
				<GameCards gameName={game.name} gameDesc={game.desc} gameIcon={game.img} gameLink={game.link} upcoming=true></GameCards>
			{/each}
		</div>
	{:catch error}
		<h1 class="text-5xl font-bold text-center">Sorry! Server Error, Please Retry...</h1>
	{/await}

	<!-- {#await games}
	<h1 class="text-5xl font-bold text-center">Loading...{games}</h1>
	{:then games}
	<h1 class="text-md font-bold text-center">Loaded {games}</h1>
	{:catch error}
	<h1 class="text-5xl font-bold text-center">Error...{error}</h1>
	{/await} -->
	
</div>
