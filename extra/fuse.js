
        idx = new Fuse(data.routes, {
            //keys: data.keys,
            includeScore: true,
            includeMatches: true,
        }, Fuse.parseIndex(data.index))
