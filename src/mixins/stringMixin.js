export const stringMixin = {
    methods: {
        isEmptyString(string) {
            return string.replace(/\s/g, '').length === 0
        }
    }
}
