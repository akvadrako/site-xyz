<script>
import { Photo } from '$comp';
</script>

<div id="backdrop">
    <div id="wrap">
        <Photo src="/media/image_top.jpg" sizes="100vw" />
        <div id="mask">
            <div />
            <img alt="mask" src="/media/hero-mask.svg" height="100%" width="100%" />
        </div>
    </div>
</div>

<style type="postcss">
#mask {
    position: fixed;
    z-index: 20;
    top: 0;
    width: 100%;
}

#mask img {
    display: block;
    height: max(50vh, min(calc(100vw / 3707 * 1980), calc(100vh - var(--nav-height))));
    object-fit: fill;
    object-position: 50% 50%;
}

#mask div {
    height: var(--nav-height);
    background: inherit;
}

#backdrop {
    margin-top: var(--nav-height);
    width: 100%;
    height: max(50vh, min(calc(100vw / 3707 * 1980), calc(100vh - var(--nav-height))));
    overflow: clip;
    clip-path: inset(0 0 0 0);
    position: relative;
}

#wrap {
    position: absolute;
    bottom: 0;
    height: 100%;
    display: flex;

    :global(.photo) {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: 40% bottom;
    }
}

</style>
