<script>
import { Photo } from '$comp';
</script>

<div class="hero">
    <div class="inner">
        <img class="mask dark:hidden" alt="mark" src="/media/hero-mask.svg" />
        <img class="mask light:hidden" alt="mask" src="/media/hero-mask-dark.svg" />
        <Photo src="/media/image_top.jpg"
            class="w-full h-full object-cover object-[50%_80%]"
        />
    </div>
</div>

<style lang="postcss">
.hero {
    --ratio: calc(3702 / 1121);
}

.mask {
    position: fixed;
    z-index: 20;
    top: 0;
    margin-top: 8rem;
    box-shadow: 0 0 0 400px var(--theme-bg);
}

.inner {
    margin-left: 2rem;
    margin-right: 2rem;
}

.inner, .mask {
    /*
     * disabled: fill screen width hero image without cropping
        _height: min(calc((100vw - 4rem) / var(--ratio)), calc(100vh - var(--nav-height)));
     */

    width: calc(100vw - 4rem);
    _height: calc((100vw - 4rem) / var(--ratio));
    aspect-ratio: var(--ratio);
    overflow: hidden;
}

.hero {
    overflow: clip;
    margin-top: 8rem;
    margin-bottom: 8rem;
    clip-path: margin-box;
    position: relative;
}

</style>
