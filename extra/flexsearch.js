
import {Index} from "flexsearch";
import charset from "./dist/module/lang/latin/advanced.js";
import lang from "./dist/module/lang/en.js";

    import {Index} from "flexsearch";

    var index = new Index({ ... });

To import the data just pass a key and data:

index.import(key, localStorage.getItem(key));

    const index = new Index(options);
    index.search(text, 10, {
        suggest: true
    });
    const idx = new Index("performance")
    {
         preset: "match",
    charset: "latin:extra",
    tokenize: "reverse",
    resolution: 9
}

        language = 'en'
        lang: lang,
    stemmer
index
        tokenizer = "full"
    encoder = "extra"

    Index.add(id, string) *
index.export(function(key, data){ 
    
    // you need to store both the key and the data!
    // e.g. use the key for the filename and save your data
    
    localStorage.setItem(key, data);
});
