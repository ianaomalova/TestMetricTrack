export const formatForSelect = (options: string[]) => {
  return options.map(option => {
    return {
      value: option,
      label: option.charAt(0).toUpperCase() + option.slice(1),
    }
  })
}
