<script lang="ts">
    import * as fabric from 'fabric'
    import { onMount } from 'svelte'
    let { canvas, ...props } : { canvas?: fabric.Canvas } = $props()
    let zoomInput = $state(1.0)
    let zoom = $derived(zoomInput ** 0.75)
    let defWidth = $derived(canvas?.getWidth())
    let defHeight = $derived(canvas?.getHeight())

    $effect(() => {
        if (!canvas) return;
        if (canvas.getZoom() === 1) {
            defWidth = canvas.getWidth()
            defHeight = canvas.getHeight()
        }
        canvas.setZoom(zoom)
        canvas.setDimensions({
            width: defWidth ? defWidth * zoom : canvas.getWidth(),
            height: defHeight ? defHeight * zoom : canvas.getHeight()
        })
        canvas.requestRenderAll()
        adjustScroll(canvas)
    })

    const adjustScroll = (canvas: fabric.Canvas) => {
        const parent = canvas.getElement().parentElement.parentElement.parentElement;
        if (parent) {
            const clientCenter = new fabric.Point(
                parent.clientWidth / 2, 
                parent.clientHeight / 2
            )
            const activeObject = canvas?.getActiveObject()
            if (activeObject) {
                const objectCenter = new fabric.Point(
                    activeObject.getCenterPoint().x * zoom,
                    activeObject.getCenterPoint().y * zoom
                )
                const offset = [objectCenter.x - clientCenter.x, objectCenter.y - clientCenter.y]
                parent.scrollLeft = offset[0]?? 0
                parent.scrollTop = offset[1]?? 0
            }
        }
    }

    const resetZoom = (e: Event) => {
        zoomInput = 1.0;
        canvas?.absolutePan(new fabric.Point(0, 0));
    }

    onMount(() => {
        defWidth = canvas?.width
        defHeight = canvas?.height
    })
</script>


<div class="zoom">
    <label>
        zoom
        <input type="range" min="0.5" max="4.0" step="0.1" bind:value={zoomInput} />
        {zoom.toPrecision(2)}
    </label>
    <button type="button" title="reset zoom" onclick={resetZoom}>
        reset
    </button>
</div>


<style>
    .zoom {
        margin: 10px;
    }

    input[type="range"] {
        width: 200px;
    }

    button {
        border-radius: 4px;
        border: none;
        background-color: #555555;
        border-color: #777777;
        color: #ffeeee;
        font-size: 14pt;
    }
</style>