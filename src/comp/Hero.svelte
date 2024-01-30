<script>
import { Photo } from '$comp';
</script>

<div class="hero">
    <div class="inner">
        <img class="mask" alt="mask" src="/media/hero-mask.svg" />
        <Photo src="/media/image_top.jpg" />
    </div>
</div>

<style type="postcss">
.hero {
    --ratio: calc(3707 / 1980);
}

.mask {
    position: fixed;
    z-index: 20;
    top: 0;
    margin-top: var(--nav-height);
    box-shadow: 0 0 0 400px var(--theme-bg);
}

.inner {
    margin: auto;
}

.inner, .mask {
    /* fill screen with hero image without cropping */
    height: min(calc((100vw - 4rem) / var(--ratio)), calc(100vh - var(--nav-height)));
    aspect-ratio: var(--ratio);
}

.hero {
    overflow: clip;
    margin-top: var(--nav-height);
    clip-path: margin-box;
    position: relative;
}

</style>
