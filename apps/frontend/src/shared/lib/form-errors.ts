interface Issue {
  path: ReadonlyArray<PropertyKey>
  message: string
}

export const issuesToFieldErrors = <K extends string = string>(
  issues: ReadonlyArray<Issue>,
): Partial<Record<K, string>> => {
  const errors: Partial<Record<K, string>> = {}

  for (const issue of issues) {
    const field = issue.path[0]
    if (typeof field === 'string' && !(field in errors)) {
      errors[field as K] = issue.message
    }
  }

  return errors
}
