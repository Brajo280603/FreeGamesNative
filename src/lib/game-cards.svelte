<script>
    export let gameLink = "";
    export let gameName = "";
    export let gameIcon = "";
    export let gameDesc = "";
    export let upcoming = false;

    import {NoirLight, filter} from '@skeletonlabs/skeleton'
  </script>
  
  <a class="flex relative card card-hover  w-72 sm:h-auto flex-col items-center  antialiased pb-5 overflow-hidden" href="https://store.epicgames.com/en-US/p/{gameLink}" target="_blank">
    {#if upcoming}
      <div class="upcomingDiv p-2 absolute variant-glass-primary text-white   w-full">
        <h1 class="text-center text-lg">Next Game</h1>
      </div>
    {/if}
    <div class="gameIcon  ">
          <img class="sm:h-auto h-full w-full " src="{gameIcon}" alt="" >
      
    </div>
    <div class="flex flex-col mt-3 items-center h-1/4 justify-between">
      <div class="gameName text-lg font-bold">
        <p>{gameName}</p>
      </div>
      <div class="gameDesc px-2 text-xs text-center">
        <p>{gameDesc == null?"...":gameDesc}</p>
      </div>
    </div>
  </a>