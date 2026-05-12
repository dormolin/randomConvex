<script lang="ts">
    let hidden = $state(false);
    let { children } = $props();
</script>


<div class="hideable Sidebar {hidden ? 'hidden' : ''}">
    <div>
        <label class="maxHeight SideBarShow">
            {hidden ? '◀' : '▶'}
            <input type="checkbox" bind:checked={hidden} />
        </label>
    </div>
    <div>
        {@render children?.()}
    </div>
</div>


<style>
    .Sidebar {
        background-color: #444444;
        color: #ffffff;
        padding: 4px;
        overflow: auto;
        width: 300px;
        transition-property: width;
        transition-duration: 0.4s;
    }

    .SideBarShow {
        width: 25px;
        display: flex;
        align-items: center;
        background-color: #666666;
    }

    .maxHeight {
        height: 100%;
    }

    .hideable {
        display: flex;
        flex-direction: row;
    }

    .hidden {
        width: 30px;
    }

    label > input {
        display: none;
    }
</style>
