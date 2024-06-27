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

<div flex="~">
    <div class="outer h-50 grid items-center justify-center" style:width={wpx}>
        <div class="wrap max-w-full max-h-full"
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
    
    <div class="outer h-50 grid content-center justify-center" style:width={wpx}>
        <div class="wrap min-w-full min-h-full"
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

<h3>Flex</h3>

<div flex="~">
    <div class="outer h-50 flex items-center justify-center" style:width={wpx}>
        <h4>Fixed height:</h4>
        <div class="wrap max-w-full max-h-full"
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
    
    <div class="outer h-50 flex items-center content-center justify-center" style:width={wpx}>
        <h4>Cover:</h4>
        <div class="wrap min-w-full min-h-full"
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

<h3>Wrap</h3>

<div flex="~">
    <div class="outer h-50" style:width={wpx}>
        <h4>Fixed height:</h4>
        <div class="wrap max-w-full max-h-full m-auto"
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

    <div class="outer" style:width={wpx}>
        <h4>Max-height 64px</h4>
        <div class="h-full">
            <div class="wrap max-h-[64px] max-w-full m-auto"
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
    
    <div class="outer h-50" style:width={wpx}>
        <h4>absolute cover</h4>
        <div class="wrap min-w-full min-h-full"
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
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

<h3>More</h3>
<div>
    <div class="outer h-50 text-center" style:width={wpx}
        style="text-overflow: clip clip;"
    >
        <h4>inline-block</h4>
        <span style="margin-left: -100%"></span>
        <div class="wrap inline-block min-w-full min-h-full m-auto"
            style="vertical-align: middle;"
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
        <span style="margin-right: -100%"></span>
    </div>
    <div class="outer h-50" style:width={wpx}>
        <h4>Object:</h4>
        <object
            class="wrap w-full h-full m-auto"
            style="object-fit: cover"
            width="100%"
            height="100%"
        >
            <img
                class="w-full h-full"
                src="{src}"
                alt="im"
                width={width}
                height={height}
            />
        </object>
    </div>
</div>

<style lang="postcss">
h3 { 
    font-weight: bold;
}
h4 {
    position: absolute;
    top: 0; left: 0;
    color: white;
}
.outer {
    position: relative;
    overflow: hidden;
    resize: horizontal;
    background: red;
    padding: 2em;
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
    border: 4px solid green;
}
</style>

