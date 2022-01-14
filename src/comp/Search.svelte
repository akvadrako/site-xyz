
<style>
    input {
        width: 100%;
        height: 40px;
        font-size: 16px;
        padding: 0px 20px 0px 40px;
        margin-right: 10px;
        border-radius: 40px;
        outline: none;
        border: solid gray 2px;
        background: url('/sprites.svg#search') 7px center no-repeat;
        background-size: 1.5em;
    }
</style>

<script>
    import { goto, route } from '$lib'
    
    function onKeyPress(e) {
        if(e.charCode != 13)
            return

        console.log('search', e.target.value)
        goto($route('/search', { q: e.target.value }))
    }
</script>

<input type="search"
    on:keypress={onKeyPress}
    placeholder="search..." />
