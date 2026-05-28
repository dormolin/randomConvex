<script lang="ts">
    import * as fabric from 'fabric'
    import { RandomConvexOptions } from './RandomConvex.ts'
    import { confetti, snow, radar, rubberband, chemical } from './presetOptions.ts';
    import SideBarRight from './lib/SideBarRight.svelte'

    let {options = $bindable(), canvas, ...props}
        : {options: RandomConvexOptions,
            canvas?: fabric.Canvas
        } = $props();

    let width = $state(450);
    let height = $state(300);
    let bgColor = $state('#ffffff');

    const onSizeChange = (event: Event) => {
        if (canvas) {
            canvas.setDimensions({
                width: width, 
                height: height
            });
            canvas.requestRenderAll();
        }
    }

    const onBgColorChange = (event: Event) => {
        if (canvas) {
            canvas.backgroundColor = bgColor;
            canvas.requestRenderAll();
        }
    }

    const onPresetSelect = (event: Event & {currentTarget: HTMLSelectElement}) => {
        const value = event.currentTarget.value;
        switch (value) {
            case 'confetti':
                options = new RandomConvexOptions(confetti);
                break;
            case 'snow':
                options = new RandomConvexOptions(snow);
                bgColor = '#000000';
                if (!canvas) break;
                canvas.backgroundColor = bgColor;
                canvas.requestRenderAll();
                break;
            case 'radar':
                options = new RandomConvexOptions(radar);
                bgColor = '#002200';
                if (!canvas) break;
                canvas.backgroundColor = bgColor;
                canvas.requestRenderAll();
                break;
            case 'rubberband':
                options = new RandomConvexOptions(rubberband);
                break;
            case 'chemical':
                options = new RandomConvexOptions(chemical);
                break;
        }
    }
</script>


<!-- svelte-ignore binding_property_non_reactive -->
<SideBarRight>
    <form>
        <h3>option</h3>
        <details>
            <summary>Preset</summary>
            <select onchange={onPresetSelect}>
                <option value='' selected>N.A.</option>
                <option value='confetti'>confetti</option>
                <option value='snow'>snow</option>
                <option value='radar'>radar</option>
                <option value='rubberband'>rubber band</option>
                <option value='chemical'>chemical</option>
            </select>
        </details>
        <details>
            <summary>Canvas</summary>
            width:  <input type="number" name="canvasWidth"  min="0" max="4096" step="1" onchange={onSizeChange} bind:value={width}><br>
            height: <input type="number" name="canvasHeight" min="0" max="4096" step="1" onchange={onSizeChange} bind:value={height}><br>
            bg color:  <input type="color"  name="canvasColor"  onchange={onBgColorChange} bind:value={bgColor}><br>
        </details>
        <details>
            <summary>Shape</summary>
            editable: <input type="checkbox" name="shapesEditable" bind:checked={options.editable} /><br>
            number: <input type="number" name="number" bind:value={options.number} max="10000" min="0" step="1"><br>
            polygon corners: <input type="number" name="polygonCorners" bind:value={options.polygonCorners} max="100" min="3" step="1"><br>
            min size: <input type="number" name="minSize" bind:value={options.minSize} min="0" max="1000"><br>
            max size: <input type="number" name="maxSize" bind:value={options.maxSize} min="0" max="1000"><br>
            symmetry: <input type="checkbox" name="symmetry" bind:checked={options.symmetry}><br>
            width = height: <input type="checkbox" name="perfectCircle" bind:checked={options.perfectCircle}><br>
            random rotate: <input type="checkbox" name="randomRotate" bind:checked={options.randomRotate}><br>
        </details>
        <details>
            <summary>Fill</summary>
            color: <input type="color" name="fillColor" bind:value={options.fillColor}>
            transparent: <input type="checkbox" name="fillTransparent" bind:checked={options.fillTransparent}>
            randomize: <input type="checkbox" name="randomColor" bind:checked={options.randomColor}><br>
            gradation: <input type="checkbox" name="gradation" bind:checked={options.gradation}><br>
            opacity: <input type="range" name="opacity" min="0" max="100" bind:value={options.opacity}>
        </details>
        <details>
            <summary>Border</summary>
            color: <input type="color" name="borderColor" bind:value={options.borderColor}>
            randomize: <input type="checkbox" name="borderRandomColor" bind:checked={options.borderRandomColor}><br>
            width: <input type="number" name="borderWidth" bind:value={options.borderWidth} min="0" max="100">
        </details>
        <details>
            <summary>Shadow</summary>
            blur: <input type="number" name="shadowBlur" bind:value={options.shadowBlur} min="0" max="4096" step="1"><br>
            color: <input type="color" name="shadowColor" bind:value={options.shadowColor}>
            same as fill : <input type="checkbox" name="shadowColorSameAsFill" bind:checked={options.shadowColorSameAsFill}><br>
            offsetX: <input type="number" name="shadowOffsetX" bind:value={options.shadowOffsetX} min="-4096" max="4096"><br>
            offsetY: <input type="number" name="shadowOffsetY" bind:value={options.shadowOffsetY} min="-4096" max="4096">
        </details>
    </form>
</SideBarRight>


<style>
    @media (width < 600px) {
        details, h3 {
            font-size: 12pt;
        }
    }

    details {
        margin-bottom: 10px;
    }
</style>
