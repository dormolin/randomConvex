<script lang="ts">
    import * as fabric from 'fabric'
    import Menu from './Menu.svelte'
    import ShapeControls from './ShapeControls.svelte'
    import { onMount } from 'svelte';
    import { RandomConvex, RandomConvexOptions } from './RandomConvex';

    let app = $state<RandomConvex>();
    let canvas = $state<fabric.Canvas>();
    let canvasEl: HTMLCanvasElement;
    let options: RandomConvexOptions = $state(new RandomConvexOptions());

    onMount(() => {
        app = new RandomConvex(canvasEl);
        canvas = app.canvas;
    });
</script>

<h1>Random Convex Generator</h1>
<div class="MainMenuContainer">
    <Menu canvas={canvas} app={app} options={options}></Menu>
    <div class="MainSubContainer">
    <div class="CanvasContainer">
        <div class="CanvasMargin">
            <canvas id="MainCanvas" bind:this={canvasEl} width="450" height="300"></canvas>
        </div>
    </div>
        <ShapeControls bind:options={options} canvas={canvas}></ShapeControls>
    </div>
</div>


<style>
    h1 {
        margin: 4px;
    }

    @media (width < 600px) {
        h1 {
            font-size: 12pt;
        }
    }

    #MainCanvas {
        border-style: solid;
        border-color: #cccccc;
        border-width: 1px;
        background-color: #ffffff;
    }

    .MainSubContainer {
        border-style: solid;
        border-width: 1px;
        border-radius: 8px;
        padding: 8px;
        display: grid;
        grid-template-columns: 1fr auto;
    }

    .CanvasContainer {
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .CanvasMargin {
        padding: 50px;
        width: fit-content;
        background-color: #333333;
    }

    .MainMenuContainer {
        display: grid;
        grid-template-rows: auto 1fr;
        height: calc(95dvh - 40px);
    }
</style>
