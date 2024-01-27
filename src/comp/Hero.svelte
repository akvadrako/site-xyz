<script>
import { Photo } from '$comp';
</script>

<div id="backdrop">
    <div id="wrap">
        <Photo src="/media/image_top.jpg" sizes="100vw" />
        <div id="mask">
            <img alt="mask" src="/media/hero-mask.svg" height="100%" width="100%" />
            <div />
        </div>
    </div>
</div>

<style type="postcss">
#mask {
    position: fixed;
    z-index: 20;
    _opacity: 50%;
    top: var(--nav-height);
    width: 100%;
    overflow: clip;
    height: max(50vh, min(calc(100vw / 3707 * 1980), calc(100vh - var(--nav-height))));
}

#mask img {
    height: 100%;
    width: 100%;
    object-fit: fill;
    object-position: 50% 50%;
}

#mask div {
    height: 20em;
    background: red;
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
