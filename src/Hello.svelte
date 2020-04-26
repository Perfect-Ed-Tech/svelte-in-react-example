<script>
  import { createEventDispatcher } from 'svelte';

  export let name;

	const dispatch = createEventDispatcher();
	function sayHello() {
    console.log('Svelte dispatching message');
		dispatch('message', {
			text: 'Hello from Svelte!'
		});
	}
</script>

<p>Hello {name} from Svelte</p>
<button on:click={sayHello}>Click me!</button>

<style>
  p {
    color: orange;
    font-size: 2rem;
    font-weight: 700;
  }

  button {
    padding: 1rem 2rem;
    background: transparent;
    border: 2px solid orange;
    border-radius: 5px;
    color: orange;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.8;
  }
</style>