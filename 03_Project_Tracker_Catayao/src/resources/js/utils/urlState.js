export function getUrlParam(key, options = {}) {
    if (typeof window === 'undefined') return null

    const value = new URLSearchParams(window.location.search).get(key)
    if (value === null) return null

    const { allowedValues } = options
    if (Array.isArray(allowedValues) && !allowedValues.includes(value)) {
        return null
    }

    return value
}

export function setUrlParams(values, defaults = {}) {
    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)

    Object.entries(values).forEach(([key, value]) => {
        const normalized = value == null ? '' : String(value)
        const isDefault = Object.prototype.hasOwnProperty.call(defaults, key) && defaults[key] === normalized
        const isEmpty = normalized.trim() === ''

        if (isDefault || isEmpty) {
            url.searchParams.delete(key)
            return
        }

        url.searchParams.set(key, normalized)
    })

    window.history.replaceState({}, '', url.toString())
}
