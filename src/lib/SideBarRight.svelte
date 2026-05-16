<script lang="ts">
    let { children } = $props();
</script>


<div class="hideable Sidebar">
    <div>
        <label class="maxHeight SideBarShow">
            <input id="HideButton" type="checkbox" checked />
            <span class="CheckVisible">◀</span>
            <span class="CheckInvisible">▶</span>
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
        transition-timing-function: ease-out;
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

    .hideable:has(#HideButton:checked) {
        width: 30px;
        overflow-x: hidden;
    }

    input[type="checkbox"]:checked ~ .CheckInvisible {
        display: none;
    }

    input[type="checkbox"]:not(:checked) ~ .CheckVisible {
        display: none;
    }

    label > input {
        display: none;
    }

</style>
