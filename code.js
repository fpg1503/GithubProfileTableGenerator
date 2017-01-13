
window.onload = function() {
    function line(ids) {
        first = "|" + ids.map(id => " ![](https://github.com/" + id + ".png?size=117) |").join("")
        second = "|" + ids.map(id => " --- |").join("")
        third = "|" + ids.map(id => "[" + id + "](https://github.com/" + id + ") |").join("")

        return first + "\n" + second + "\n" + third
    }

    function table(input) {
        ids = input.split(",").map(id =>
            id.trim()
        )

        size = 6
        lines = ids.map((e, i) =>
            i % size === 0 ? ids.slice(i, i + size) : null
        ).filter(e => e)

        return lines.map(line).join("\n\n")
    }

    function copyToClipboard(textArea) {
        textArea.select()

        try {
            var successful = document.execCommand('copy')
            var message = "Code " + successful ? 'copied successfully!' : 'couldn\'t be copied :('
            document.getElementsByTagName("button")[0].title = "Message"
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }

    new Vue({
        el: '#ids',
        data: {
            input: 'fpg1503'
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
