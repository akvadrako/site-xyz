<script>
import { Photo } from '$comp';
</script>

<div class="hero">
    <div class="inner">
        <img class="mask dark:hidden" alt="mark" src="/media/hero-mask.svg" />
        <img class="mask light:hidden" alt="mask" src="/media/hero-mask-dark.svg" />
        <Photo
            src="/media/image_top.jpg"
            divcls="bg-cover bg-[position:50%_80%]"
            class="w-full h-full object-cover object-[50%_80%]"
        />
    </div>
</div>

<style lang="postcss">
.hero {
    --ratio: calc(3702 / 1121);
}

.hero, .mask {
    margin-top: calc(var(--nav-height) * 2);
    margin-bottom: var(--nav-height);
}

.mask {
    position: fixed;
    z-index: 20;
    top: 0;
    box-shadow: 0 0 0 400px var(--theme-bg);
}

.inner, .mask {
    /*
     * disabled: fill screen width hero image without cropping
        _height: min(calc((100vw - 4rem) / var(--ratio)), calc(100vh - var(--nav-height)));
        _height: calc((100vw - 4rem) / var(--ratio));
     */

    width: calc(100vw - 4rem);
    aspect-ratio: var(--ratio);
    overflow: hidden;
}

.hero {
    overflow: clip;
    clip-path: margin-box;
    position: relative;
}

</style>
