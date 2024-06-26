<script>
let src = "https://walltowall.nl/.netlify/images?url=/media/mix_medium4_1920x1920.jpg&w=800"
let width = 1260
let height = 1736

$: ratio = width && height ? width / height : "auto"

let wpx = "128px"

</script>

<h2>Demo page w={wpx}
    <button on:click={() => { wpx="32px" }}>32</button>
    <button on:click={() => { wpx="64px" }}>64</button>
    <button on:click={() => { wpx="128px" }}>128</button>
    <button on:click={() => { wpx="256px" }}>256</button>
</h2>

<p>
    I want the image and background to fill the available space
    and be right-justified.
</p>

<h3>Grid</h3>

<div class="outer h-32 grid items-center justify-center" style:width={wpx}>
    <div class="wrap max-w-full max-h-full"
        style:background-image="url({src})"
        style:aspect-ratio={ratio}
    >
        <img
            class="w-full h-full"
            src="{src}"
            alt="im"
            width={width}
            height={height}
        />
    </div>
</div>

<h3>Flex</h3>

<p>Fixed height:</p>
<div class="outer h-32 flex items-center justify-center" style:width={wpx}>
    <div class="wrap max-w-full max-h-full"
        style:background-image="url({src})"
        style:aspect-ratio={ratio}
    >
        <img
            class="w-full h-full"
            src="{src}"
            alt="im"
            width={width}
            height={height}
        />
    </div>
</div>

<h3>Wrap</h3>

<p>Fixed height:</p>
<div class="outer h-32" style:width={wpx}>
    <div class="wrap max-w-full max-h-full m-auto"
        style:background-image="url({src})"
        style:aspect-ratio={ratio}
    >
        <img
            class="w-full h-full"
            src="{src}"
            alt="im"
            width={width}
            height={height}
        />
    </div>
</div>

<p>Max-height 64px</p>
<div class="outer" style:width={wpx}>
    <div class="h-full">
        <div class="wrap max-h-[64px] max-w-full m-auto"
            style:background-image="url({src})"
            style:aspect-ratio={ratio}
        >
            <img
                class="w-full h-full"
                src="{src}"
                alt="im"
                width={width}
                height={height}
            />
        </div>
    </div>
</div>

<style lang="postcss">
h3 { 
    font-weight: bold;
}
.outer {
    overflow: hidden;
    resize: horizontal;
    background: red;
    padding: 1em;
    border: thin solid black;
    margin: 1em;
}
img {
    display: block;
    opacity: 75%;
    background: black;
}
.wrap {
    opacity: 75%;
    background: green;
    _position: relative;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
</style>

