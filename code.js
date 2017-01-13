
window.onload = function() {
    function line(ids) {
        var first   = ids.reduce((rest, id) => rest + " ![](https://github.com/" + id + ".png?size=117) |", "|")
        var second  = ids.reduce((rest, id) => rest + " --- |", "|")
        var third   = ids.reduce((rest, id) => rest + "[" + id + "](https://github.com/" + id + ") |", "|")

        return [first, second, third].reduce((accumulator, line) => accumulator + line + "\n", "")
    }

    function table(input) {
        var ids = input.split(",").map(id =>
            id.trim()
        )

        var size = 6
        var lines = ids.map((e, i) =>
            i % size === 0 ? ids.slice(i, i + size) : null
        ).filter(e => e)

        return lines.map(line).join("\n\n")
    }

    function copyToClipboard(textArea) {
        textArea.select()

        try {
            var successful = document.execCommand('copy')
            var message = successful ? 'copied successfully!' : 'couldn\'t be copied :('
            console.log("Code " + message)
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }

    new Vue({
        el: '#ids',
        data: {
            input: 'fpg1503, CocoaHeadsBrasil'
        },
        computed: {
            markdown: function() {
                return table(this.input)
            },
            compiledMarkdown: function() {
                tabled = table(this.input)
                return marked(tabled, {
                    sanitize: true
                })
            }
        },
        methods: {
            update: _.debounce(function(e) {
                this.input = e.target.value
            }, 300),
            copy: function(e) {
                copyToClipboard(document.querySelector('#markdown'))
            }
        }
    })

}
