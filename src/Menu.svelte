<script lang="ts">
    import * as fabric from 'fabric';
    import { RandomConvex, RandomConvexOptions } from './RandomConvex';
    let { canvas, app, options, ...props }
        : { canvas?: fabric.Canvas, app?: RandomConvex, options?: RandomConvexOptions } = $props();
    let dlg: HTMLDialogElement;
    let clearDlg: HTMLDialogElement;
    let saveFormat: 'jpeg' | 'svg' = $state('jpeg');
    let saveQuality = $state(0.95);

    const onGenerate = (event: Event) => {
        if (!app) return;
        app.generateConvex(app.canvas, options?? new RandomConvexOptions());
    };

    const onClearDlgOpen = (event: Event) => clearDlg.showModal();

    const onClear = (event: Event) => {
        clearDlg.close();
        if (!canvas) return;
        const bg = canvas.backgroundColor;
        canvas.clear();
        canvas.backgroundColor = bg;
        canvas.requestRenderAll();
    };

    const onDelete = (event: Event) => {
        const tobeRemoved = canvas?.getActiveObjects();
        if (!tobeRemoved) return;
        canvas?.remove(...tobeRemoved);
        canvas?.discardActiveObject();
        canvas?.requestRenderAll();
    };

    const onSaveDlgOpen = (event: Event) => dlg.showModal();

    const onSave = (event: Event) => {
        if (!canvas) return;
        const a = document.createElement('a');
        switch (saveFormat) {
        case 'jpeg':
            a.href = canvas?.toDataURL({format:'jpeg', quality: saveQuality, multiplier: 1.0});
            a.download = 'randomConvexOutput.jpg';
            break;
        case 'svg':
            a.href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(canvas?.toSVG());
            a.download = 'randomConvexOutput.svg';
            break;
        }
        a.click();
        dlg.close();
    };

    const onCancelSave = (event: Event) => dlg.close();
</script>


<form class="RandomConvexInput">
    <button type="button" onclick={onGenerate}>generate</button>
    <button type="button" onclick={onClearDlgOpen}>clear</button>
    <button type="button" onclick={onDelete}>delete</button>
    <button type="button" onclick={onSaveDlgOpen}>save</button>
</form>
<dialog bind:this={dlg}>
    <label>
        jpeg <input type="radio" name="saveFormat" value="jpeg" checked bind:group={saveFormat}>
    </label>
    <label>
        svg <input type="radio" name="saveFormat" value="svg" bind:group={saveFormat}>
    </label>
    <br>
    {#if saveFormat==='jpeg'}
        Quality: <input type="range" min="0.7" max="1.0" step="0.01" bind:value={saveQuality} />{saveQuality}
    {/if}
    <hr>
    <button type="button" onclick={onCancelSave}>Cancel</button>
    <button type="button" onclick={onSave}>OK</button>
</dialog>
<dialog bind:this={clearDlg}>
    <p>Clear canvas?</p>
    <hr>
    <button type="button" onclick={() => clearDlg.close()}>Cancel</button>
    <button type="button" onclick={onClear}>OK</button>
</dialog>


<style>
    button {
        width: 110px;
        height: 42px;
        background-color: #555555;
        border-color: #777777;
        color: #ffeeee;
        border-width: 0px;
        border-radius: 4px;
        font-size: 16pt;
        margin: 10px;
    }
    label {
        font-size: 16pt;
    }
    @media (width < 600px) {
        button {
            font-size: 12pt;
            width: 80px;
            margin: 2px;
            height: 32px;
        }
        label {
            font-size: 12pt;
        }
    }
</style>
