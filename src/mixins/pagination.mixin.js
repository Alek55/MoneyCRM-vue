export default {
    data() {
        return {
            page: +this.$route.query.page || 1,
            pageSize: 5,
            pageCount: 0,
            allItems: [],
            items: []
        }
    },
    methods: {
        setupPagination(allItems) {
            this.allItems = this.chunk(allItems, this.pageSize)
            this.pageCount = Math.ceil(allItems.length / this.pageSize)
            this.items = this.allItems[this.page - 1] || this.allItems[0]
        },
        chunk(arr, count) {
            const res = []
            for(let i = 0; true; i += count) {
                let pr_arr = []
                for(let j = i; j < (i + count); j++) {
                    if(!arr[j]) break
                    pr_arr.push(arr[j])
                }
                res.push(pr_arr)
                if(!arr[i+count]) break
            }
            return res
        },
        pageChangeHandrler(page) {
            this.$router.push(`${this.$route.path}?page=${page}`)
            this.items = this.allItems[page - 1] || this.allItems[0]
        }
    }
}